import Image from "next/image";

const cities = [
  {
    name: "Madinah",
    subtitle: "Flights from Jakarta",
    image: "/images/trending-1.png",
  },
  {
    name: "Madinah",
    subtitle: "Flights from Jakarta",
    image: "/images/trending-2.png",
  },
  {
    name: "Jeddah",
    subtitle: "Flights from Jakarta",
    image: "/images/trending-3.png",
  },
];

export default function TrendingCities() {
  return (
    <section className="trendingCities">
      <div className="trendingCities__header">
        <h3 className="trendingCities__title heading-3">Trending cities</h3>
        <p className="trendingCities__subtitle lg lg--regular">
          Book flights to a destination popular with travelers from Indonesia
        </p>
      </div>

      <div className="trendingCities__list">
        {cities.map((city, index) => (
          <div key={index} className="trendingCities__card">
            <Image
              src={city.image}
              alt={city.name}
              fill
              className="trendingCities__image"
            />
            <div className="trendingCities__overlay">
              <h5 className="trendingCities__city heading-5">{city.name}</h5>
              <div className="trendingCities__from">
                <Image 
                  src="/images/flight-icon.svg"
                  alt="Plane takeoff"
                  width={24}
                  height={24}
                  className="trendingCities__icon"
                />
                <p className="lg lg--regular">{city.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
