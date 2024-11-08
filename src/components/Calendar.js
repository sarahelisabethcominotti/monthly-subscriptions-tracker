import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { SubscriptionContext } from "../SubscriptionContext";

export const apiUrl = process.env.REACT_APP_API_URL;

export const Calendar = () => {
  const { listOfSubscriptions, setListOfSubscriptions } = useContext(SubscriptionContext);
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSubscription = (id) => {
    setIsLoading(true);
    const url = `${apiUrl}/deleteSubscription/${id}`;
    console.log(`Attempting to delete subscription at: ${url}`);

    Axios.delete(url)
      .then((response) => {
        setListOfSubscriptions(
          listOfSubscriptions.filter((subscription) => subscription._id !== id)
        );
        setIsLoading(false);
        alert("SUBSCRIPTION DELETED SUCCESSFULLY");
      })
      .catch((error) => {
        console.error(
          "There was an error deleting the subscription!",
          error.response ? error.response.data : error.message
        );
      });
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    let calendarDays = [];

    // previous month days
    for (let i = firstDayOfMonth; i > 0; i--) {
      calendarDays.push({ day: lastDateOfPrevMonth - i + 1, isCurrentMonth: false });
    }

    // current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    // next month days
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({ day: i, isCurrentMonth: false });
    }

    setDays(calendarDays);
  };

  useEffect(() => {
    generateCalendarDays();
  }, [date]);

  const handlePrevNext = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + direction);
    setDate(newDate);
  };

  const isSubscriptionDay = (day, month, year, subscription) => {
    const startDate = new Date(subscription.start);
    const endDate = subscription.end ? new Date(subscription.end) : null;

    const checkDate = new Date(year, month, day);

    if (checkDate < startDate || (endDate && checkDate > endDate)) {
      return false; //should not show
    }

    switch (subscription.recurrency) {
      case "weekly":
        return (
          (checkDate - startDate) % (7 * 24 * 60 * 60 * 1000) === 0
        );
      case "monthly":
        return startDate.getDate() === day;
      case "yearly":
        return startDate.getDate() === day && startDate.getMonth() === month;
      default:
        return checkDate.getTime() === startDate.getTime(); // one-time event
    }
  };

  return (
    <>
      <div className="calendar-container">
        <header className="calendar-header">
          <p className="calendar-current-date">
            {months[date.getMonth()]} {date.getFullYear()}
          </p>
          <div className="calendar-navigation">
            <span
              id="calendar-prev"
              className="material-symbols-rounded"
              onClick={() => handlePrevNext(-1)}
            >
              chevron_left
            </span>
            <span
              id="calendar-next"
              className="material-symbols-rounded"
              onClick={() => handlePrevNext(1)}
            >
              chevron_right
            </span>
          </div>
        </header>

        <div className="calendar-body">
          <ul className="calendar-weekdays">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="calendar-dates">
            {days.map((day, index) => (
              <li
                key={index}
                className={`${day.isCurrentMonth ? "" : "inactive"} ${
                  day.isToday ? "active" : ""
                }`}
              >
                <p>{day.day}</p>
                {listOfSubscriptions
                  .filter((sub) =>
                    isSubscriptionDay(day.day, date.getMonth(), date.getFullYear(), sub)
                  )
                  .map((sub, idx) => (
                    <p key={idx} className="subscription-name">
                      • {sub.name}
                    </p>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Calendar;
