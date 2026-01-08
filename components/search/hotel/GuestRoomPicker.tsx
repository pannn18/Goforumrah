"use client";

import Image from "next/image";

type Props = {
  adults: number;
  kids: number;
  rooms: number;
  setAdults: (v: number) => void;
  setKids: (v: number) => void;
  setRooms: (v: number) => void;
};

export default function GuestRoomPanel({ adults, kids, rooms, setAdults, setKids, setRooms }: Props) {
  const inc = (setter: (v: number) => void, v: number) => setter(v + 1);
  const dec = (setter: (v: number) => void, v: number, min: number) => {
    if (v > min) setter(v - 1);
  };

  return (
    <div className="dropdown dropdown--guest">
      <div className="dropdown__head">
        <p className="dropdown__title">Passenger</p>
      </div>

      <div className="counterList">
        {/* Adults */}
        <div className="counterRow">
          <p className="counterRow__label">Adult</p>
          <div className="counterRow__ctrl">
            <button
              type="button"
              className={`counterBtn ${adults <= 1 ? "is-disabled" : ""}`}
              onClick={() => dec(setAdults, adults, 1)}
              disabled={adults <= 1}
            >
              <Image src="/images/minus-icon.svg" alt="-" width={20} height={20} />
            </button>
            <span className="counterRow__value">{adults}</span>
            <button type="button" className="counterBtn" onClick={() => inc(setAdults, adults)}>
              <Image src="/images/plus-icon.svg" alt="+" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="counterRow">
          <p className="counterRow__label">Children</p>
          <div className="counterRow__ctrl">
            <button
              type="button"
              className={`counterBtn ${kids <= 0 ? "is-disabled" : ""}`}
              onClick={() => dec(setKids, kids, 0)}
              disabled={kids <= 0}
            >
              <Image src="/images/minus-icon.svg" alt="-" width={20} height={20} />
            </button>
            <span className="counterRow__value">{kids}</span>
            <button type="button" className="counterBtn" onClick={() => inc(setKids, kids)}>
              <Image src="/images/plus-icon.svg" alt="+" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="counterRow">
          <p className="counterRow__label">Rooms</p>
          <div className="counterRow__ctrl">
            <button
              type="button"
              className={`counterBtn ${rooms <= 1 ? "is-disabled" : ""}`}
              onClick={() => dec(setRooms, rooms, 1)}
              disabled={rooms <= 1}
            >
              <Image src="/images/minus-icon.svg" alt="-" width={20} height={20} />
            </button>
            <span className="counterRow__value">{rooms}</span>
            <button type="button" className="counterBtn" onClick={() => inc(setRooms, rooms)}>
              <Image src="/images/plus-icon.svg" alt="+" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
