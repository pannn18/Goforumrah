// src/components/sections/InspirationTrip.tsx
"use client";

import Image from "next/image";

type Article = {
  id: number;
  title: string;
  desc: string;
  image: string;
  href?: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "7 unique stays for your next Arabican holiday",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    image: "/images/trip-1.png",
    href: "#",
  },
  {
    id: 2,
    title: "The 9 most beautiful cities for autumn travel",
    desc: "",
    image: "/images/trip-2.png",
    href: "#",
  },
  {
    id: 3,
    title: "The top 10 places to celebrate Islamic New year",
    desc: "",
    image: "/images/trip-3.png",
    href: "#",
  },
];

export default function InspirationTrip() {
  return (
    <section className="inspTrip padding-container section-padding">
      <div className="inspTrip__head">
        <h3 className="inspTrip__title heading-3">Get inspiration for your next trip</h3>
        <p className="inspTrip__sub lg lg--regular">Know your destination like your own city.</p>
      </div>

      <div className="inspTrip__grid">
        {articles.map((a, idx) => (
          <article
            key={a.id}
            className={`inspTrip__card ${idx === 0 ? "is-wide" : ""}`}
          >
            <div className="inspTrip__imgWrap">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes={
                  idx === 0
                    ? "(max-width: 1200px) 248px, 593px"
                    : "(max-width: 1200px) 248px, 285px"
                }
                className="inspTrip__img"
              />
            </div>

            <div className="inspTrip__body">
              <h5 className="inspTrip__cardTitle heading-5">{a.title}</h5>

              {a.desc ? <p className="inspTrip__desc lg lg--regular">{a.desc}</p> : null}

              <a
                className="inspTrip__link bs bs--bold"
                href={a.href || "#"}
                aria-label={`Read more: ${a.title}`}
              >
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="inspTrip__footer">
        <a className="inspTrip__all lg lg--bold" href="#" aria-label="Read all blogs">
          Read all blogs
          <Image
            src="/images/arrowcircleright.svg"
            alt="Arrow right"
            width={24}
            height={24}
            className="inspTrip__allIcon"
          />
        </a>
      </div>
    </section>
  );
}
