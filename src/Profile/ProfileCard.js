import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./ProfileCard.css";
import ProfileIconImage from "../assets/ProfileIcon.png";

// IMPORT DATEPICKER LIBRARY
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


async function updateUserInformation(credentials) {
  const hostnameUpdateUserInformationProduction =
    "http://127.0.0.1:8080/updateUserInformation/";
  const hostnameUpdateUserInformationHeroku =
    "https://protected-brook-89084.herokuapp.com/updateUserInformation/";

  return fetch(hostnameUpdateUserInformationHeroku, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function calculateAge(dateString) {
  // console.log("DATESTRING : " , dateString);
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
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

export default function ProfileCard() {
  // DECLARE ALL USED VARIABLE
  const history = useHistory();
  var [disabled, setDisabled] = useState(true);
  var [submitButtonStatus, setSubmitButtonStatus] = useState(false);
  var [borderColor, setBorderColor] = useState("rgb(255,255,255)");
  var [heading, setHeading] = useState("About Me");
  var [inputStatus, setInputStatus] = useState(false);
  var [cardTextStatus, setCardTextStatus] = useState(true);
  var [datePickerStatus, setDatePickerStatus] = useState(false);
  var [cardTextDateOfBirth, setCardTextDateOfBirth] = useState(true);
  // dropdownComponent
  var [dropdownOpen, setDropdownOpen] = useState(false);
  var toggle = () => setDropdownOpen((prevState) => !prevState);

  const [showButton, setShowButton] = useState(false);
  var [token] = useState("");
  var [userID, setUserId] = useState("");
  var [firstname, setFirstname] = useState("");
  var [lastname, setLastname] = useState("");
  var [username, setUserName] = useState("");
  var [password, setPassword] = useState("");
  var [dateOfBirth, setDateOfBirth] = useState("");
  var [age, setAge] = useState("");
  var [gender, setGender] = useState("");
  var [homeAddr, setHomeAddr] = useState("");
  var [btMacAddr, setBTMacAddr] = useState("");
  var [newImage, setNewImage] = useState("");
  var [covid19Status, setCovid19Status] = useState("");
  var [url, setUrl] = useState(ProfileIconImage);
  var [profileChangeState, setProfileChangeState] = useState(false);
  var localStorageString = localStorage.getItem("user_info");

  // GET USERNAME FROM LOCALSTORAGE
  if (localStorage.getItem("user_info") === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/");
  } else if (localStorage.getItem("user_info") !== null) {
    // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
    // username = JSON.parse(localStorageString).username;
    token = JSON.parse(localStorageString).token;
  }
  // const Button = () => <div>You clicked the button!</div>;

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("[ProfileCard] Edit button");
    setDisabled(!disabled);
    setSubmitButtonStatus(true);
    setBorderColor("rgb(0, 0, 0)");
    setHeading("About Me [Update Mode]");

    setInputStatus(true);
    setCardTextStatus(false);
    setDatePickerStatus(true);
    setCardTextDateOfBirth(false);
    setAge(dateOfBirth);
    setShowButton(true);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    console.log("[ProfileCard] Cancel button");
    window.location.reload();
  };

  const message_1 = "Your username were update.";
  const message_2 = "Your profile were update.";
  const message_3 = "Your profile did not update.";
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("[ProfileCard.js] ProfileStage_1 : ", profileChangeState);
    // console.log("[ProfileCard.js] FN : " , firstname)
    // console.log("[ProfileCard.js] LN : " , lastname)

    // CHECK FIRSTNAME AND LASTNAME ARE EMPTY STRING
    if (
      firstname.length === 0 ||
      firstname === "" ||
      lastname.length === 0 ||
      lastname === ""
    ) {
      // console.log("[ProfileCard.js]  KO CHECK NOI_1");
      alert("Please fill your firstname and your lastname in the given field");
      profileChangeState = false;
    }

    // CHECK FIRSTNAME AND LASTNAE ARE NOT EMPTY STRING
    if (
      (firstname.length !== 0 || firstname !== "") &&
      (lastname.length !== 0 || lastname !== "")
    ) {

      // CHECK FIRSTNAME IS SAME AS LASTNAME OR NOT
      if (firstname.localeCompare(lastname) === 0) {
        // console.log("[ProfileCard.js]  KO CHECK NOI_2");
        alert("Your lastname can't be same as your firstname");
        setLastname("");
        profileChangeState = false;
      } else if (firstname.localeCompare(lastname) !== 0) {
        // console.log("[ProfileCard.js]  KO CHECK NOI_3");
        profileChangeState = true;
      }
    }

    // CHECK USERNAME CAN'T SAME AS PASSWORD
    if (password.localeCompare(username) === 0) {
      alert("Your password can't be same as your username");
      setPassword("");
      profileChangeState = false;
    }

    // console.log("[ProfileCard.js] ProfileStage_2 : ", profileChangeState);
    if (profileChangeState === true) {
      if (typeof newImage === "object") {
        await uploadImageToTheServer();
      }

      console.log("[ProfileCard] Submit button");
      const response = await updateUserInformation({
        token,
        userID,
        firstname,
        lastname,
        username,
        password,
        dateOfBirth,
        gender,
        covid19Status,
        homeAddr,
        newImage,
        btMacAddr,
      });

      console.log("[ProfileCard] RESPONSE_FROM_BACKEND : ", response);

      // CHECK THE RESPONSE WHICH GET FROM BACKEND
      if (message_2.localeCompare(response.message) === 0) {
        alert("Your profile were update.");
        window.location.reload();
      } else {
        alert("Your profile did not update.");
      }
    }
    // else if(profileChangeState === false) {
    //   console.log("[ProfileCard.js]  KO CHECK NOI_4");
    // }
  };

  const cloudinaryHostname =
    "https://api.cloudinary.com/v1_1/hiznwi5vk/image/upload";
  const cloudinaryUploadPresent = "wct9lfuu";
  async function uploadImageToTheServer() {
    const data = new FormData();
    console.log("(uploadImageToTheServer) NEW IMAGE : ", newImage);
    data.append("file", newImage);
    data.append("upload_preset", cloudinaryUploadPresent);
    data.append("cloud_name", "hiznwi5vk");
    await fetch(cloudinaryHostname, {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("(uploadImageToTheServer) DATA_IMAGE_URL : ", data.url);
        setUrl(data.url);
        newImage = new URL(data.url).pathname.split("/")[5];
        console.log("(uploadImageToTheServer) : SET NEW IMAGE LEAW");
      })
      .catch((err) => console.log(err));
  }

  const hostnameGetUserInformationProduction =
    "http://127.0.0.1:8080/userAndAdminInformation/";
  const hostnameGetUserInformationHeroku =
    "https://protected-brook-89084.herokuapp.com/userAndAdminInformation/";
  const cloudinaryImageHostName =
    "http://res.cloudinary.com/hiznwi5vk/image/upload/v1621272433/";
  useEffect(() => {
    fetch(hostnameGetUserInformationHeroku, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((dataFromServer) => {
        console.log("DATA : ", dataFromServer.userInformation[0]);

        try {
          // SET ALL USED VARIBLE
          setUserId(dataFromServer.userInformation[0].USER_ID);
          setFirstname(dataFromServer.userInformation[0].FIRST_NAME);
          setLastname(dataFromServer.userInformation[0].LAST_NAME);
          setUserName(dataFromServer.userInformation[0].USER_NAME);
          setPassword(dataFromServer.userInformation[0].PASSWORD);
          setDateOfBirth(dataFromServer.userInformation[0].DATE_OF_BIRTH);
          setAge(calculateAge(dataFromServer.userInformation[0].DATE_OF_BIRTH));
          setGender(dataFromServer.userInformation[0].GENDER);
          setHomeAddr(dataFromServer.userInformation[0].HOME_ADDR);
          setBTMacAddr(dataFromServer.userInformation[0].BT_MAC_ADDR);
          setCovid19Status(dataFromServer.userInformation[0].COVID_19_STATUS);

          var imageNameFromServer =
            dataFromServer.userInformation[0].IMAGE_PROFILE;
          if (
            imageNameFromServer.localeCompare("defaultProfilePicture.jpg") ===
              0 ||
            imageNameFromServer.localeCompare(
              "/profilePicture/defaultProfilePicture.jpg"
            ) === 0 ||
            imageNameFromServer.localeCompare("") === 0
          ) {
            console.log("(ProfileCard.js) : KO CHECK NOI_1");
          } else {
            // console.log("(ProfileCard.js) : KO CHECK NOI_2")
            setUrl(
              cloudinaryImageHostName +
                dataFromServer.userInformation[0].IMAGE_PROFILE
            );
          }
        } catch (err) {
          history.push("/");
        }
      });
  }, [history, token]);

  return (
    <div>
      <Card className="profileContainer">
        <CardBody>
          <CardTitle tag="h4">{heading}</CardTitle>
          <div className="infoSpace row">
            <div className="imageProfile-div">
              <img
                src={url}
                alt="profile-preview"
                width="150px"
                height="150px"
                className="image-profile"
              />
              <div
                style={{ display: inputStatus ? "inline" : "none" }}
                className="profile-image-button-group"
              >
                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
                {/* <button onClick={uploadImageToTheServer}>Upload</button> */}
              </div>
            </div>
          </div>
          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">First Name :</CardSubtitle>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {firstname}
              </CardText>
              <input
                type="text"
                value={firstname}
                // disabled={disabled}
                maxLength="10"
                style={{
                  borderColor: borderColor,
                  borderStyle: "solid",
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                  width: "75%",
                }}
                onKeyPress={onKeyPressOnlyAlphabet}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Last Name :</CardSubtitle>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {lastname}
              </CardText>
              <input
                type="text"
                value={lastname}
                maxLength="15"
                style={{
                  borderColor: borderColor,
                  borderStyle: "solid",
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                  width: "75%",
                }}
                onKeyPress={onKeyPressOnlyAlphabet}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">Username :</CardSubtitle>
              <CardText disabled={disabled}>{username}</CardText>
              {/* <input 
                  type="text"
                  value={username} 
                  disabled={disabled}
                  style={{borderColor: borderColor, borderStyle: 'solid', display: inputStatus ? 'inline' : 'none', marginTop: '10px', width: '75%' }} 
                  onChange={e => setUserName(e.target.value)} 
              /> */}
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Password :</CardSubtitle>
              <CardText
                typeof="password"
                style={{ display: cardTextStatus ? "inline" : "none" }}
              >
                {password}{" "}
              </CardText>
              <input
                type="password"
                value={password}
                maxLength="15"
                style={{
                  borderColor: borderColor,
                  borderStyle: "solid",
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                  width: "75%",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="infoSpace row ">
            <div className="col">
              <CardSubtitle tag="h6">Date of birth :</CardSubtitle>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className=""
                  format="yyyy-MM-dd"
                  value={dateOfBirth}
                  style={{ display: datePickerStatus ? "block" : "none" }}
                  onChange={(e) =>
                    setDateOfBirth(e.toLocaleDateString("fr-CA"))
                  }
                  maxDate={new Date()}
                />
              </MuiPickersUtilsProvider>
              <CardText
                style={{ display: cardTextDateOfBirth ? "inline" : "none" }}
              >
                {dateOfBirth}
              </CardText>
            </div>
            <div
              className="col"
              style={{ display: cardTextStatus ? "inline" : "none" }}
            >
              <CardSubtitle tag="h6">Age :</CardSubtitle>
              <CardText>{age}</CardText>
            </div>
          </div>

          <div className="infoSpace row ">
            <div className="col">
              <CardSubtitle tag="h6">Gender :</CardSubtitle>
              <div
                style={{
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                }}
                onChange={(e) => setGender(e.target.value)}
              >
                <input
                  className="radiobuttonGender"
                  type="radio"
                  value="Male"
                  name="gender"
                />{" "}
                Male
                <input
                  className="radiobuttonGender"
                  type="radio"
                  value="Female"
                  name="gender"
                />{" "}
                Female
              </div>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {gender}
              </CardText>
            </div>
            <div className="col">
              <CardSubtitle tag="h6">Covid-19 status :</CardSubtitle>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {covid19Status}
              </CardText>
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                style={{
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                }}
              >
                <DropdownToggle caret style={{ marginTop: "15px" }}>
                  {covid19Status}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setCovid19Status("Positive")}>
                    Positive
                  </DropdownItem>
                  <DropdownItem onClick={() => setCovid19Status("Negative")}>
                    Negative
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">Bluetooth Mac Address :</CardSubtitle>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {btMacAddr}
              </CardText>
              <input
                type="text"
                value={btMacAddr}
                maxLength="30"
                style={{
                  borderColor: borderColor,
                  borderStyle: "solid",
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                  width: "75%",
                }}
                onChange={(e) => setBTMacAddr(e.target.value)}
              />
            </div>
          </div>

          <div className="infoSpace row">
            <div className="col">
              <CardSubtitle tag="h6">Home Address :</CardSubtitle>
              <CardText style={{ display: cardTextStatus ? "inline" : "none" }}>
                {homeAddr}
              </CardText>
              <input
                type="text"
                value={homeAddr}
                style={{
                  borderColor: borderColor,
                  borderStyle: "solid",
                  display: inputStatus ? "inline" : "none",
                  marginTop: "10px",
                  width: "75%",
                }}
                onChange={(e) => setHomeAddr(e.target.value)}
              />
            </div>
          </div>

          <div className="infoSpace row">
            <Col className="btn-group-customize">
              <Button
                outline
                color="warning"
                onClick={handleEdit}
                style={{ display: showButton ? "none" : "block" }}
              >
                EDIT
              </Button>
              <Button
                outline
                color="primary"
                style={{ display: submitButtonStatus ? "block" : "none" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
            <Col xs lg="2" className="btn-cancel-group">
              <Button
                outline
                color="danger"
                style={{ display: submitButtonStatus ? "block" : "none" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
