import React, { useState } from "react";
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

async function UserInformation(credentials) {
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

export default function ProfileCard() {
  // DECLARE ALL USED VARIABLE
  const history = useHistory();
  var [firstname, setFirstname] = useState('');
  var [lastname, setLastname] = useState('');
  var [username, setUserName] = useState('');
  var [password, setPassword] = useState('');
  var [age, setAge] = useState('');
  var [gender, setGender] = useState('');
  var [homeAddr, setHomeAddr] = useState('');

  // GET USERNAME FROM LOCALSTORAGE
  var localStorageString = localStorage.getItem('user_info');
  if(localStorage.getItem('user_info') === null){
      alert("!!! Please Log-in to the system first !!!");
      history.push("/"); 
  } else if(localStorage.getItem('user_info') !== null) {
      console.log("[Profile] username : ", JSON.parse(localStorageString).username);
      
      // SET ALL USE VARIABLE
      firstname = JSON.parse(localStorageString).firstname;
      lastname = JSON.parse(localStorageString).lastname;
      username = JSON.parse(localStorageString).username;
      password = JSON.parse(localStorageString).password;
      age = calculateAge(JSON.parse(localStorageString).dateOfBirth);
      gender = JSON.parse(localStorageString).gender;
      homeAddr = JSON.parse(localStorageString).homeAddr;
  }

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
          <CardTitle tag="h5">About Me</CardTitle>
          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">First Name :</CardSubtitle>
              <CardText>{firstname}</CardText>
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

          <Button color="warning">EDIT</Button>
        </CardBody>
      </Card>
    </div>
  );
}


