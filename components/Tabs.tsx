"use client";

import Image from "next/image";

export type HeroVariant = "hotel" | "flight" | "transfer";
type Props = {
  active: HeroVariant;
  onChange: (next: HeroVariant) => void;
};

export default function HeroTabs({ active, onChange }: Props) {
  const onTourClick = () => { 
  };

  return (
    <div className="heroTabs">
      <div className="heroTabs__wrap">
        <div
          className={`heroTabs__item bs bs--bold  ${active === "hotel" ? "is-active" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => onChange("hotel")}
          onKeyDown={(e) => e.key === "Enter" && onChange("hotel")}
        >
          <Image src="/images/building.svg" alt="Hotel" width={24} height={24} className="heroTabs__icon" />
          <p className="heroTabs__label">Hotel</p>
        </div>

        <div
          className={`heroTabs__item bs bs--bold  ${active === "flight" ? "is-active" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => onChange("flight")}
          onKeyDown={(e) => e.key === "Enter" && onChange("flight")}
        >
          <Image src="/images/flight.svg" alt="Flights" width={24} height={24} className="heroTabs__icon" />
          <p className="heroTabs__label">Flights</p>
        </div>

        <div
          className={`heroTabs__item bs bs--bold  ${active === "transfer" ? "is-active" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => onChange("transfer")}
          onKeyDown={(e) => e.key === "Enter" && onChange("transfer")}
        >
          <Image src="/images/car.svg" alt="Book Transfer" width={24} height={24} className="heroTabs__icon" />
          <p className="heroTabs__label">Book Transfer</p>
        </div>

        <div
          className="heroTabs__item bs bs--bold "
          role="button"
          tabIndex={0}
          onClick={onTourClick}
          onKeyDown={(e) => e.key === "Enter" && onTourClick()}
          title="Coming soon" 
          aria-label="Tour Package (Coming soon)"
        >
          <Image src="/images/sunHorizon.svg" alt="Tour Package" width={24} height={24} className="heroTabs__icon" />
          <span className="heroTabs__label bs bs--bold ">Tour Package</span>
        </div>
      </div>
    </div>
  );
}
