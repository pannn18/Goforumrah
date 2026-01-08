"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LocationModal from "./LocationModal";
import DatePickerModal from "./DatePickerModal";
import PassengerModal from "./PassengerModal";

type FlightType = "round-trip" | "one-way";
type CabinClass = "economy" | "premium-economy" | "business" | "first";

export default function FlightSearch() {
  const [flightType, setFlightType] = useState<FlightType>("round-trip");

  // from/to
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  // dates
  const [departDate, setDepartDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [openDate, setOpenDate] = useState(false);
  const [dateMode, setDateMode] = useState<"depart" | "return">("depart");

  // passengers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [cabin, setCabin] = useState<CabinClass>("economy");
  const [openPassenger, setOpenPassenger] = useState(false);

  // refs (click outside)
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (fromRef.current && !fromRef.current.contains(target)) setOpenFrom(false);
      if (toRef.current && !toRef.current.contains(target)) setOpenTo(false);

      const clickInsideDate =
        (dateRef.current && dateRef.current.contains(target)) ||
        (returnRef.current && returnRef.current.contains(target)) ||
        (target as HTMLElement).closest(".dropdown--datepicker");
      if (!clickInsideDate) setOpenDate(false);

      if (passengerRef.current && !passengerRef.current.contains(target)) setOpenPassenger(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const swapPlace = () => {
    setFromText(toText);
    setToText(fromText);
  };

  const totalPax = adults + children + babies;

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const cabinLabel = (c: CabinClass) => {
    const map: Record<CabinClass, string> = {
      economy: "Economy",
      "premium-economy": "Premium Economy",
      business: "Business",
      first: "First",
    };
    return map[c];
  };

  const onSearch = () => {
    console.log("Searching flights:", {
      flightType,
      from: fromText,
      to: toText,
      departDate,
      returnDate: flightType === "round-trip" ? returnDate : null,
      adults,
      children,
      babies,
      cabin,
    });
  };

  return (
    <div className="searchContainer">
      {/* flight type */}
      <div className="searchContainer__type">
        <label className="searchContainer__typeItem">
          <input
            type="radio"
            name="flightType"
            checked={flightType === "round-trip"}
            onChange={() => {
              setFlightType("round-trip");
            }}
          />
          <span className="searchContainer__typeDot" />
          <span className="searchContainer__typeText bs bs--medium">Round-trip</span>
        </label>

        <label className="searchContainer__typeItem">
          <input
            type="radio"
            name="flightType"
            checked={flightType === "one-way"}
            onChange={() => {
              setFlightType("one-way");
              setReturnDate(null);
              setDateMode("depart");
            }}
          />
          <span className="searchContainer__typeDot" />
          <span className="searchContainer__typeText bs bs--medium">One-way</span>
        </label>
      </div>

      {/* box */}
      <div className="searchBox">
        <div className="searchBox__container searchBox__container--flight">
          {/* FROM */}
          <div className="searchField searchField--dropdown" ref={fromRef}>
            <Image 
              src="/images/AirplaneTakeoff.svg" 
              alt="Airplane Takeoff" 
              width={24} 
              height={24} 
              className="searchField__icon" 
            />
            <input
              className="searchField__input lg lg--regular"
              placeholder="Where from?"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
              onFocus={() => {
                setOpenFrom(true);
                setOpenTo(false);
                setOpenDate(false);
                setOpenPassenger(false);
              }}
            />

            {openFrom && (
              <LocationModal
                value={fromText}
                onPick={(val) => {
                  setFromText(val);
                  setOpenFrom(false);
                }}
                icon="/images/Flight.svg"
              />
            )}
          </div>

          <button type="button" className="searchBox__swap" onClick={swapPlace} aria-label="Swap">
            <Image src="/images/ArrowsLeftRight.svg" alt="" width={20} height={20} />
          </button>

          <div className="searchField searchField--dropdown" ref={toRef}>
            <Image 
              src="/images/AirplaneLanding.svg" 
              alt="Airplane Landing" 
              width={24} 
              height={24} 
              className="searchField__icon" 
            />
            <input
              className="searchField__input lg lg--regular"
              placeholder="Where to?"
              value={toText}
              onChange={(e) => setToText(e.target.value)}
              onFocus={() => {
                setOpenTo(true);
                setOpenFrom(false);
                setOpenDate(false);
                setOpenPassenger(false);
              }}
            />

            {openTo && (
              <LocationModal
                value={toText}
                onPick={(val) => {
                  setToText(val);
                  setOpenTo(false);
                }}
                icon="/images/Flight.svg"
              />
            )}
          </div>
        </div>

        <div className="searchBox__divider" />

        {/* DEPARTURE DATE */}
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
            className={`searchField__button lg lg--regular ${departDate ? "is-filled" : ""}`}
            onClick={() => {
              setDateMode("depart");
              setOpenDate(!openDate);
              setOpenFrom(false);
              setOpenTo(false);
              setOpenPassenger(false);
            }}
          >
            {departDate ? formatDate(departDate) : "Departure"}
          </button>

          {openDate && (
            <DatePickerModal
              flightType={flightType}
              mode={dateMode}
              departDate={departDate}
              returnDate={returnDate}
              onPickDepart={(d) => {
                setDepartDate(d);
                if (flightType === "one-way") {
                  setTimeout(() => setOpenDate(false), 200);
                } else {
                  setDateMode("return");
                }
              }}
              onPickReturn={(d) => {
                setReturnDate(d);
                setTimeout(() => setOpenDate(false), 200);
              }}
            />
          )}
        </div>

        {/* RETURN DATE */}
        {flightType === "round-trip" && (
          <>
            <div className="searchBox__divider" />

            <div className="searchField searchField--dropdown" ref={returnRef}>
              <Image 
                src="/images/calender.svg" 
                alt="Calendar" 
                width={24} 
                height={24} 
                className="searchField__icon" 
              />
              <button
                type="button"
                className={`searchField__button lg lg--regular ${returnDate ? "is-filled" : ""}`}
                onClick={() => {
                  setDateMode("return");
                  setOpenDate(!openDate);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setOpenPassenger(false);
                }}
              >
                {returnDate ? formatDate(returnDate) : "Return"}
              </button>
            </div>
          </>
        )}

        <div className="searchBox__divider" />

        {/* PASSENGER */}
        <div className="searchField searchField--dropdown" ref={passengerRef}>
          <div className="searchField__wrapper searchField__wrapper--container">
            <div className="searchField__small">
              <Image 
                src="/images/users.svg" 
                alt="Users" 
                width={24} 
                height={24} 
                className="searchField__icon" 
              />
              <button
                type="button"
                className={`searchField__button lg lg--regular ${totalPax > 1 ? "is-filled" : ""}`}
                onClick={() => {
                  setOpenPassenger(!openPassenger);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setOpenDate(false);
                }}
              >
                {totalPax} passenger{totalPax > 1 ? "s" : ""}
              </button>
            </div>

            <div className="searchField__dot" />

            <div className="searchField__small">
              <button
                type="button"
                className={`searchField__button lg lg--regular ${cabin !== "economy" ? "is-filled" : ""}`}
                onClick={() => {
                  setOpenPassenger(!openPassenger);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setOpenDate(false);
                }}
              >
                {cabinLabel(cabin)}
              </button>
            </div>
          </div>

          {openPassenger && (
            <PassengerModal
              adults={adults}
              childrenCount={children}
              babies={babies}
              cabin={cabin}
              onAdults={setAdults}
              onChildrenCount={setChildren}
              onBabies={setBabies}
              onCabin={setCabin}
            />
          )}
        </div>

        {/* CTA */}
        <button type="button" className="searchBox__cta bs bs--bold" onClick={onSearch}>
          Search Flight
        </button>
      </div>
    </div>
  );
}