"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  checkIn: Date | null;
  checkOut: Date | null;
  onPickCheckIn: (d: Date) => void;
  onPickCheckOut: (d: Date | null) => void;
};

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function DateRangePanel({ checkIn, checkOut, onPickCheckIn, onPickCheckOut }: Props) {
  const [cursorMonth, setCursorMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const prevMonth = () => setCursorMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  const nextMonth = () => setCursorMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));

  const nextMonthDate = new Date(cursorMonth.getFullYear(), cursorMonth.getMonth() + 1, 1);

  const startOfToday = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  };

  const isDisabled = (d: Date) => d < startOfToday();

  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  const inRange = (d: Date) => {
    if (!checkIn) return false;

    // hover preview ketika checkOut belum ada
    if (!checkOut && hoverDate) {
      const start = checkIn < hoverDate ? checkIn : hoverDate;
      const end = checkIn < hoverDate ? hoverDate : checkIn;
      return d > start && d < end;
    }

    if (checkOut) return d > checkIn && d < checkOut;
    return false;
  };

  const clickDate = (d: Date) => {
    // kalau belum pilih apa-apa ATAU sudah complete range → reset mulai baru
    if (!checkIn || (checkIn && checkOut)) {
      onPickCheckIn(d);
      onPickCheckOut(null);
      return;
    }

    // checkIn ada, checkOut belum
    if (d > checkIn) onPickCheckOut(d);
    else {
      onPickCheckIn(d);
      onPickCheckOut(null);
    }
  };

  const daysInMonth = (monthDate: Date) => {
    const y = monthDate.getFullYear();
    const m = monthDate.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const startPad = first.getDay();

    const out: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let d = 1; d <= last.getDate(); d++) out.push(new Date(y, m, d));
    return out;
  };

  const renderMonth = (monthDate: Date, leftNav?: boolean) => {
    const list = daysInMonth(monthDate);

    return (
      <div className="dpMonth">
        <div className="dpNav">
          {leftNav ? (
            <button type="button" className="dpNav__btn" onClick={prevMonth}>
              <Image src="/images/ArrowLeft.svg" alt="prev" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}

          <p className="dpNav__title">
            {months[monthDate.getMonth()]} {monthDate.getFullYear()}
          </p>

          {!leftNav ? (
            <button type="button" className="dpNav__btn" onClick={nextMonth}>
              <Image src="/images/ArrowRight.svg" alt="next" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}
        </div>

        <div className="dpWeek">
          {days.map((d) => (
            <div key={d} className="dpWeek__day">{d}</div>
          ))}
        </div>

        <div className="dpGrid">
          {list.map((d, idx) => {
            if (!d) return <div key={`e-${idx}`} className="dpCell dpCell--empty" />;

            const disabled = isDisabled(d);

            const isStart = !!(checkIn && sameDay(d, checkIn));
            const isEnd = !!(checkOut && sameDay(d, checkOut));
            const between = inRange(d);

            return (
              <button
                key={idx}
                type="button"
                className={[
                  "dpCell",
                  disabled ? "is-disabled" : "",
                  between ? "is-range" : "",
                  isStart ? "is-start" : "",
                  isEnd ? "is-end" : "",
                ].join(" ")}
                disabled={disabled}
                onMouseEnter={() => {
                  if (checkIn && !checkOut) setHoverDate(d);
                }}
                onMouseLeave={() => setHoverDate(null)}
                onClick={() => !disabled && clickDate(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dropdown dropdown--datepicker">
      <div className="dpWrap">
        {renderMonth(cursorMonth, true)}
        {renderMonth(nextMonthDate, false)}
      </div>
    </div>
  );
}
