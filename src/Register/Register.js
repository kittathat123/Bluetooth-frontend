import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Form,
} from "reactstrap";
import "./Register.css";
import { useHistory } from "react-router-dom";

// IMPORT DATEPICKER LIBRARY
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

async function RegisterUser(credentials) {
  const hostnameProduction = 'http://127.0.0.1:8080/userRegistration/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userRegistration/';

  return fetch(hostnameProduction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

var onKeyPressOnlyAlphabet = (event) => {
  if((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && 
    event.charCode < 123)){
      return true;
  }
  
  event.preventDefault();
  alert("Type only alpahbet");
  return false
}

export default function Register() {
    const history = useHistory();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toLocaleDateString('en-TH'));
    const [gender, setGender] = useState('');
    const [homeAddr, setHomeAddr] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);
    const message_1 = "User already exist in the system.";
    const message_2 = "New User and Got some data!";
    const message_3 = "Please fill in all section";
    
    
    const handleSubmit = async e => {
      var handleSubmitStatus = true
      e.preventDefault();
      console.log("[DATE] : ", dateOfBirth)
      console.log("[DATE TODAY] : ", new Date().toLocaleDateString('en-TH'));
      console.log(dateOfBirth === new Date().toLocaleDateString('en-TH'))

      if(firstname === "" || lastname === "" || username === "" || password === "" || confirmPassword === "" || gender === "" || homeAddr === "") {
          handleSubmitStatus = false
          alert("--- Please fill in all section ---")
      }

      if(dateOfBirth  === new Date().toLocaleDateString('en-TH')) {
          handleSubmitStatus = false  
          alert("--- Enter your real birthday ---")
      }
      
      // CHECK MATCHING OF PASSWORD AND CONFIRM_PASSWORD
      if(password !== confirmPassword)
      {
          handleSubmitStatus = false
          alert("--- Password not match ---")
      }
      
      // IF BOTH PASSWORD AND CONFIRM_PASSWORD ARE MATCH
      if(handleSubmitStatus === true)
      {
          const response = await RegisterUser({
            firstname,
            lastname,
            username,
            password,
            dateOfBirth,
            gender,
            homeAddr
          });

          console.log("[REGISTER] RESPONSE_FROM_BACKEND : ", response);
  
          // CHECK THE RESPONSE FROM BACKEND (MESSAGE_1)
          if(message_1.localeCompare(response.message) === 0){
              alert("User already register in the system");
              setFirstname('');
              setLastname('');
              setUserName('');
              setPassword('');
              setConfirmPassword('');
              setDateOfBirth(new Date().toLocaleDateString('en-TH'));
              setGender('');
              setPassword('');
              setHomeAddr('');
          }

          // CHECK THE RESPONSE FROM BACKEND (MESSAGE_2)
          else if(message_2.localeCompare(response.message) === 0) {
              alert("Register successful");
              setRegisterStatus(true);
          }

          
      }
    }

    useEffect(() => {
        if(registerStatus) {
            console.log("Redirecting to Login Page");
            history.push("/");   
        } 
        // else 
        // {
        //     console.log("Not Redirect to Login Page");
        // }

    }, [history, registerStatus]);

    return (
      <div>
        <Card className="container">
          <CardHeader>WELCOME TO IPS TRACKING</CardHeader>
          <CardBody>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <Form onSubmit={handleSubmit}>
              <CardText>First Name :</CardText>
              <input
                type="text"
                className="input-box"
                value={firstname}
                onKeyPress={onKeyPressOnlyAlphabet}
                onChange={e => setFirstname(e.target.value)}
              />
              <CardText>Last Name :</CardText>
              <input
                type="text"
                className="input-box"
                name="lname"
                value={lastname}
                onKeyPress={onKeyPressOnlyAlphabet}
                onChange={e => setLastname(e.target.value)}
              />
              <CardText>Username :</CardText>
              <input
                type="text"
                className="input-box"
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
              <CardText>Password :</CardText>
              <input
                type="password"
                className="input-box"
                // name="lname"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <CardText>Confirmed Password :</CardText>
              <input 
                type="password"
                className="input-box"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <CardText>Date of Birth :</CardText>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className="input-box"
                  format="dd/MM/yyyy"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.toLocaleDateString('en-TH'))}
                />
              </MuiPickersUtilsProvider>
      
              <CardText>Gender :</CardText>
              <div onChange={e => setGender(e.target.value)}>
                  <input className="radiobutton" type="radio" value="Male" name="gender" /> Male
                  <input className="radiobutton" type="radio" value="Female" name="gender" /> Female
                  <input className="radiobutton" type="radio" value="Other" name="gender" /> Other
              </div>
              <CardText>Home Address :</CardText>
              <input
                type="text"
                className="input-box"
                // name="lname"
                value={homeAddr}
                onChange={e => setHomeAddr(e.target.value)}
              />
              <br></br>

              <div>
                <button type="submit" style={{marginTop: '20px'}}>Submit</button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    );

}


