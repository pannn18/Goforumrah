import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Image
        src="/images/logo.svg"
        alt="GoForUmrah Logo"
        width={145}
        height={26}
        className="navbar-logo"
        priority
      />

      <div className="navbar__actions">
        <div className="navbar__item">
          <p className="lg bs--medium">IDR</p>
        </div>

        <span className="navbar__divider"></span>

        <div className="navbar__item navbar__language">
          <Image
            src="/images/Globe.svg"
            alt="Language"
            width={24}
            height={24}
          />
          <p className="lg bs--medium">En</p>
        </div>

        <span className="navbar__divider"></span>

        <div className="navbar__item navbar__icons">
          <Image src="/images/Heart.svg" alt="Favorite" width={24} height={24} />
          <Image src="/images/Notification.svg" alt="Notification" width={24} height={24} />
          <Image
            src="/images/User.svg"
            alt="User"
            width={32}
            height={32}
            className="navbar__user"
          />
        </div>
      </div>
    </nav>
  );
}
