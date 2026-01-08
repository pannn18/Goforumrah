"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import DestinationPanel from "./DestinationPicker";
import DateRangePanel from "./DateRangePicker";
import GuestRoomPanel from "./GuestRoomPicker";

export default function HotelSearch() {
  const [destination, setDestination] = useState("");

  const [openDest, setOpenDest] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  // Date state
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Guest state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      const t = event.target as Node;

      if (destRef.current && !destRef.current.contains(t)) setOpenDest(false);
      if (dateRef.current && !dateRef.current.contains(t)) setOpenDate(false);
      if (guestRef.current && !guestRef.current.contains(t)) setOpenGuest(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const dateText =
    checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : "Check in - Check out";

  const handleSearch = () => {
    console.log("Searching hotels:", {
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    });
  };

  return (
    <div className="searchContainer">
      <div className="searchBox">
        {/* Destination */}
        <div className="searchField searchField--wide searchField--dropdown" ref={destRef}>
          <Image 
            src="/images/buildings.svg" 
            alt="Hotel" 
            width={24} 
            height={24} 
            className="searchField__icon" 
          />
          <input
            type="text"
            className="searchField__input lg lg--regular"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => {
              setOpenDest(true);
              setOpenDate(false);
              setOpenGuest(false);
            }}
          />

          {openDest && (
            <DestinationPanel
              query={destination}
              onPick={(value) => {
                setDestination(value);
                setOpenDest(false);
              }}
            />
          )}
        </div>

        <div className="searchBox__divider" />

        {/* Date */}
        <div className="searchField searchField--dropdown" ref={dateRef}>
          <Image 
            src="/images/calender.svg" 
            alt="Calendar" 
            width={24} 
            height={24} 
            className="searchField__icon" 
          />
          <button
            type="button"
            className={`searchField__button lg lg--regular ${checkIn ? "is-filled" : ""}`}
            onClick={() => {
              setOpenDate((v) => !v);
              setOpenDest(false);
              setOpenGuest(false);
            }}
          >
            {dateText}
          </button>

          {openDate && (
            <DateRangePanel
              checkIn={checkIn}
              checkOut={checkOut}
              onPickCheckIn={setCheckIn}
              onPickCheckOut={setCheckOut}
            />
          )}
        </div>

        <div className="searchBox__divider" />

        {/* Guest */}
        <div className="searchField searchField--dropdown" ref={guestRef}>
          <Image 
            src="/images/users.svg" 
            alt="Users" 
            width={24} 
            height={24} 
            className="searchField__icon" 
          />

          <button
            type="button"
            className="searchField__button searchField__wrapper lg lg--regular"
            onClick={() => {
              setOpenGuest((v) => !v);
              setOpenDest(false);
              setOpenDate(false);
            }}
          >
            <span className={adults > 0 ? "is-filled" : ""}>{adults} adult{adults > 1 ? "s" : ""}</span>
            <span className="searchField__dot" />
            <span className={children > 0 ? "is-filled" : ""}>{children} children</span>
            <span className="searchField__dot" />
            <span className={rooms > 0 ? "is-filled" : ""}>{rooms} room{rooms > 1 ? "s" : ""}</span>
          </button>

          {openGuest && (
            <GuestRoomPanel
              adults={adults}
              kids={children}
              rooms={rooms}
              setAdults={setAdults}
              setKids={setChildren}
              setRooms={setRooms}
            />
          )}
        </div>

        <button type="button" className="searchBox__cta bs bs--bold" onClick={handleSearch}>
          Search Hotel
        </button>
      </div>
    </div>
  );
}