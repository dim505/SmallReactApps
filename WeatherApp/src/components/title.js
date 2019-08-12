import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react';








function AlertDismissibleExample() {
  const [show, setShow] = useState(true);



  if (show) {
    setTimeout(() => {
      setShow(false)
    }, 50000);

    return (
     


      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Attention!!</Alert.Heading>
        <p>
          Due to how the weather API operates, it only accepts city name and ISO code. It might return undesired results if there are multiple cities with the same name in the same country. <br></br>

          **Also, Geolocation is only an approximate estimation of location **
        </p>
      </Alert>
    )
                      
              
    
  }
  return <div></div>;
}


export default function Titles() {
    return (
        <div>

            <AlertDismissibleExample />
            <h1 id="header">Welcome to My Weather App</h1>
            <h5 id="headerBody"> Please input the city name and ISO Code to see the weather below </h5>
        </div>
    )
}
