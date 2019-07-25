import Alert from 'react-bootstrap/Alert'

import React, { useState } from 'react';


function AlertDismissibleExample() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Attention!!</Alert.Heading>
        <p>
          Due to how the weather API operates, it only accepts city and country code. It might return undesired results if there are  multiple cities with the same name in the same country. 
        </p>
      </Alert>
    );
  }
  return <div></div>;
}


export default function Titles() {
    return (
        <div>

            <AlertDismissibleExample />
            <h1 className="text-danger">Welcome to My Weather App</h1>
            <p> Please select the city and country code to see the weather below </p>
        </div>
    )
}
