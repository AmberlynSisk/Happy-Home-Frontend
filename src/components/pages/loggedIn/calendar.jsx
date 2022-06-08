import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../navigation/navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useAppContext } from "../../../Context";
import moment from "moment";
import Datetime from "react-datetime";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Calendar = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  const handleEventAdd = () => {
    fetch("https://happyhome-api.herokuapp.com/event/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        start: start,
        end: end,
        user_id: currentUser,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error adding list item, please try again", error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
  };

  const renderSidebar = () => {
    return (
      <div className="calendarSidebar">
        <div className="sidebarSection">
          <h2>Instructions</h2>
          <ul>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="sidebarSection">
          <h2 className="addEventitle">Add An Event</h2>
          <form className="eventForm" onSubmit={onSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{marginBottom: "3px"}}>Event Title</label>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Start Date</label>
              <Datetime value={start} onChange={(date) => setStart(date)} />
            </div>

            <div>
              <label>End Date</label>
              <Datetime value={end} onChange={(date) => setEnd(date)} />
            </div>

            <button className="eventBtn">Add Event</button>
          </form>
        </div>
      </div>
    );
  };

  const getEvents = () => {
    axios
      .get(`https://happyhome-api.herokuapp.com/event/get/${currentUser}`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  const deleteEvent = (id) => {
    axios
      .delete(`https://happyhome-api.herokuapp.com/event/delete/${id}`)
      .then(() => {
        setEvents(
          [...events].filter((event) => {
            return event.event_id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'DELETE' request --> ${err}`
        );
      });
  };

  const handleEventClick = (event) => {
    Swal.fire({
      title: "Are you sure you want to delete this event?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvent(event.event._def.extendedProps.event_id);
      }
    });
  };

  useEffect(() => {
    const userId = window.localStorage.getItem("currentId");
    setCurrentUser(userId);
    getEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="calendarContainer">
        {renderSidebar()}
        <div className="calendarWrapper">
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable={true}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)}
            dayMaxEvents={true}
            eventClick={(event) => handleEventClick(event)}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
