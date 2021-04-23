import React, {useState} from "react";
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
  return fetch('http://localhost:8090/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        username,
        password
      });
      console.log("TOKEN : ", token);
      setToken(token);
      console.log("SET TOKEN LEAW");
    }

    return(
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
    );

}

Login.PropTypes = {
    setToken: PropTypes.func.isRequired
}
