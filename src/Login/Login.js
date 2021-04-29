import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
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
import "./Login.css";
import PropTypes from 'prop-types';
import useToken from '../Token/useToken';


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
//               <CardText>Username :</CardText>
//               <input
//                 type="text"
//                 // id="fname"
//                 // name="fname"
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               />
//               <CardText>password :</CardText>
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
//           <CardFooter>
//             <a href="../Register/register.js"> Register </a>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }
// }

// export default Login;

async function loginUser(credentials) {
  // console.log("CREDITIALS : ", credentials)
  const hostnameProduction = 'http://127.0.0.1:8080/userLogin/';
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



export default function Login() {
    const { setToken } = useToken();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const message_1 = "You put wrong either username or password.";
    const message_2 = "User already login in the system.";
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const handleSubmit = async e => {
      e.preventDefault();
      const response = await loginUser({
        username,
        password
      });
      // console.log("RESPONSE : ", response);
      
      // CHECK THE RESPONSE WHICH GET FROM BACKEND
      if(message_1.localeCompare(response.message) === 0){
          alert("You put wrong either username or password.");
          setUserName('');
          setPassword('');
      }

      else if(message_2.localeCompare(response.message) === 0){
          alert("User already login in the system.");
          setUserName('');
          setPassword('');
      }

      else {
          // console.log(response.token, response.username);
          setToken(response);
          setRedirect(true);
          console.log("SET USER_INFO LEAW");
          alert("Login successful");        
      }   
    }

    // Redirect to Mylocation PAGE
    useEffect(() => {
      if(redirect) {
          history.push({
            pathname: '/Mylocation',
          });
      }
    }, [history, redirect]);  

    return(
      <div>
        <Card className="container">
          <CardHeader>WELCOME TO IPS TRACKING</CardHeader>
          <CardBody>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <Form onSubmit={handleSubmit}>
              <CardText>Username :</CardText>
              <input
                type="text"
                // id="fname"
                // name="fname"
                // value={this.state.value}
                // onChange={this.handleChange}
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
              <CardText>password :</CardText>
              <input
                type="text"
                id="lname"
                name="lname"
                // value={this.state.value}
                // onChange={this.handleChange}
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          <CardFooter>
            <a href={"/Register"}> Register </a>
          </CardFooter>
        </Card>
      </div> 
    );

}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
