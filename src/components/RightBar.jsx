import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../styles/RightBar.css";

const RightBar = (props) => {
  const [inp, setInp] = useState("");

  const handleChange = (event) => {
    setInp(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(inp);
    setInp("");
  };

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      props.getMyLoc(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <div className="rightBar">
      <form id="locationInput" onSubmit={handleSubmit}>
        <input
          type="text"
          className="locationSearch"
          placeholder="Search location..."
          value={inp}
          onChange={handleChange}
        />
        <button type="submit" className="submit">
          <AiOutlineSearch
            style={{ color: "black", width: "25px", height: "25px" }}
          />
        </button>
      </form>

      <ul className="myplace">
        <li className="mylocation" onClick={getMyLocation}>
          My Location
        </li>
      </ul>

      <ul className="weatherdet">
        <h4>Weather Details</h4>
        <li>
          <span>Cloudy</span>
          <span className="cloudy">{props.clouds}%</span>
        </li>
        <li>
          <span>Humidity</span>
          <span className="humidity">{props.humidity}%</span>
        </li>
        <li>
          <span>Wind</span>
          <span className="wind">{props.windSpeed}km/h</span>
        </li>
        <li>
          <span>Pressure</span>
          <span className="pressure">{props.pressure} hPa</span>
        </li>
        <li>
          <span>Weather Description</span>
          <span className="weatherDescription">{props.weatherDesc}</span>
        </li>
        <li>
          <span>Feels like</span>
          <span className="feels">{props.feelsLike}&#176;C</span>
        </li>

        <li>
          <span>Sunrise</span>
          <span className="sunrise">{props.sunrise}</span>
        </li>
        <li>
          <span>Sunset</span>
          <span className="sunset">{props.sunset}</span>
        </li>
      </ul>
    </div>
  );
};

export default RightBar;
