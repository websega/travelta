import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setActiveInputDate,
  setDepartureDate,
  setReturnDate,
} from '../../redux/actions/aviaParams/aviaParams';
import { RootStateType } from '../../redux/reducers';

import NextIcon from '../../assets/images/icons/right-arrow.svg';
import PrevIcon from '../../assets/images/icons/left-arrow.svg';
import CalendarMonth from './CalendarMonth';

import getMonthDates from '../../utils/getMonthDate';

import './CalendarPicker.scss';
import SlideButton from '../SlideButton';

const CalendarPicker = (): JSX.Element => {
  const dispatch = useDispatch();

  const activeInputDate = useSelector(
    (state: RootStateType) => state.aviaParams.activeInputDate
  );

  const departureDate = useSelector(
    (state: RootStateType) => state.aviaParams.departureDate
  );

  const returnDate = useSelector(
    (state: RootStateType) => state.aviaParams.returnDate
  );

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const [prevMonthData, setPrevMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [nextMonthData, setNextMonthData] = useState<Array<
    number | undefined
  > | null>(null);

  const [prevMonthDate, setDateOfPrevMonth] = useState<Date | null>(null);
  const [nextMonthDate, setDateOfNextMonth] = useState<Date | null>(null);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    setDateOfPrevMonth(new Date(year, month));
    setDateOfNextMonth(new Date(year, month + 1));
  }, []);

  useEffect(() => {
    if (nextMonthDate && prevMonthDate) {
      const prevMonth = getMonthDates(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth()
      );
      const nextMonth = getMonthDates(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth()
      );

      setPrevMonthData(prevMonth);
      setNextMonthData(nextMonth);
    }
  }, [prevMonthDate, nextMonthDate]);

  const handleClickBtn = (value: number) => {
    if (nextMonthDate && prevMonthDate) {
      const prevDate = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth() + value
      );
      const nextDate = new Date(
        nextMonthDate.getFullYear(),
        nextMonthDate.getMonth() + value
      );

      setDateOfPrevMonth(prevDate);
      setDateOfNextMonth(nextDate);
    }
  };

  const handleClickDay = useCallback(
    (date: Date | null) => {
      if (activeInputDate === 'departure') {
        if (hoverDate && returnDate && hoverDate < returnDate) {
          dispatch(setDepartureDate(date));
          dispatch(setActiveInputDate('return'));
        } else if (hoverDate && returnDate && hoverDate > returnDate) {
          const tempEnd = returnDate;
          dispatch(setDepartureDate(tempEnd));
          dispatch(setReturnDate(hoverDate));
        } else if (hoverDate && (departureDate || !departureDate)) {
          dispatch(setDepartureDate(hoverDate));
          dispatch(setActiveInputDate('return'));
        }
      }

      if (activeInputDate === 'return') {
        if (hoverDate && departureDate && hoverDate > departureDate) {
          dispatch(setReturnDate(date));
          dispatch(setActiveInputDate('departure'));
        } else if (hoverDate && departureDate && hoverDate < departureDate) {
          const tempStart = departureDate;
          dispatch(setDepartureDate(hoverDate));
          dispatch(setReturnDate(tempStart));
        } else if (hoverDate && !departureDate) {
          dispatch(setReturnDate(hoverDate));
          dispatch(setActiveInputDate('departure'));
        }
      }
    },
    [activeInputDate, dispatch, returnDate, hoverDate, departureDate]
  );

  const handleMouseEnterDay = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const handleMouseLeaveMonth = useCallback(() => {
    setHoverDate(null);
  }, []);

  const isDisabledBtn = (date: Date | null): boolean =>
    date ? date.getMonth() === new Date().getMonth() : false;

  const handleClickNoReturnButton = () => {
    dispatch(setReturnDate(null));
  };

  return (
    <div className="calendar">
      <div className="calendar__inner">
        {activeForm === 'standart' && (
          <div className="calendar__header">
            <span className="calendar__title">
              Выберите дату
              {activeInputDate === 'departure'
                ? ' отправления'
                : ' возвращения'}
            </span>
            <button
              type="button"
              className="calendar__no-return-btn"
              disabled={!returnDate}
              onClick={handleClickNoReturnButton}
            >
              Без обратного билета
            </button>
          </div>
        )}

        <div className="calendar__months">
          <CalendarMonth
            calendarDate={prevMonthDate}
            monthDates={prevMonthData}
            onClickDay={handleClickDay}
            onMouseEnterDay={handleMouseEnterDay}
            onMouseLeaveMonth={handleMouseLeaveMonth}
            startDate={departureDate}
            endDate={returnDate}
            hoverDate={hoverDate}
          />

          {activeForm === 'standart' && (
            <CalendarMonth
              calendarDate={nextMonthDate}
              monthDates={nextMonthData}
              onClickDay={handleClickDay}
              onMouseEnterDay={handleMouseEnterDay}
              onMouseLeaveMonth={handleMouseLeaveMonth}
              startDate={departureDate}
              endDate={returnDate}
              hoverDate={hoverDate}
            />
          )}
        </div>

        <SlideButton
          icon={<PrevIcon />}
          onClick={() => handleClickBtn(-1)}
          disabled={isDisabledBtn(prevMonthDate)}
          direction="prev"
        />

        <SlideButton
          icon={<NextIcon />}
          onClick={() => handleClickBtn(1)}
          disabled={isDisabledBtn(nextMonthDate)}
          direction="next"
        />
      </div>
    </div>
  );
};

export default CalendarPicker;
