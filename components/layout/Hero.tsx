"use client";


import HeroTabs, { HeroVariant } from "@/components/Tabs";
import HotelSearch from "@/components/search/hotel/HotelSearch";
import FlightSearch from "@/components/search/flight/FlightSearch";
import TransferSearch from "@/components/search/transfer/Transfer";



type Props = {
  variant: HeroVariant;
  onTabChange: (next: HeroVariant) => void;
};

export default function Hero({ variant, onTabChange }: Props) {

  const titleMap: Record<HeroVariant, string> = {
    hotel: "Find your next stay",
    flight: "Find the best flight",
    transfer: "Find your best ride",
  };

  const subtitleMap: Record<HeroVariant, string> = {
    hotel: "Search low prices on hotels, homes and much more...",
    flight: "Search low prices on hotels, homes and much more...",
    transfer: "Search low prices on hotels, homes and much more...",
  };

  return (
    <header className={`hero hero__${variant}`}>
      <div className="hero__container">
        <HeroTabs active={variant} onChange={onTabChange} />

        <h1 className="hero__title heading-1">{titleMap[variant]}</h1>
        <p className="hero__subtitle xl xl--medium">{subtitleMap[variant]}</p>

        <div className="hero__search">
        {variant === "hotel" && <HotelSearch />}
        {variant === "flight" && <FlightSearch />}
        {variant === "transfer" && <TransferSearch />}
        </div>
      </div>
    </header>
  );
}
