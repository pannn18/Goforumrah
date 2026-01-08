"use client";

import Image from "next/image";

type Props = {
  query: string;
  onPick: (value: string) => void;
};

const data = [
  { name: "Makkah", area: "Makkah, Al Mukarramah Province, Saudi Arabia" },
  { name: "Makkah Clock Royal Tower", area: "Makkah, Al Mukarramah Province, Saudi Arabia" },
  { name: "Pullman ZamZam Makkah", area: "Makkah, Al Mukarramah Province, Saudi Arabia" },
  { name: "Swissôtel Al Maqam Makkah", area: "Makkah, Al Mukarramah Province, Saudi Arabia" },
  { name: "Conrad Makkah Jabal Omar", area: "Makkah, Al Mukarramah Province, Saudi Arabia" },
];

export default function DestinationPanel({ query, onPick }: Props) {
  const q = query.trim().toLowerCase();

  const list = data.filter((d) => {
    if (!q) return true;
    return d.name.toLowerCase().includes(q) || d.area.toLowerCase().includes(q);
  });

  return (
    <div className="dropdown">
      {!q && (
        <div className="dropdown__head">
          <p className="dropdown__title xl xl--bold">Popular Destination</p>
        </div>
      )}

      <div className={`dropdown__list ${q ? "no-head" : ""}`}>
        {list.length ? (
          list.map((d, idx) => (
            <button key={idx} type="button" className="dropdownItem" onClick={() => onPick(d.name)}>
              <Image src="/images/Building.svg" alt="" width={20} height={20} />
              <span className="dropdownItem__text">
                <span className="dropdownItem__name bs bs--medium">{d.name}</span>
                <span className="dropdownItem__area sm sm--regular">{d.area}</span>
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
