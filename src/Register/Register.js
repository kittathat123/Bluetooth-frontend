import React, { useState, useEffect } from "react";
import logo from "../assets/IPSlogo.png";
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
import { Link, useHistory } from "react-router-dom";

// IMPORT DATEPICKER LIBRARY
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

async function RegisterUser(credentials) {
  const hostnameProduction = "http://127.0.0.1:8080/userRegistration/";
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userRegistration/";

  return fetch(hostnameHeroku, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

var onKeyPressOnlyAlphabet = (event) => {
  if (
    (event.charCode > 64 && event.charCode < 91) ||
    (event.charCode > 96 && event.charCode < 123)
  ) {
    return true;
  }

  event.preventDefault();
  alert("Type only alpahbet");
  return false;
};

export default function Register() {
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date().toLocaleDateString("en-TH")
  );
  const [gender, setGender] = useState("");
  const [homeAddr, setHomeAddr] = useState("");
  // const [btMacAddr, setBTMacAddr] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const message_1 = "User already exist in the system.";
  const message_2 = "New User and Got some data!";
  const message_3 = "Please fill in all section";
  const message_4 = "This bluetooth mac address already exist in the system.";

  const handleSubmit = async (e) => {
    var handleSubmitStatus = true;
    e.preventDefault();
    // console.log("(Register.js) [DATE] : ", dateOfBirth);
    // console.log("(Register.js) [DATE TODAY] : ", new Date().toLocaleDateString("en-TH"));
    // console.log("(Register.js) " , dateOfBirth === new Date().toLocaleDateString("en-TH"));

    if (
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      gender === "" ||
      homeAddr === "" 
      // btMacAddr === ""
    ) {
      handleSubmitStatus = false;
      alert("--- Please fill in all section ---");
    }

    // CHECK FIRSTNAME IS SAME AS LASTNAME OR NOT
    if((firstname.length !== 0 || firstname !== "") && (lastname.length !== 0 || lastname !== "")) {
      if(firstname.localeCompare(lastname) === 0) {
        alert("Your lastname can't be same as firstname");
        setLastname("");
        handleSubmitStatus = false;
      } else if(firstname.localeCompare(lastname) !== 0) {
        handleSubmitStatus = true;
      }
    }

    // CHECK FIRSTNAME IS SAME AS USERNAME OR NOT
    if(firstname.localeCompare(username) === 0){
      alert("Your username can't be same as firstname");
      setUserName("");
      handleSubmitStatus = false;
    } else if(firstname.localeCompare(username) !== 0){
      handleSubmitStatus = true;
    }

    if (dateOfBirth === new Date().toLocaleDateString("en-TH")) {
      handleSubmitStatus = false;
      alert("--- Enter your real birthday ---");
    }

    // CHECK MATCHING OF PASSWORD AND CONFIRM_PASSWORD
    if (password !== confirmPassword) {
      handleSubmitStatus = false;
      alert("--- Password not match ---");
    }

    // CHECK USERNAME IS SAME AS PASSWORD OR NOT
    if(username.localeCompare(password) === 0){
      handleSubmitStatus = false;
      alert("--- Username can't same as password ---")
    } else if(username.localeCompare(password) !== 0) {
      handleSubmitStatus = true;
    }

    // IF BOTH PASSWORD AND CONFIRM_PASSWORD ARE MATCH
    if (handleSubmitStatus === true) {
      const response = await RegisterUser({
        firstname,
        lastname,
        username,
        password,
        dateOfBirth,
        gender,
        homeAddr,
        // btMacAddr,
      });

      console.log("[REGISTER] RESPONSE_FROM_BACKEND : ", response);

      // CHECK THE RESPONSE FROM BACKEND (MESSAGE_1)
      if (message_1.localeCompare(response.message) === 0) {
        alert("User already register in the system");
        setFirstname("");
        setLastname("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setDateOfBirth(new Date().toLocaleDateString("en-TH"));
        setGender("");
        setPassword("");
        setHomeAddr("");
      }

      // CHECK THE RESPONSE FROM BACKEND (MESSAGE_2)
      else if (message_2.localeCompare(response.message) === 0) {
        alert("Register successful");
        setRegisterStatus(true);
      }

      // CHECK THE RESPONSE FROM BACKEND (MESSAGE_4)
      // else if (message_4.localeCompare(response.message) === 0) {
      //   alert("This bluetooth mac address already exist in the system.");
      //   setBTMacAddr("");
      // }
    }
  };

  useEffect(() => {
    if (registerStatus) {
      console.log("Redirecting to Login Page");
      history.push("/");
    }
  }, [history, registerStatus]);

  return (
    <div className="register_page">
      <Card className="container_register">
        <CardHeader>
          {" "}
          <img
            src={logo}
            alt="IPS TRACK"
            style={{ width: "179px", height: "80px" }}
          ></img>
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">WELCOME TO REGISTRATIOM PAGE</CardTitle>
          <Form onSubmit={handleSubmit}>
            <CardText>First Name :</CardText>
            <input
              type="text"
              className="input-box login_input"
              maxLength="10"
              value={firstname}
              onKeyPress={onKeyPressOnlyAlphabet}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <CardText>Last Name :</CardText>
            <input
              type="text"
              className="input-box login_input"
              maxLength="15"
              name="lname"
              value={lastname}
              onKeyPress={onKeyPressOnlyAlphabet}
              onChange={(e) => setLastname(e.target.value)}
            />
            <CardText>Username :</CardText>
            <input
              type="text"
              className="input-box login_input"
              maxLength="10"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <CardText>Password :</CardText>
            <input
              type="password"
              className="input-box login_input"
              maxLength="15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CardText>Confirmed Password :</CardText>
            <input
              type="password"
              className="input-box login_input"
              maxLength="15"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CardText>Date of Birth :</CardText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className="input-box"
                format="yyyy-MM-dd"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.toLocaleDateString("en-TH"))}
                maxDate={new Date()}
              />
            </MuiPickersUtilsProvider>

            <CardText>Gender :</CardText>
            <div onChange={(e) => setGender(e.target.value)}>
              <input
                className="radiobutton"
                type="radio"
                value="Male"
                name="gender"
              />{" "}
              Male
              <input
                className="radiobutton"
                type="radio"
                value="Female"
                name="gender"
              />{" "}
              Female
              {/* <input className="radiobutton" type="radio" value="Other" name="gender" /> Other */}
            </div>
            

            <CardText>Home Address :</CardText>
            <input
              type="text"
              className="input-box login_input"
              // name="lname"
              value={homeAddr}
              onChange={(e) => setHomeAddr(e.target.value)}
            />

            <br></br>

            <div>
              <button
                className="login_button"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Submit
              </button>
              <Link to={"/"}>
                <button
                  className="back_register_to_login login_button"
                  type="back"
                  style={{ marginTop: "20px" }}
                >
                  Back
                </button>
              </Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
