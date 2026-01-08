"use client";

import Image from "next/image";

type InfoBannerVariant = "hotel" | "transfer";

type Props = {
  variant: InfoBannerVariant;
};

export default function InfoBanner({ variant }: Props) {
  const content =
    variant === "hotel"
      ? {
          title: "Keep calm with health protocol",
          desc: "Get the advice you need. Check the latest COVID-19 restrictions before you travel.",
          icon: "/images/facemask.svg",
        }
      : {
          title: "Clean cars. Flexible bookings. Socially distant rental counters.",
          desc: "We’re working with our partners to keep you safe and in the driving seat.",
          icon: "/images/car.svg",
        };

  return (
    <div className="infoBanner">
      <div className="infoBanner__iconWrap">
        <Image
          src={content.icon}
          alt=""
          width={30}
          height={30}
          className="infoBanner__icon"
        />
      </div>

      <div className="infoBanner__content">
        <p className="infoBanner__title xl xl--bold">{content.title}</p>
        <p className="infoBanner__desc lg lg--regular">{content.desc}</p>
      </div>

      <button type="button" className="infoBanner__link lg lg--bold">
        Learn more
      </button>
    </div>
  );
}
