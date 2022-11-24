import React, { useLayoutEffect, useState } from "react";
import "../styles/Page.css";

const Page = (props) => {
  // const datadate = () => {
  //   let dt = new Date(1661870592 * 1000).toLocaleString();
  //   console.log(dt);
  // };
  // datadate();

  const [tmstmp, setTmstmp] = useState("");

  const timeAndDate = async (timeStamp) => {
    var requiredDateTime = new Date(timeStamp * 1000);
    // var months = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];
    // const weekdays = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday",
    // ];
    // const year = requiredDateTime.getFullYear();
    // const month = months[requiredDateTime.getMonth()];
    // const day = weekdays[requiredDateTime.getDay()];
    // const date = requiredDateTime.getDate();
    // const hour = requiredDateTime.getHours();
    // const min = requiredDateTime.getMinutes();
    // const sec = requiredDateTime.getSeconds();
    // const time =
    //   date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    // const time = { date, day, month, year, hour, min, sec };
    // return time;
    const actualDate = requiredDateTime.toUTCString();
    setTmstmp(actualDate);
  };

  useLayoutEffect(() => {
    timeAndDate(props.timeStamp);
  }, [props]);

  return (
    <div className="container">
      <h3 className="appBrand">Wunder</h3>
      <div className="weatherDetails">
        <h1 className="temp">{props.temperature}&#176;C</h1>
        <div className="city-time">
          <h1 className="cityName">{props.cityName}</h1>
          <small>
            {/* <span className="time">
              07:30 {timeDate.data ? timeDate.data.hour : "-"}:{}
            </span> */}
            {/* <span> - </span> */}
            <span className="date" style={{ marginLeft: "10px" }}>
              {tmstmp ? tmstmp.slice(0, 12) : "-"}
            </span>
          </small>
        </div>
        <div className="weather">
          <img
            src={
              !props.iconId
                ? null
                : `http://openweathermap.org/img/w/${props.iconId}.png`
            }
            alt="icon"
            width={"50"}
            height={"50"}
          />
          <span className="condition">{props.weather}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
