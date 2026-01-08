"use client";

import Image from "next/image";

type Props = {
  value: string;
  onPick: (val: string) => void;
  icon?: string;
};

const popularPlaces = [
  { name: "Abha, Saudi Arabia", airport: "Abha" },
  { name: "Madinah, Saudi Arabia", airport: "Madinah" },
  { name: "Riyadh, Saudi Arabia", airport: "Riyadh" },
  { name: "Al Baha, Saudi Arabia", airport: "Al Baha" },
  { name: "Al Kharj, Saudi Arabia", airport: "Al Kharj" },
  { name: "Al Ula, Saudi Arabia", airport: "Al Ula" },
];

export default function LocationModal({ value, onPick, icon = "/img/svg/Flight.svg" }: Props) {
  const q = value.trim().toLowerCase();

  const items = popularPlaces.filter((p) => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.airport.toLowerCase().includes(q);
  });

  return (
    <div className="dropdown">
      {!q && (
        <div className="dropdown__head">
          <p className="dropdown__title xl xl--bold">Popular Destination</p>
        </div>
      )}

      <div className={`dropdown__list ${q ? "no-head" : ""}`}>
        {items.length ? (
          items.map((p, idx) => (
            <button
              key={idx}
              type="button"
              className="dropdownItem"
              onClick={() => onPick(p.name)}
            >
              <Image src={icon} alt="" width={20} height={20} />
              <span className="dropdownItem__text">
                <span className="dropdownItem__name bs bs--medium">{p.name}</span>
                <span className="dropdownItem__area sm sm--regular">{p.airport}</span>
              </span>
            </button>
          ))
        ) : (
          <div className="dropdownEmpty lg lg--regular">No destinations found</div>
        )}
      </div>
    </div>
  );
}