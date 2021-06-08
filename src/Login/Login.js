import React, { useState, useEffect } from "react";
import logo from "../assets/IPSlogo.png";
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
import useToken from "../Token/useToken";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeslash = <FontAwesomeIcon icon={faEyeSlash} />;

async function loginUser(credentials) {
  // console.log("CREDITIALS : ", credentials)
  const hostnameProduction = "http://127.0.0.1:8080/userLogin/";
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userLogin/";

  return fetch(hostnameHeroku, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login() {
  const { setToken } = useToken();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const message_1 = "You put wrong either username or password.";
  const message_2 = "User already login in the system.";
  const message_3 = "You login as an admin.";

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });

    // console.log("RESPONSE : ", response);

    // CHECK THE RESPONSE WHICH GET FROM BACKEND
    if (message_1.localeCompare(response.message) === 0) {
      alert("You put wrong either username or password.");
      setUserName("");
      setPassword("");
    } else if (message_2.localeCompare(response.message) === 0) {
      alert("User already login in the system.");
      setUserName("");
      setPassword("");
    } else if (message_3.localeCompare(response.message) === 0) {
      alert("You login as admin");
      history.push("/Admin");
    } else {
      // console.log(response.token, response.username);
      setToken(response);
      setRedirect(true);
      // console.log("SET USER_INFO LEAW");
      // alert("Login successful");
    }
  };

  // Redirect to Mylocation PAGE
  useEffect(() => {
    if (redirect) {
      history.push({
        pathname: "/Mylocation",
      });
    }
  }, [history, redirect]);

  return (
    <div className="login_page">
      <Card className="container_login">
        <CardHeader>
          <img
            src={logo}
            alt="IPS TRACK"
            style={{ width: "179px", height: "80px" }}
          ></img>
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5"> WELCOME TO IPS TRACKING</CardTitle>
          <Form onSubmit={handleSubmit}>
            <CardText>Username :</CardText>
            <input
              className="login_input"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <CardText className="password">Password :</CardText>
            <div className="pass-wrapper">
              <input
                type={passwordShown ? "text" : "password"}
                className="pass-input login_input"
                name="lname"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i
                style={{ display: passwordShown ? "block" : "none" }}
                onClick={togglePasswordVisiblity}
              >
                {eyeslash}
              </i>
              <i
                style={{ display: passwordShown ? "none" : "block" }}
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
            </div>
            <br></br>

            <div>
              {/* <button type="submit" style={{marginTop: '20px'}}>Submit</button> */}
              <Button
                className="login_button"
                outline
                color="primary"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </CardBody>
        <CardFooter>
          <a href={"/Register"}> Register </a>
        </CardFooter>
      </Card>
    </div>
  );
}

//   {/* return (
//     <div className="login_page">
//       <Card className="container_login">
//         <CardHeader>
// {
//   /* <img
//   src={logo}
//   alt="IPS TRACK"
//   style={{ width: "179px", height: "80px" }}
// ></img>; */
// }
//           <span> </span>{" "}
//         </CardHeader>
//         <CardBody>
//           <CardTitle tag="h5">WELCOME TO IPS TRACKING</CardTitle>
//           <Form onSubmit={handleSubmit}>
//             <CardText>Username :</CardText>
//             <input
//               className="login_input"
//               type="text"
//               value={username}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <CardText>Password :</CardText>
//             <input
//               className="login_input"
//               type="password"
//               id="lname"
//               name="lname"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <br></br>

//             <div>
//               <button
//                 className="login_button"
//                 type="submit"
//                 style={{ marginTop: "20px" }}
//               >
//                 Login
//               </button>
//             </div>
//           </Form>
//         </CardBody>
//         <CardFooter>
//           <a href={"/Register"}> Register </a>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// } */
