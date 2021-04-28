import React, {useState} from "react";
import { Component } from "react";
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
import "./register.css";
import { useHistory } from "react-router-dom";

// IMPORT DATEPICKER LIBRARY
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     alert("A name was submitted: " + this.state.value);

//     event.preventDefault();
//   }

//   render() {
//     console.log(this.state.value);
//     return (
//       <div>
//         <Card className="container">
//           <CardHeader>WELCOME TO IPS TRACKING</CardHeader>
//           <CardBody>
//             <CardTitle tag="h5">Special Title Treatment</CardTitle>
//             <Form onSubmit={this.handleSubmit}>
//               <CardText>First Name :</CardText>
//               <input
//                 type="text"
//                 // id="fname"
//                 // name="fname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Last Name :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Username :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Password :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Date of Birth :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Gender :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>Home Address :</CardText>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <br></br>
//             </Form>
//             {/* <Button> */}
//             <input type="submit" value="Submit"></input>
//             {/* </Button> */}
//             {/* <Button>Register</Button> */}
//           </CardBody>
//         </Card>
//       </div>
//     );
//   }
// }

// export default Login;



async function RegisterUser(credentials) {
  const hostnameProduction = 'http://127.0.0.1:8080/userRegistration/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userLogin/';

  return fetch(hostnameProduction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toLocaleDateString('en-TH'));
    const [gender, setGender] = useState('');
    const [homeAddr, setHomeAddr] = useState('');
    const message_1 = "User already exist in the system.";
    const message_2 = "New User and Got some data!";
    let redirect = useHistory('');
    
    const handleSubmit = async e => {
      e.preventDefault();
      
      // CHECK MATCHING OF PASSWORD AND CONFIRM_PASSWORD
      if(password !== confirmPassword)
      {
          alert("Password not match")
      }
      
      // IF BOTH PASSWORD AND CONFIRM_PASSWORD ARE MATCH
      else 
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

          // console.log("RESPONSE_FROM_BACKEND : ", response);
  
          // CHECK THE RESPONSE FROM BACKEND (MESSAGE_1)
          if(message_1.localeCompare(response.message) === 0){
              alert("User already register in the system");
              setFirstname('');
              setLastname('');
              setUserName('');
              setPassword('');
              setConfirmPassword('');
              setDateOfBirth(new Date());
              setGender('');
              setPassword('');
          }

          // CHECK THE RESPONSE FROM BACKEND (MESSAGE_2)
          else if(message_2.localeCompare(response.message) === 0) {
              alert("Register successful");
              redirect.push('/');
          }

      }

    }

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
                id="input-box"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
              <CardText>Last Name :</CardText>
              <input
                type="text"
                id="input-box"
                name="lname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
              <CardText>Username :</CardText>
              <input
                type="text"
                id="input-box"
                name="lname"
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
              <CardText>Password :</CardText>
              <input
                type="text"
                id="input-box"
                name="lname"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <CardText>Confirmed Password :</CardText>
              <input 
                type="text"
                id="input-box"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <CardText>Date of Birth :</CardText>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="input-box"
                  format="dd/MM/yyyy"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.toLocaleDateString('en-TH'))}
                />
              </MuiPickersUtilsProvider>
      
              <CardText>Gender :</CardText>
              <input
                type="text"
                id="input-box"
                name="lname"
                value={gender}
                onChange={e => setGender(e.target.value)}
              />
              <CardText>Home Address :</CardText>
              <input
                type="text"
                id="input-box"
                name="lname"
                value={homeAddr}
                onChange={e => setHomeAddr(e.target.value)}
              />
              <br></br>

              <div>
                <button type="submit" style={{marginTop: '20px'}}>Submit</button>
              </div>

            </Form>
            {/* <Button> */}
            {/* <input type="submit" value="Submit"></input> */}
            {/* </Button> */}
            {/* <Button>Register</Button> */}
          </CardBody>
        </Card>
      </div>
    );

}