import React, { useState,useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios'; 

moment.tz.setDefault("Asia/Kolkata"); 
const localizer = momentLocalizer(moment);

export default function Cal(props) {
  const [eventsData, setEventsData] = useState([]);


  const handleSelect = ({ start, end }) => {
    const title = "Lock";
    console.log(start);
    console.log(end);
    if (title) {
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
          un: props.user1,
        },
      ]);
      handleLockedDates(start, end, title, props.user1);
    }
  };
  
  const eventPropGetter = (event) => {
    if (event.title === 'Lock') {
      return {
        style: {
          backgroundColor: 'yellow',
        },
      };
    } else if (event.title === 'Confirmed') {
      return {
        style: {
          backgroundColor: 'green',
        },
      };
    }
  }

  
  const handleEventClick = (clickedEvent) => {
    const updatedEvents = eventsData.map((event) => {
      if (event === clickedEvent) {
        const newStatus = event.title === 'Lock' ? 'Confirmed' : 'Lock';
        return {
          ...event,
          title: newStatus,
          backgroundColor: newStatus === 'Confirmed' ? 'green' : 'yellow',
        };
      }
      return event;
    });

    setEventsData(updatedEvents);
    handleConfirmStatus(clickedEvent);
  };

  const handleConfirmStatus = (clickedEvent) => {
    const { start, end, title, un } = clickedEvent;

    axios
      .post("http://localhost:8081/updateStatus", {
        start,
        end,
        title: title === 'Lock' ? 'Confirmed' : 'Lock',
        un,
      })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error); 
      });
  };

  const handleLockedDates = (start, end, title, un) => {
    console.log(start);
    console.log(end);
    console.log(title);
    console.log(un);

    axios
      .post("http://localhost:8081/insertLockedDates", { start, end, title, un })
      .then((response) => {
        console.log("Locked dates successfully saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving locked dates:", error);
      });
  };

   
  useEffect(() => {
    const callfun = () => {
     // const un = props.user1;
      axios.post('http://localhost:8081/checkTeachDates', )
        .then((response) => {
          console.log('Locked dates successfully viewed:', response.data.lockedDates);
          let lockd = response.data.lockedDates;
          const formattedDates = lockd.map((item) => ({
            title: item.Title,
            start: new Date(item.StartDate),
            end: new Date(item.EndDate),
             un: item.Username,
          }));
          setEventsData([...eventsData, ...formattedDates]);
        })
        .catch((error) => {
          console.error('Error viewing locked dates:', error);
        });
    };
    callfun();
  }, []);

    return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
         onSelectEvent={handleEventClick} 
         eventPropGetter={eventPropGetter}

        
      />
    </div>
  );
}


