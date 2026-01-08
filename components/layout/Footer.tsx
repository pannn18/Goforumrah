import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__col">
            <h5 className="footer__title heading-5">Explore</h5>
            <div className="footer__links">
              <Link href="/" className="footer__link bs bs--medium">Hotels</Link>
              <Link href="/" className="footer__link bs bs--medium">Flights</Link>
              <Link href="/" className="footer__link bs bs--medium">Book Transfer</Link>
              <Link href="#" className="footer__link bs bs--medium">Tour Package</Link>
            </div>
          </div>

          <div className="footer__col">
            <h5 className="footer__title heading-5">About Us</h5>
            <div className="footer__links">
              <Link href="#" className="footer__link bs bs--medium">About Us</Link>
              <Link href="#" className="footer__link bs bs--medium">Contact us</Link>
              <Link href="#" className="footer__link bs bs--medium">Partnership</Link>
              <Link href="#" className="footer__link bs bs--medium">Travel Agent</Link>
              <Link href="#" className="footer__link bs bs--medium">Blogs</Link>
            </div>
          </div>

          <div className="footer__col">
            <h5 className="footer__title heading-5">Helps</h5>
            <div className="footer__links">
              <Link href="#" className="footer__link bs bs--medium">Terms &amp; Condition</Link>
              <Link href="#" className="footer__link bs bs--medium">Privacy and Cookies</Link>
            </div>
          </div>

          <div className="footer__col footer__col--newsletter">
            <h5 className="footer__title heading-5">Join Our Newsletter</h5>
            <div className="footer__newsletter">
              <p className="footer__desc bs bs--regular">
                Sign up and we&apos;ll send the best deals to you
              </p>

              <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  className="footer__input bs bs--regular"
                  placeholder="Enter your email"
                />
                <button type="submit" className="footer__btn bs bs--bold">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__brand">
            <Image
              src="/images/Logo.svg"
              alt="Logo"
              width={224}
              height={40}
              className="footer__logo"
            />
            <p className="footer__copy bs bs--regular">
              © 2022 Goforumrah LLC All rights reserved.
            </p>
          </div>

          <div className="footer__social">
            {["instagram-outline", "facebook-outline", "twitter-outline", "youtube-outline"].map((social) => (
              <button key={social} className="footer__socialBtn" type="button" aria-label={social}>
                <Image
                  src={`/images/${social}.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
