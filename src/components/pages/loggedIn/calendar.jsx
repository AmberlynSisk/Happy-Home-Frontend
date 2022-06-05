import React, { useEffect, useState } from "react";
import Navbar from "../../navigation/navbar";
import { Calendar as BigCal, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../../Context";
import axios from "axios";

const locales = {
  "en-us": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const { currentUser } = useAppContext();
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(`http://127.0.0.1:5000/event/get/${currentUser}`)
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  useEffect(() => {
    getEvents();
  }, [currentUser]);

  const handleAddEvent = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/event/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        user_id: currentUser,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAllEvents([...allEvents, res]);
      })
      .catch((error) => {
        console.log("Error with logging in, please try again.", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="calendarContainer">
        <h1>Calendar</h1>
        <h2>Add New Event</h2>
        <div>
          <input
            type="text"
            placeholder="Add Title"
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            showTimeSelect
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            showTimeSelect
          />
          <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
        <BigCal
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </>
  );
};

export default Calendar;
