import React from "react";
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
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);

    event.preventDefault();
  }

  render() {
    console.log(this.state.value);
    return (
      <div>
        <Card className="container">
          <CardHeader>WELCOME TO IPS TRACKING</CardHeader>
          <CardBody>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <CardText>Username :</CardText>
              <input
                type="text"
                // id="fname"
                // name="fname"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <CardText>password :</CardText>
              <input
                type="text"
                id="lname"
                name="lname"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <br></br>
            </Form>
            {/* <Button> */}
            <input type="submit" value="Submit"></input>
            {/* </Button> */}
            {/* <Button>Register</Button> */}
          </CardBody>
          <CardFooter>
            <a href="../Register/register.js"> Register </a>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Login;
