"use client";
import { FiCheck } from "react-icons/fi";
import Image from "next/image";

type CabinClass = "economy" | "premium-economy" | "business" | "first";

type Props = {
  adults: number;
  childrenCount: number;
  babies: number;
  cabin: CabinClass;

  onAdults: (v: number) => void;
  onChildrenCount: (v: number) => void;
  onBabies: (v: number) => void;
  onCabin: (v: CabinClass) => void;
};

export default function PassengerModal({
  adults,
  childrenCount,
  babies,
  cabin,
  onAdults,
  onChildrenCount,
  onBabies,
  onCabin,
}: Props) {
  const inc = (set: (n: number) => void, v: number) => set(v + 1);
  const dec = (set: (n: number) => void, v: number, min = 0) => v > min && set(v - 1);

  const cabinList: { value: CabinClass; label: string }[] = [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First" },
  ];

  return (
    <div className="dropdown dropdown--passenger">
      <div className="passengerGrid">
        {/* Left - Passenger Counter */}
        <div className="passengerCol">
          <div className="dropdown__head">
            <p className="dropdown__title xl xl--bold">Passenger</p>
          </div>

          <div className="counterList">
            {/* Adults */}
            <div className="counterRow">
              <div className="counterRow__info">
                <p className="counterRow__label lg lg--medium">Adult</p>
                <p className="counterRow__hint bs bs--regular">Age 12+</p>
              </div>

              <div className="counterRow__ctrl">
                <button
                  type="button"
                  className={`counterBtn ${adults <= 0 ? "is-disabled" : ""}`}
                  onClick={() => dec(onAdults, adults, 0)}
                  disabled={adults <= 0}
                >
                  <Image src="/images/minus-icon.svg" alt="Minus" width={20} height={20} />
                </button>

                <span className="counterRow__value lg lg--medium">{adults}</span>

                <button type="button" className="counterBtn" onClick={() => inc(onAdults, adults)}>
                  <Image src="/images/plus-icon.svg" alt="Plus" width={20} height={20} />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="counterRow">
              <div className="counterRow__info">
                <p className="counterRow__label lg lg--medium">Children</p>
                <p className="counterRow__hint bs bs--regular">Age 2 - 17</p>
              </div>

              <div className="counterRow__ctrl">
                <button
                  type="button"
                  className={`counterBtn ${childrenCount <= 0 ? "is-disabled" : ""}`}
                  onClick={() => dec(onChildrenCount, childrenCount, 0)}
                  disabled={childrenCount <= 0}
                >
                  <Image src="/images/minus-icon.svg" alt="Minus" width={20} height={20} />
                </button>

                <span className="counterRow__value lg lg--medium">{childrenCount}</span>

                <button
                  type="button"
                  className="counterBtn"
                  onClick={() => inc(onChildrenCount, childrenCount)}
                >
                  <Image src="/images/plus-icon.svg" alt="Plus" width={20} height={20} />
                </button>
              </div>
            </div>

            {/* Babies */}
            <div className="counterRow">
              <div className="counterRow__info">
                <p className="counterRow__label lg lg--medium">Baby</p>
                <p className="counterRow__hint bs bs--regular">Under 2 y.o</p>
              </div>

              <div className="counterRow__ctrl">
                <button
                  type="button"
                  className={`counterBtn ${babies <= 0 ? "is-disabled" : ""}`}
                  onClick={() => dec(onBabies, babies, 0)}
                  disabled={babies <= 0}
                >
                  <Image src="/images/minus-icon.svg" alt="Minus" width={20} height={20} />
                </button>

                <span className="counterRow__value lg lg--medium">{babies}</span>

                <button type="button" className="counterBtn" onClick={() => inc(onBabies, babies)}>
                  <Image src="/images/plus-icon.svg" alt="Plus" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Cabin Class */}
        <div className="passengerCol passengerCol--cabin">
          <div className="dropdown__head">
            <p className="dropdown__title xl xl--bold">Cabin Class</p>
          </div>

          <div className="cabinList">
            {cabinList.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`cabinItem ${cabin === c.value ? "is-active" : ""}`}
                onClick={() => onCabin(c.value)}
              >
                <span className="cabinItem__text lg lg--medium">{c.label}</span>
                {cabin === c.value && <FiCheck className="cabinItem__check" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}