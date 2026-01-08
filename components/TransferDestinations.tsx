import Image from "next/image";

const destinations = [
  { name: "Makkah", price: "$ 50.00", image: "/images/popular-makkah.png" },
  { name: "Madinah", price: "$ 56.00", image: "/images/popular-madinah.png" },
  { name: "Jeddah", price: "$ 72.00", image: "/images/popular-jeddah.png" },
  { name: "Riyadh", price: "$ 72.00", image: "/images/popular-riyadh.png" },
];

export default function PopularDestination() {
  return (
    <section className="destination section-padding">
      <div className="destination__header">
        <h3 className="destination__title heading-3">Popular destinations for book transfers</h3>
        <p className="destination__subtitle lg lg--regular">Know your destination like your own city.</p>
      </div>

      <div className="destination__list">
        {destinations.map((item) => (
          <div key={item.name} className="destinationCard">
            <Image
              src={item.image}
              alt={item.name}
              width={285}
              height={285}
              className="destinationCard__image"
            />

            <div className="destinationCard__content">
              <h5 className="heading-5">{item.name}</h5>

              <div className="destinationCard__price">
                <p className="bs bs--regular">Start from</p>
                <p className="xl xl--bold">{item.price}</p>
                <p className="bs bs--regular">/ day</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}