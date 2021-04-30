import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

class profileCard extends Component {
  render() {
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
                <CardSubtitle tag="h6">First Name:</CardSubtitle>
              </div>
              <div className="col">
                <CardSubtitle>Last Name:</CardSubtitle>
              </div>
            </div>
            <div className="infoSpace row ">
              <div className="col">
                <CardSubtitle>AGE:</CardSubtitle>
              </div>
              <div className="col">
                <CardSubtitle>Phone:</CardSubtitle>
              </div>
            </div>
            <div className="infoSpace row ">
              <CardSubtitle>Covid-19 Status:</CardSubtitle>
            </div>
            <Button color="warning">EDIT</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default profileCard;
