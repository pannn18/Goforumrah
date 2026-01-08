import Image from "next/image";

const cities = [
  { name: "Al-Ḥawiyah", accommodations: 120, image: "/images/al-hawiyah.png" },
  { name: "Al-Hudā", accommodations: 132, image: "/images/al-huda.png" },
  { name: "Ju'rānah", accommodations: 145, image: "/images/juranah.png" },
  { name: "Makkah", accommodations: 40, image: "/images/makkah.png" },
  { name: "Mastūrah", accommodations: 26, image: "/images/masturah.png" },
  { name: "Rābigh", accommodations: 73, image: "/images/rabigh.png" },
];

export default function PlanTrip() {
  return (
    <section className="planTrip section-padding">
      <div className="planTrip__header">
        <h3 className="planTrip__title heading-3">Plan your perfect trip</h3>
        <p className="planTrip__subtitle lg lg--regular">
          Search Flights, Hotels & Car Hire to our most popular destinations.
        </p>
      </div>

      <div className="planTrip__grid">
        {cities.map((city) => (
          <div key={city.name} className="planTrip__item">
            <Image
              src={city.image}
              alt={city.name}
              width={140}
              height={140}
              className="planTrip__img"
            />
            <div className="planTrip__content">
              <p className="planTrip__city xl xl--bold">{city.name}</p>
              <p className="planTrip__count lg lg--regular">
                {city.accommodations} accommodations
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
