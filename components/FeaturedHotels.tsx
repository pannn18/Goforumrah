"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CityTab = "al-hawiyah" | "al-huda" | "juranah" | "makkah" | "masturah";

type HotelItem = {
  name: string;
  location: string;
  priceFrom: string;
  period: "night";
  image: string;
};

const tabs: { key: CityTab; label: string }[] = [
  { key: "al-hawiyah", label: "Al-Hawiyah" },
  { key: "al-huda", label: "Al-Hudā" },
  { key: "juranah", label: "Ju’rānah" },
  { key: "makkah", label: "Makkah" },
  { key: "masturah", label: "Mastūrah" },
];

export default function FeaturedHotels() {
  const [active, setActive] = useState<CityTab>("al-hawiyah");

  const data = useMemo<Record<CityTab, HotelItem[]>>(
    () => ({
      "al-hawiyah": [
        {
          name: "Velar Inn Hotel",
          location: "Airport Road, Al Hawiyah, 21944 Taif, Saudi Arabia",
          priceFrom: "$ 95.00",
          period: "night",
          image: "/images/Velar.jpg",
        },
        {
          name: "Almassa Grand Hotel",
          location: "4404 Ajyad St, Al Hajlah, 6354, Makkah 24231, Saudi Arabia",
          priceFrom: "$ 120.00",
          period: "night",
          image: "/images/almassagrand.jpg",
        },
        {
          name: "Remaj Hotel Taif",
          location: "Wadi Waj Road, 21944 Taif, Saudi Arabia",
          priceFrom: "$ 75.00",
          period: "night",
          image: "/images/Remaj.jpg",
        },
        {
          name: "Sheraton Makkah Jabal Al Kaaba Hotel",
          location: "Jabal Al Kaaba, 24231 Makkah, Saudi Arabia",
          priceFrom: "$ 160.00",
          period: "night",
          image: "/images/sheraton.jpg",
        },
      ],
      "al-huda": [
        {
          name: "Le Méridien Al Hada",
          location: "Alhada Ring Rd, Taif 26794, Saudi Arabia",
          priceFrom: "$ 135.00",
          period: "night",
          image: "/images/Méridien.jpg",
        },
        {
          name: "Ramada by Wyndham Al Hada",
          location: "Al Hada Center, Taif , Saudi Arabia",
          priceFrom: "$ 110.00",
          period: "night",
          image: "/images/ramada.jpg",
        },
        {
          name: "Abraj Al Tayseer Tuwa Hotel",
          location: "Bir Tuwa Street Al Tayseer, 24231 Makkah, Saudi Arabia",
          priceFrom: "$ 50.00",
          period: "night",
          image: "/images/abraj.jpg",
        },
        {
          name: "Hilton Hotel & Convention Jabal Omar Makkah",
          location: "Jabal Omar, 21955 Makkah, Saudi Arabia",
          priceFrom: "$ 184.00",
          period: "night",
          image: "/images/hilton.jpg",
        },
      ],
      juranah: [
        {
          name: "Retaj Al Rayyan Makkah",
          location: "Al Rawdah District (Near Juranah Access), Makkah",
          priceFrom: "$ 65.00",
          period: "night",
          image: "/images/retaj.jpg",
        },
        {
          name: "Jabal Omar Marriott Hotel Makkah",
          location: "Umm Al Qura Road, 21955 Makkah, Saudi Arabia",
          priceFrom: "$ 146.00",
          period: "night",
          image: "/images/jabalomarmarriott.jpg",
        },
        {
          name: "Millennium Makkah Al Naseem",
          location: "Al Naseem, Makkah, Saudi Arabia",
          priceFrom: "$ 70.00",
          period: "night",
          image: "/images/Millennium.jpg",
        },
        {
          name: "Al Kiswah Towers Hotel",
          location: "At Tayseer District, 24231 Makkah, Saudi Arabia",
          priceFrom: "$ 45.00",
          period: "night",
          image: "/images/Kiswah.jpg",
        },
      ],
      makkah: [
        {
          name: "Makkah Clock Royal Tower (Fairmont)",
          location: "King Abdul Aziz Endowment, Abraj Al Bait, Makkah",
          priceFrom: "$ 280.00",
          period: "night",
          image: "/images/Fairmont.jpg",
        },
        {
          name: "Pullman Zamzam Makkah",
          location: "Abraj Al Bait Complex, Makkah",
          priceFrom: "$ 190.00",
          period: "night",
          image: "/images/pullman.jpg",
        },
        {
          name: "Conrad Makkah Jabal Omar",
          location: "Ibrahim Al Khalil St, Jabal Omar, Makkah",
          priceFrom: "$ 210.00",
          period: "night",
          image: "/images/Conrad.jpg",
        },
        {
          name: "Swissôtel Makkah",
          location: "King Abdul Aziz Endowment, Makkah",
          priceFrom: "$ 175.00",
          period: "night",
          image: "/images/Swissôtel.jpg",
        },
      ],
      masturah: [
        {
          name: "Emaar Grand Hotel",
          location: "Ibrahim Al Khalil Street, Masfelah District, Makkah",
          priceFrom: "$ 80.00",
          period: "night",
          image: "/images/emaar.jpg",
        },
        {
          name: "Rabigh Park Hotel",
          location: "Corniche Road, Rabigh Area",
          priceFrom: "$ 75.00",
          period: "night",
          image: "/images/rabigh.jpg",
        },
        {
          name: "Holiday Suites Al Azizia",
          location: "Al Aziziyah, 24243 Makkah, Saudi Arabia",
          priceFrom: "$ 60.00",
          period: "night",
          image: "/images/holidaysuites.jpg",
        },
        {
          name: "Tower Hotel Rabigh",
          location: "Rabigh Main Road, Saudi Arabia",
          priceFrom: "$ 85.00",
          period: "night",
          image: "/images/tower.jpg",
        },
      ],
    }),
    []
  );

  const hotels = data[active];

  return (
    <section className="featHotels section-padding">
      <div className="featHotels__head">
        <h2 className="featHotels__title heading-3">
          Featured hotels recommended for you
        </h2>

        <div className="featHotels__tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`featHotels__tab bs bs--medium ${
                active === t.key ? "is-active" : ""
              }`}
              onClick={() => setActive(t.key)}
              role="tab"
              aria-selected={active === t.key}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="featHotels__grid">
        {hotels.map((h) => (
          <article key={`${active}-${h.name}`} className="featHotels__card">
            <div className="featHotels__imgWrap">
              <Image
                src={h.image}
                alt={h.name}
                width={285}
                height={285}
                className="featHotels__img"
              />
            </div>

            <div className="featHotels__body">
              <p className="featHotels__name heading-5" title={h.name}>
                {h.name}
              </p>

              <div className="featHotels__meta">
                <span className="featHotels__pin">
                  <Image
                    src="/images/map-pin.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
                <span className="featHotels__loc lg lg--regular" title={h.location}>
                  {h.location}
                </span>
              </div>

              <div className="featHotels__price">
                <span className="featHotels__priceVal xl xl--bold">
                  {(h.priceFrom).toLocaleString()}
                </span>
                <span className="featHotels__priceUnit bs bs--regular">
                  / {h.period}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
