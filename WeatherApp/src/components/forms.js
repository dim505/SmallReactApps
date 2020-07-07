import React from "react";
import ReactTooltip from "react-tooltip";

export default function Forms(props) {
  //this just defines the form, input for city,country and submit button. Upon submit it will call the getweather function
  return (
    <form onSubmit={props.loadWeather}>
      <ReactTooltip effect="solid" />
      <div data-tut="reactour__City" className="form-group">
        <input
          type="text"
          data-rh="Top"
          data-place="top"
          data-tip="Please Input city name here"
          className="form-control"
          name="city"
          placeholder="City Name"
        />
      </div>

      <div data-tut="reactour_CountryCode" className="form-group">
        <input
          type="text"
          data-place="bottom"
          data-tip="Please Input ISO Code Here. EX: US for USA, CA for Canada"
          className="form-control"
          name="country"
          placeholder="ISO Code"
        />
      </div>

      <input
        data-tut="reactour__Submit"
        className="btn btn-outline-success btn-lg btn-block"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
