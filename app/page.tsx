"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import InfoBanner from "@/components/InfoBanner";
import PlanTrip from "@/components/PlanTrip";
import type { HeroVariant } from "@/components/Tabs";
import TrendingCities from "@/components/TrendingCities";
import AirlinePartners from "@/components/AirlinePartners";
import CarHire from "@/components/PopularCar";
import TransferDestinations from "@/components/TransferDestinations";
import FeaturedHotels from "@/components/FeaturedHotels";
import InspirationTrip from "@/components/InspirationTrip";
import Footer from "@/components/layout/Footer";

export default function Page() {
  const [activeTab, setActiveTab] = useState<HeroVariant>("hotel");

  return (
    <main>
      <Navbar />
      <Hero variant={activeTab} onTabChange={setActiveTab} />

      <section className="homeContent">
        {(activeTab === "hotel" || activeTab === "transfer") && (
          <section className={`homeInfo homeInfo--${activeTab}`}>
            {activeTab === "transfer" && (
              <div className="driverCheckWrap">
                <label className="driverCheck">
                  <input type="checkbox" className="driverCheck__input" />
                  <span className="driverCheck__box" />
                  <span className="driverCheck__text">Driver aged between 30 - 65</span>
                  <Image 
                src="/images/warning.svg" 
                alt="Warning" 
                width={20} 
                height={20} 
              />
                </label>
              </div>
            )}

            <InfoBanner variant={activeTab} />
          </section>
        )}

        {activeTab === "hotel" && (
          <>
            <PlanTrip />
            <FeaturedHotels />
            <InspirationTrip />
          </>
        )}

        {activeTab === "flight" && (
          <>
            <TrendingCities />
            <AirlinePartners />
            <FeaturedHotels />
            <InspirationTrip />
          </>
        )}

        {activeTab === "transfer" && (
          <>
            <CarHire />
            <TransferDestinations />
            <InspirationTrip />
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
