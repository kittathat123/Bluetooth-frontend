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
} from "reactstrap";
import "./ProfileCard.css"

async function updateUserInformation(credentials) {
  const hostnameProduction = 'http://127.0.0.1:8080/userInformation/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userInformation/';

  return fetch(hostnameProduction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age
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
  var [borderColor, setBorderColor] = useState('rgb(255,255,255)');
  var [heading, setHeading] = useState('About Me');
  var [firstname, setFirstname] = useState('');
  var [lastname, setLastname] = useState('');
  var [username, setUserName] = useState('');
  var [password, setPassword] = useState('');
  var [age, setAge] = useState('');
  var [gender, setGender] = useState('');
  var [homeAddr, setHomeAddr] = useState('');
  var localStorageString = localStorage.getItem('user_info');

  // GET USERNAME FROM LOCALSTORAGE
  if(localStorage.getItem('user_info') === null){
      alert("!!! Please Log-in to the system first !!!");
      history.push("/"); 
  } else if(localStorage.getItem('user_info') !== null) {
      // console.log("[Profile] username : ", JSON.parse(localStorageString).username);
      username = JSON.parse(localStorageString).username;
  }   

  const handleClick = async e => {
      e.preventDefault();
      console.log("Edit button");
      setDisabled(!disabled);
      setBorderColor("rgb(0, 0, 0)");
      setHeading("About Me [Update Mode]");
      // history.push("/ProfileModify");  
  }

  const handleSubmit = async e => {
      e.preventDefault();
      const response = await updateUserInformation({
          firstname
      });

      
  }

  const hostnameProduction = 'http://127.0.0.1:8080/userInformation/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userInformation/';

  useEffect(() => {
    fetch(hostnameProduction, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({'username': username})
    })
      .then(response => response.json())
      .then(dataFromServer => {
          console.log("DATA : " , dataFromServer.userInformation[0]);
          
          // SET ALL USED VARIBLE
          setFirstname(dataFromServer.userInformation[0].FIRST_NAME);
          setLastname(dataFromServer.userInformation[0].LAST_NAME);
          setUserName(dataFromServer.userInformation[0].USER_NAME);
          setPassword(dataFromServer.userInformation[0].PASSWORD);
          setAge(calculateAge(dataFromServer.userInformation[0].date_of_birth));
          setGender(dataFromServer.userInformation[0].GENDER);
          setHomeAddr(dataFromServer.userInformation[0].HOME_ADDR);

      })
  }, []);

  return (
    
    <div>
      <Card
        className="profileContainer"
        style={{ width: "60vw", height: "60vh" }}
      >
        <CardImg
          top
          width="70px"
          height="70vh"
          src="http://esg.buu.ac.th/wp-content/uploads/2018/09/none.png"
          alt="Profile image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{heading}</CardTitle>
          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">First Name :</CardSubtitle>
              <CardText>
                <input 
                  type="text"
                  value={firstname} 
                  disabled={disabled}
                  style={{borderColor: borderColor, borderStyle: 'solid'}} 
                  onKeyPress={onKeyPressOnlyAlphabet}
                  onChange={e => setFirstname(e.target.value)} 
                />
              </CardText>
            </div>
            <div className="col">
              <CardSubtitle>Last Name :</CardSubtitle>
              <CardText>{lastname}</CardText>
            </div>
          </div>

          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle>Username :</CardSubtitle>
              <CardText>{username}</CardText>
            </div>
            <div className="col">
              <CardSubtitle>Password :</CardSubtitle>
              <CardText typeof="password" >{password}</CardText>
            </div>
          </div>

          <div className="infoSpace row ">
            <div className="col">
              <CardSubtitle>AGE :</CardSubtitle>
              <CardText>{age}</CardText>
            </div>
            <div className="col">
              <CardSubtitle>GENDER :</CardSubtitle>
              <CardText>{gender}</CardText>
            </div>
          </div>

          <div className="infoSpace row ">
            <div className="col">
              <CardSubtitle>Home Address :</CardSubtitle>
              <CardText>{homeAddr}</CardText>
            </div>
          </div>

          <div className="infoSpace row">
            <div className="btn-group-customize">
              <Button color="warning" onClick={handleClick}>EDIT</Button>
              <Button outline color="secondary" disabled={disabled} onSubmit={handleSubmit}>Submit</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

