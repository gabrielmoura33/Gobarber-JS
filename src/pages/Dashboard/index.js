import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import api from '~/services/api';
import { Container, Time } from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  function handleAddDays() {
    setDate(addDays(date, 1));
  }
  function handleSubDays() {
    setDate(subDays(date, 1));
  }
  const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });
      setSchedule(data);
    }
    loadSchedule();
  }, [date]);
  return (
    <Container>
      <header>
        <button type="button" onClick={handleSubDays}>
          <MdArrowBack color="#FFF" size={36} />
        </button>
        <strong>{dateFormated}</strong>
        <button type="button" onClick={handleAddDays}>
          <MdArrowForward color="#FFF" size={36} />
        </button>
      </header>

      <ul>
        {schedule.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em Aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
