'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DatePickerDropdownProps {
  pickupDate: Date | null;
  dropoffDate: Date | null;
  onSelectPickup: (date: Date) => void;
  onSelectDropoff: (date: Date | null) => void;
}

export default function DatePickerDropdown({
  pickupDate,
  dropoffDate,
  onSelectPickup,
  onSelectDropoff
}: DatePickerDropdownProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingPickup, setIsSelectingPickup] = useState(!pickupDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<Date | null> = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (isSelectingPickup) {
      onSelectPickup(date);
      setIsSelectingPickup(false);
    } else {
      if (pickupDate && date > pickupDate) {
        onSelectDropoff(date);
      } else {
        onSelectPickup(date);
        onSelectDropoff(null);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!pickupDate) return false;

    if (!dropoffDate && hoverDate) {
      const start = pickupDate < hoverDate ? pickupDate : hoverDate;
      const end = pickupDate < hoverDate ? hoverDate : pickupDate;
      return date > start && date < end;
    }

    if (dropoffDate) {
      return date > pickupDate && date < dropoffDate;
    }

    return false;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

  const renderMonth = (monthDate: Date, isLeft: boolean) => {
    const days = getDaysInMonth(monthDate);

    return (
      <div className="dpMonth">
        <div className="dpNav">
          {isLeft ? (
            <button type="button" onClick={prevMonth} className="dpNav__btn">
              <Image src="/images/ArrowLeft.svg" alt="Previous" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}

          <p className="dpNav__title xl xl--bold">
            {months[monthDate.getMonth()]} {monthDate.getFullYear()}
          </p>

          {!isLeft ? (
            <button type="button" onClick={nextMonth} className="dpNav__btn">
              <Image src="/images/ArrowRight.svg" alt="Next" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}
        </div>

        <div className="dpWeek">
          {daysOfWeek.map((day) => (
            <div key={day} className="dpWeek__day xs xs--medium">{day}</div>
          ))}
        </div>

        <div className="dpGrid">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="dpCell dpCell--empty" />;
            }

            const isDisabled = isDateDisabled(date);
            const isInRange = isDateInRange(date);
            const isStart = pickupDate && date.toDateString() === pickupDate.toDateString();
            const isEnd = dropoffDate && date.toDateString() === dropoffDate.toDateString();

            return (
              <button
                key={index}
                type="button"
                className={[
                  'dpCell',
                  isStart ? 'is-start' : '',
                  isEnd ? 'is-end' : '',
                  isInRange ? 'is-range' : '',
                  isDisabled ? 'is-disabled' : ''
                ].join(' ')}
                onMouseEnter={() => {
                  if (!isSelectingPickup && pickupDate && !dropoffDate) {
                    setHoverDate(date);
                  }
                }}
                onMouseLeave={() => setHoverDate(null)}
                onClick={() => !isDisabled && handleDateClick(date)}
                disabled={isDisabled}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dropdown dropdown--datepicker">
      <div className="dpWrap xl xl--bold">
        {renderMonth(currentMonth, true)}
        {renderMonth(nextMonthDate, false)}
      </div>
    </div>
  );
}