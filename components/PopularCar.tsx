import Image from "next/image";

const cars = [
  { name: "Toyota", logo: "/images/toyota.png" },
  { name: "Nissan", logo: "/images/nissan.png" },
  { name: "Honda", logo: "/images/honda.png" },
  { name: "BMW", logo: "/images/bmw.png" },
];

export default function CarHire() {
  return (
    <section className="popularCar section-padding">
      <div className="popularCar__header">
        <h3 className="popularCar__title heading-3">Popular car hire brands</h3>
        <p className="popularCar__subtitle lg lg--regular">
          With various partner airlines, we are ready to fly you anywhere.
        </p>
      </div>

      <div className="popularCar__grid">
        {cars.map((p) => (
          <div key={p.name} className="popularCar__card">
            <Image
              src={p.logo}
              alt={p.name}
              width={120}
              height={60}
              className="popularCar__logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}