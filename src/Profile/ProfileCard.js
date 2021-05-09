import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import "./ProfileCard.css"

// IMPORT DATEPICKER LIBRARY
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

async function logoutUser(credentials) {
  // console.log("CREDITIALS : ", credentials)
  const hostnameProduction = 'http://127.0.0.1:8080/userLogout/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userLogout/';

  return fetch(hostnameHeroku, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())

}

async function updateUserInformation(credentials) {
  const hostnameUpdateUserInformationProduction = 'http://127.0.0.1:8080/updateUserInformation/';
  const hostnameUpdateUserInformationHeroku = 'https://protected-brook-89084.herokuapp.com/updateUserInformation/';

  return fetch(hostnameUpdateUserInformationHeroku, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function calculateAge(dateString) {
  console.log("DATESTRING : " , dateString);
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age
}

function convertDateType(dateString) {
    var splitedDate = dateString.split("-");
    var newDateString = splitedDate[2] + "-" + splitedDate[1] + "-" + splitedDate[0];
    return newDateString
}

var onKeyPressOnlyAlphabet = (event) => {
  if((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && 
    event.charCode < 123)){
      return true;
  }

  event.preventDefault();
  alert("Type only alpahbet");
  return false;
}

export default function ProfileCard() {
  // DECLARE ALL USED VARIABLE
  const history = useHistory();
  var [disabled, setDisabled] = useState(true);
  var [submitButtonStatus, setSubmitButtonStatus] = useState(false);
  var [borderColor, setBorderColor] = useState('rgb(255,255,255)');
  var [heading, setHeading] = useState('About Me');
  var [inputStatus, setInputStatus] = useState(false);
  var [cardTextStatus, setCardTextStatus] = useState(true);
  var [datePickerStatus, setDatePickerStatus] = useState(false);
  var [cardTextDateOfBirth, setCardTextDateOfBirth] = useState(true);

  var [token, setToken] = useState('');
  var [userID, setUserId] = useState('');
  var [firstname, setFirstname] = useState('');
  var [lastname, setLastname] = useState('');
  var [username, setUserName] = useState('');
  var [password, setPassword] = useState('');
  var [dateOfBirth, setDateOfBirth] = useState('');
  var [age, setAge] = useState('');
  var [gender, setGender] = useState('');
  var [homeAddr, setHomeAddr] = useState('');
  var localStorageString = localStorage.getItem('user_info');

  // GET USERNAME FROM LOCALSTORAGE
  if(localStorage.getItem('user_info') === null){
      alert("!!! Please Log-in to the system first !!!");
      history.push("/"); 
  } else if(localStorage.getItem('user_info') !== null) {
      // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
      // username = JSON.parse(localStorageString).username;
      token = JSON.parse(localStorageString).token;
  }   

  const handleEdit = async e => {
      e.preventDefault();
      console.log("[ProfileCard] Edit button");
      setDisabled(!disabled);
      setSubmitButtonStatus(true);
      setBorderColor("rgb(0, 0, 0)");
      setHeading("About Me [Update Mode]");
      setInputStatus(true);
      setCardTextStatus(false);
      setDatePickerStatus(true);
      setCardTextDateOfBirth(false);
      setAge(dateOfBirth);

  }

  const handleCancel = async e => {
      e.preventDefault();
      console.log("[ProfileCard] Cancel button");
      window.location.reload();
  }

  const message_1 = "Your username were update.";
  const message_2 = "Your profile were update.";
  const message_3 = "Your profile did not update.";
  const handleSubmit = async e => {
      e.preventDefault();
      console.log("[ProfileCard] Submit button");
      const response = await updateUserInformation({
          token,
          userID,
          firstname,
          lastname,
          username,
          password,
          dateOfBirth,
          gender,
          homeAddr
      });

      console.log("[REGISTER] RESPONSE_FROM_BACKEND : ", response);

      // CHECK THE RESPONSE WHICH GET FROM BACKEND
      if(message_1.localeCompare(response.message) === 0){
          alert("Your change your username. You need to re-login");
          await logoutUser({
            'username': username
          });

          localStorage.removeItem('user_info');
          

      } else if(message_2.localeCompare(response.message) === 0) {
          alert("Your profile were update.");
          window.location.reload();
      } else {
          alert("Your profile did not update.");
      }


  }

  const hostnameGetUserInformationProduction = 'http://127.0.0.1:8080/userInformation/';
  const hostnameGetUserInformationHeroku = 'https://protected-brook-89084.herokuapp.com/userInformation/';

  useEffect(() => {
    fetch(hostnameGetUserInformationHeroku, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }, 
        body: JSON.stringify({'token': token})
    })
      .then(response => response.json())
      .then(dataFromServer => {
          console.log("DATA : " , dataFromServer.userInformation[0]);
          
          // SET ALL USED VARIBLE
          setUserId(dataFromServer.userInformation[0].USER_ID);
          setFirstname(dataFromServer.userInformation[0].FIRST_NAME);
          setLastname(dataFromServer.userInformation[0].LAST_NAME);
          setUserName(dataFromServer.userInformation[0].USER_NAME);
          setPassword(dataFromServer.userInformation[0].PASSWORD);
          setDateOfBirth(dataFromServer.userInformation[0].DATE_OF_BIRTH);
          setAge(calculateAge(dataFromServer.userInformation[0].DATE_OF_BIRTH));
          setGender(dataFromServer.userInformation[0].GENDER);
          setHomeAddr(dataFromServer.userInformation[0].HOME_ADDR);
          
      })
  }, [token]);

  return (
    
    <div>
      <Card
        className="profileContainer"
        style={{ width: "60vw", height: "60vh" }}
      >
        {/* <CardImg
          top
          width="70px"
          height="70vh"
          src="http://esg.buu.ac.th/wp-content/uploads/2018/09/none.png"
          alt="Profile image cap"
        /> */}
        <CardBody>
          <CardTitle tag="h4">{heading}</CardTitle>
          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">First Name :</CardSubtitle>
              <CardText style={{display: cardTextStatus ? 'inline': 'none'}} >{firstname}</CardText>
              <input 
                  type="text"
                  value={firstname} 
                  // disabled={disabled}
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onKeyPress={onKeyPressOnlyAlphabet}
                  onChange={e => setFirstname(e.target.value)} 
              />
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Last Name :</CardSubtitle>
              <CardText style={{display: cardTextStatus ? 'inline': 'none'}}>{lastname}</CardText>
              <input 
                  type="text"
                  value={lastname} 
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onKeyPress={onKeyPressOnlyAlphabet}
                  onChange={e => setLastname(e.target.value)} 
              />
            </div>
          </div>

          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">Username :</CardSubtitle>
              <CardText disabled={disabled} >{username}</CardText>
              {/* <input 
                  type="text"
                  value={username} 
                  disabled={disabled}
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onChange={e => setUserName(e.target.value)} 
              /> */}
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Password :</CardSubtitle>
              <CardText typeof="password" style={{display: cardTextStatus ? 'inline': 'none'}}>{password} </CardText>
              <input 
                  type="password"
                  value={password} 
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onChange={e => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <div className="infoSpace row ">
            
            <div className="col">
              <CardSubtitle tag="h6">DATE OF BIRTH :</CardSubtitle>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className=""
                  format="yyyy-MM-dd"
                  value={dateOfBirth}
                  style={{display: datePickerStatus ? 'block' : 'none'}}
                  onChange={e => setDateOfBirth(e.toLocaleDateString('fr-CA'))}
                />
              </MuiPickersUtilsProvider>
              <CardText style={{display: cardTextDateOfBirth ? 'inline': 'none'}} >{dateOfBirth}</CardText>
            </div>
            <div className="col" style={{display: cardTextStatus ? 'inline': 'none'}}>
              <CardSubtitle tag="h6">AGE :</CardSubtitle>
              <CardText>{age}</CardText>
            </div>

          </div>

          <div className="infoSpace row ">
            <div className="col">
              <CardSubtitle tag="h6">GENDER :</CardSubtitle>
              <div style={{display: inputStatus ? 'inline' : 'none', marginTop: '10px' }} onChange={e => setGender(e.target.value)}>
                  <input className="radiobutton" type="radio" value="Male" name="gender" /> Male
                  <input className="radiobutton" type="radio" value="Female" name="gender" /> Female
                  <input className="radiobutton" type="radio" value="Other" name="gender" /> Other
              </div>
              <CardText style={{display: cardTextStatus ? 'inline': 'none'}} >{gender}</CardText>
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Home Address :</CardSubtitle>
              <CardText style={{display: cardTextStatus ? 'inline': 'none'}}>{homeAddr}</CardText>
              <input 
                  type="text"
                  value={homeAddr} 
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onChange={e => setHomeAddr(e.target.value)} 
              />
            </div>
          </div>

          <div className="infoSpace row">
            <Col className="btn-group-customize">
              <Button color="warning" onClick={handleEdit}>EDIT</Button>
              <Button outline color="primary" style={{display: submitButtonStatus ? 'block': 'none'}} onClick={handleSubmit}>Submit</Button>
            </Col>
            <Col xs lg="2" className="btn-cancel-group">
                <Button outline color="danger" style={{display: submitButtonStatus ? 'block': 'none'}} onClick={handleCancel}>Cancel</Button>
            </Col>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

