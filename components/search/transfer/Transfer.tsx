"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LocationDropdown from "./Destination";
import DatePickerDropdown from "./DatePicker";

interface TransferSearchProps {
  onTransferTypeChange?: (type: "same-location" | "different-location") => void;
}

export default function TransferSearch({ onTransferTypeChange }: TransferSearchProps) {
  const [transferType, setTransferType] = useState<"same-location" | "different-location">("same-location");

  const handleTransferTypeChange = (type: "same-location" | "different-location") => {
    setTransferType(type);
    onTransferTypeChange?.(type);
  };

  // Location states
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);

  // DatePicker states
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Refs for click outside detection
  const pickupLocationRef = useRef<HTMLDivElement>(null);
  const dropoffLocationRef = useRef<HTMLDivElement>(null);
  const pickupDateRef = useRef<HTMLDivElement>(null);
  const dropoffDateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (pickupLocationRef.current && !pickupLocationRef.current.contains(target)) {
        setShowPickupDropdown(false);
      }
      if (dropoffLocationRef.current && !dropoffLocationRef.current.contains(target)) {
        setShowDropoffDropdown(false);
      }

      const isClickInsideDate =
        (pickupDateRef.current && pickupDateRef.current.contains(target)) ||
        (dropoffDateRef.current && dropoffDateRef.current.contains(target)) ||
        (target as HTMLElement).closest(".dropdown--datepicker");

      if (!isClickInsideDate) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Searching transfer:", {
      transferType,
      pickupLocation,
      dropoffLocation: transferType === "different-location" ? dropoffLocation : pickupLocation,
      pickupDate,
      dropoffDate,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="searchContainer">
      {/* Transfer Type Radio Buttons */}
      <div className="searchContainer__type">
        <label className="searchContainer__typeItem">
          <input
            type="radio"
            name="transfer-type"
            value="same-location"
            checked={transferType === "same-location"}
            onChange={(e) => handleTransferTypeChange(e.target.value as "same-location")}
          />
          <span className="searchContainer__typeDot" />
          <span className="searchContainer__typeText bs bs--medium">Return to same location</span>
        </label>
        <label className="searchContainer__typeItem">
          <input
            type="radio"
            name="transfer-type"
            value="different-location"
            checked={transferType === "different-location"}
            onChange={(e) => handleTransferTypeChange(e.target.value as "different-location")}
          />
          <span className="searchContainer__typeDot" />
          <span className="searchContainer__typeText bs bs--medium">Return to different location</span>
        </label>
      </div>

      <div className="searchBox">
        {/* Pickup Location */}
        <div
          className={`searchField ${transferType === "same-location" ? "searchField--wide" : ""} searchField--dropdown`}
          ref={pickupLocationRef}
        >
          <Image
            src="/images/map-pin-outline.svg"
            alt="Location"
            width={24}
            height={24}
            className="searchField__icon"
          />
          <input
            type="text"
            className="searchField__input lg lg--regular"
            placeholder={
              transferType === "same-location" ? "Where your pick-up location?" : "Your pick-up location?"
            }
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            onFocus={() => {
              setShowPickupDropdown(true);
              setShowDropoffDropdown(false);
              setShowDateDropdown(false);
            }}
          />

          {showPickupDropdown && (
            <LocationDropdown
              searchQuery={pickupLocation}
              onSelect={(location) => {
                setPickupLocation(location);
                setShowPickupDropdown(false);
              }}
            />
          )}
        </div>

        {/* Dropoff Location - Only show if different location */}
        {transferType === "different-location" && (
          <>
            <div className="searchBox__divider" />

            <div className="searchField searchField--wide searchField--dropdown" ref={dropoffLocationRef}>
              <Image
                src="/images/map-pin-outline.svg"
                alt="Location"
                width={24}
                height={24}
                className="searchField__icon"
              />
              <input
                type="text"
                className="searchField__input lg lg--regular"
                placeholder="Your drop-off location?"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                onFocus={() => {
                  setShowDropoffDropdown(true);
                  setShowPickupDropdown(false);
                  setShowDateDropdown(false);
                }}
              />

              {showDropoffDropdown && (
                <LocationDropdown
                  searchQuery={dropoffLocation}
                  onSelect={(location) => {
                    setDropoffLocation(location);
                    setShowDropoffDropdown(false);
                  }}
                />
              )}
            </div>
          </>
        )}

        <div className="searchBox__divider" />

        {/* Pickup Date & Time */}
        <div className="searchField searchField--date searchField--dropdown" ref={pickupDateRef}>
          <Image src="/images/calender.svg" alt="Calendar" width={24} height={24} className="searchField__icon" />
          <button
            type="button"
            className={`searchField__button lg lg--regular ${pickupDate ? "is-filled" : ""}`}
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowPickupDropdown(false);
              setShowDropoffDropdown(false);
            }}
          >
            {pickupDate ? formatDate(pickupDate) : "Pick-up Date & Time"}
          </button>

          {showDateDropdown && (
            <DatePickerDropdown
              pickupDate={pickupDate}
              dropoffDate={dropoffDate}
              onSelectPickup={(date) => setPickupDate(date)}
              onSelectDropoff={(date) => {
                setDropoffDate(date);
                setTimeout(() => setShowDateDropdown(false), 300);
              }}
            />
          )}
        </div>

        <div className="searchBox__divider" />

        {/* Dropoff Date & Time */}
        <div className="searchField searchField--date searchField--dropdown" ref={dropoffDateRef}>
          <Image src="/images/calender.svg" alt="Calendar" width={24} height={24} className="searchField__icon" />
          <button
            type="button"
            className={`searchField__button lg lg--regular ${dropoffDate ? "is-filled" : ""}`}
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowPickupDropdown(false);
              setShowDropoffDropdown(false);
            }}
          >
            {dropoffDate ? formatDate(dropoffDate) : "Drop-off Date & Time"}
          </button>
        </div>

        <button type="button" className="searchBox__cta bs bs--bold" onClick={handleSearch}>
          Search Car
        </button>
      </div>
    </div>
  );
}