import "./styles/App.css";
import Page from "./components/Page";
import RightBar from "./components/RightBar";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const getData = (cityInut) => {
    if (!cityInut) {
      alert("Enter city");
      return;
    }
    setLocation(cityInut);
    getCoords(cityInut);
  };

  const getCurrentLocCoords = (currentLat, CurrentLon) => {
    if (!currentLat || !CurrentLon) {
      alert("Cannot get Current Location");
      return;
    }
    getWeather(currentLat, CurrentLon);
  };

  const getCoords = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setLat(res.data.coord.lat);
        setLon(res.data.coord.lon);
        getWeather(res.data.coord.lat, res.data.coord.lon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWeather = (latti, longi) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latti}&lon=${longi}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useLayoutEffect(() => {
    getCoords("bengaluru");
  }, []);

  return (
    <div className="App">
      <Page
        temperature={data.main ? Math.round(data.main.temp - 273.15) : null}
        cityName={data.name}
        weather={data.weather ? data.weather[0].main : null}
        iconId={data.weather ? data.weather[0].icon : null}
        timeStamp={data ? data.dt : null}
      />
      <RightBar
        onFormSubmit={getData}
        getMyLoc={getCurrentLocCoords}
        clouds={data.clouds ? data.clouds.all : " - "}
        humidity={data.main ? data.main.humidity : " - "}
        windSpeed={data.wind ? Math.round(data.wind.speed * 3.6) : " - "}
        sunrise={
          data.sys
            ? new Date(data.sys.sunrise * 1000).toLocaleTimeString()
            : " - "
        }
        sunset={
          data.sys
            ? new Date(data.sys.sunset * 1000).toLocaleTimeString()
            : " - "
        }
        feelsLike={
          data.main ? Math.round(data.main.feels_like - 273.15) : " - "
        }
        pressure={data.main ? data.main.pressure : " - "}
        weatherDesc={data.weather ? data.weather[0].description : " - "}
      />
    </div>
  );
}

export default App;
