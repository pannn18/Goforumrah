"use client";

import { useState } from "react";
import Image from "next/image";

export type FlightType = "round-trip" | "one-way";
export type DateMode = "depart" | "return";

type Props = {
  flightType: FlightType;
  mode: DateMode;
  departDate: Date | null;
  returnDate: Date | null;
  onPickDepart: (d: Date) => void;
  onPickReturn: (d: Date) => void;
};

export default function DatePickerModal({
  flightType,
  mode,
  departDate,
  returnDate,
  onPickDepart,
  onPickReturn,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const daysInMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const items: Array<Date | null> = [];
    for (let i = 0; i < first.getDay(); i++) items.push(null);
    for (let d = 1; d <= last.getDate(); d++) items.push(new Date(y, m, d));
    return items;
  };

  const isSame = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.toDateString() === b.toDateString();

  const isDisabled = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (d < today) return true;
    if (flightType === "round-trip" && mode === "return" && departDate) {
      return d <= departDate;
    }
    return false;
  };

  const inRange = (d: Date) => {
    if (flightType === "one-way") return false;
    if (!departDate) return false;

    if (!returnDate && hoverDate && mode === "return") {
      const start = departDate < hoverDate ? departDate : hoverDate;
      const end = departDate < hoverDate ? hoverDate : departDate;
      return d > start && d < end;
    }

    if (returnDate) return d > departDate && d < returnDate;
    return false;
  };

  const pick = (d: Date) => {
    if (flightType === "one-way") {
      onPickDepart(d);
      return;
    }

    if (mode === "depart") {
      onPickDepart(d);
      return;
    }

    if (departDate && d > departDate) onPickReturn(d);
    else onPickDepart(d);
  };

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  const renderMonth = (monthDate: Date, leftNav?: boolean) => {
    const list = daysInMonth(monthDate);

    return (
      <div className="dpMonth">
        <div className="dpNav">
          {leftNav ? (
            <button
              type="button"
              className="dpNav__btn"
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
              }
            >
              <Image src="/images/ArrowLeft.svg" alt="Prev" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}

          <p className="dpNav__title">
            {months[monthDate.getMonth()]} {monthDate.getFullYear()}
          </p>

          {!leftNav ? (
            <button
              type="button"
              className="dpNav__btn"
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
              }
            >
              <Image src="/images/ArrowRight.svg" alt="Next" width={20} height={20} />
            </button>
          ) : (
            <div style={{ width: 28 }} />
          )}
        </div>

        <div className="dpWeek">
          {days.map((x) => (
            <div key={x} className="dpWeek__day">{x}</div>
          ))}
        </div>

        <div className="dpGrid">
          {list.map((d, i) => {
            if (!d) return <div key={`e-${i}`} className="dpCell dpCell--empty" />;

            const disabled = isDisabled(d);
            const start = isSame(d, departDate);
            const end = isSame(d, returnDate);
            const range = inRange(d);

            return (
              <button
                key={i}
                type="button"
                className={[
                  "dpCell",
                  disabled ? "is-disabled" : "",
                  start ? "is-start" : "",
                  end ? "is-end" : "",
                  range ? "is-range" : "",
                ].join(" ")}
                onMouseEnter={() => {
                  if (flightType === "round-trip" && mode === "return" && departDate && !returnDate) {
                    setHoverDate(d);
                  }
                }}
                onMouseLeave={() => setHoverDate(null)}
                onClick={() => !disabled && pick(d)}
                disabled={disabled}
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
        {renderMonth(currentMonth, true)}
        {renderMonth(nextMonth, false)}
      </div>
    </div>
  );
}