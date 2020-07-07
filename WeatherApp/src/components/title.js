import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import Tooltip from "../Tooltip";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";

function AlertDismissibleExample() {
  const [show, setShow] = useState(true);

  //hides alert after 50 seconds
  if (show) {
    setTimeout(() => {
      setShow(false);
    }, 50000);

    return (
      //defines alert
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Attention!!</Alert.Heading>
        <p>
          Due to how the weather API operates, it only accepts city name and ISO
          code. It might return undesired results if there are multiple cities
          with the same name in the same country. <br></br>
          **Also, Geolocation is only an approximate estimation of location **
        </p>
      </Alert>
    );
  }
  //returns nothing if exit button is clicked.
  return <div></div>;
}

export default function Titles(props) {
  return (
    <div>
      <AlertDismissibleExample />
      <h1 id="header" data-tut="reactour__Start">
        Welcome to My Weather App{" "}
        <Tooltip placement="bottom" tooltip="Click me to start the tour">
          <LiveHelpOutlinedIcon onClick={props.OpenTour} fontSize="large" />
        </Tooltip>
      </h1>{" "}
      <h5 id="headerBody">
        {" "}
        Please input the city name and ISO Code to see the weather below{" "}
      </h5>
    </div>
  );
}
