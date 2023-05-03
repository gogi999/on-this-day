import {
  useEffect,
  useState,
} from 'react';

import { months } from './constants';
import {
  getFormatedDay,
  getThisDayEvents,
} from './functions';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(null);

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

  console.log(events);

  return (
    <div className="max-w-screen-lg mx-auto divide-y">
      <h1 className="mt-6 text-4xl flex justify-between mb-6">
        <span>This Day in History:{" "}
          <span className="bg-yellow-300 rounded-lg px-2 ml-2 text-slate-800 font-bold text-2xl">
            {months[selectedDate.getMonth()] + " "}
            {selectedDate.getDate()}
          </span>
        </span>
        <span className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm cursor-pointer absolute md:relative top-7 right-1 md:top-0 md:right-0">
          <span className="md:leading-8">
            Different day
          </span>
        </span>
      </h1>
    </div>
  );
}

export default App;
