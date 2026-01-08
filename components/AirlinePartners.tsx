import Image from "next/image";

const partners = [
  { name: "Emirates", logo: "/images/Emirates.png" },
  { name: "Island Airlines", logo: "/images/Island.png" },
  { name: "Etihad", logo: "/images/Etihad.png" },
  { name: "Qatar Airways", logo: "/images/Qatar.png" },
  { name: "FlyDubai", logo: "/images/Dubai.png" },
  { name: "Garuda Indonesia", logo: "/images/Garuda.png" },
  { name: "Malaysia Airlines", logo: "/images/Malaysia.png" },
  { name: "Singapore Airlines", logo: "/images/Singapore.png" },
];

export default function AirlinePartners() {
  return (
    <section className="airlinePartners section-padding">
      <div className="airlinePartners__header">
        <h3 className="airlinePartners__title heading-3">Our airline partners</h3>
        <p className="airlinePartners__subtitle lg lg--regular">
          With various partner airlines, we are ready to fly you anywhere.
        </p>
      </div>

      <div className="airlinePartners__grid">
        {partners.map((p) => (
          <div key={p.name} className="airlinePartners__card">
            <Image
              src={p.logo}
              alt={p.name}
              width={130}
              height={60}
              className="airlinePartners__logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
