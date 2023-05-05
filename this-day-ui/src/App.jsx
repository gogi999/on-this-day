import 'react-calendar/dist/Calendar.css';

import {
  useEffect,
  useState,
} from 'react';

import Calendar from 'react-calendar';

import { months } from './constants';
import {
  getFormatedDay,
  getThisDayEvents,
} from './functions';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    getEvents(selectedDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEvents = (day) => {
    getThisDayEvents(getFormatedDay(day))
      .then((res) => {
        setEvents(res);
      });
  }

  const handleDateChange = (day) => {
    const newSelectedDate = new Date(day);
    setSelectedDate(newSelectedDate);
    getEvents(newSelectedDate);
    setCalendarDate(newSelectedDate);
    setIsCalendarVisible(false);
  }

  const getOtherEvents = () => {
    return events.list.slice(1)?.map((event) => (
      <a 
        key={event.link}
        href={event.link}
        target="_blank" 
        rel="noreferrer" 
      >
        <div className="max-w-md rounded-md drop-shadow-2xl border-solid bg-gray-600 mb-6 p-4">
          <p>{event.text}</p>
        </div>
      </a>
    ));
  }

  return (
    <div className="max-w-screen-lg mx-auto divide-y">
      <h1 className="mt-6 text-4xl flex justify-between mb-6">
        <span>This Day in History:{" "}
          <span className="bg-yellow-300 rounded-lg px-2 ml-2 text-slate-800 font-bold text-2xl">
            {months[selectedDate.getMonth()] + " "}
            {selectedDate.getDate()}
          </span>
        </span>
        <span 
          onClick={() => setIsCalendarVisible(true)}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm cursor-pointer absolute md:relative top-7 right-1 md:top-0 md:right-0"
        >
          <span className="md:leading-8">
            Different day
          </span>
          {isCalendarVisible && (
            <span className="absolute right-0 top-12 z-10 drop-shadow-2xl">
              <Calendar 
                onChange={(date) => handleDateChange(date)}
                value={calendarDate}
              />
            </span>
          )}
        </span>
      </h1>
      {events?.list?.length && (
        <>
          <div className="pt-6">
            <h2 className="text-2xl mb-4">
              Featured Event
            </h2>
            <a 
              href={events.list[0].link} 
              target="_blank" 
              rel="noreferrer"
              className="relative"  
            >
              <div className="max-w-lg rounded-md drop-shadow-2xl border-solid bg-gray-600 grid gap-4 grid-cols-2 overflow-hidden">
                <img src={events.imgSource} alt="" />
                <p className="pr-4 py-4">
                  {events.list[0]?.text}
                </p>
                <p className="absolute bottom-0 text-sm">
                  <i className="text-xs md:text-sm">
                    &copy; https://en.wikipedia.org
                  </i>
                </p>
              </div>
            </a>
          </div>
          <div className="mt-6 pt-6">
            <h2 className="text-2xl mb-4">
              More Events On This Day
            </h2>
            {getOtherEvents()}
          </div>
        </>
      )}
      {!events?.list?.length && (
        <p className="pt-4">
          Unfortunately we do not have information for this day!
        </p>
      )} 
    </div>
  );
}

export default App;
