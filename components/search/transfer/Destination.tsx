'use client';

import Image from 'next/image';

interface LocationDropdownProps {
  searchQuery: string;
  onSelect: (location: string) => void;
}

const popularDestinations = [
  { name: 'Clarion Hotel Jeddah Airport', area: 'Jeddah, Makkah, Saudi Arabia' },
  { name: 'Movenpick Hotel Jeddah', area: 'Jeddah, Makkah, Saudi Arabia' },
  { name: 'Mena Airport Hotel Jeddah', area: 'Jeddah, Makkah, Saudi Arabia' },
  { name: 'Karam Jeddah Hotel', area: 'Jeddah, Makkah, Saudi Arabia' },
];

export default function LocationDropdown({ searchQuery, onSelect }: LocationDropdownProps) {
  const filteredDestinations = popularDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dropdown">
      {!searchQuery && (
        <div className="dropdown__head">
          <p className="dropdown__title xl xl--bold">Popular Destination</p>
        </div>
      )}

      <div className={`dropdown__list ${searchQuery ? 'no-head' : ''}`}>
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <button
              key={index}
              type="button"
              className="dropdownItem"
              onClick={() => onSelect(dest.name)}
            >
              <Image src="/images/map-pin-outline.svg" alt="Location" width={20} height={20} />
              <span className="dropdownItem__text">
                <span className="dropdownItem__name bs bs--medium">{dest.name}</span>
                <span className="dropdownItem__area sm sm--regular">{dest.area}</span>
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