import { officeInfo } from "@/data/offices";
import { socialLinks } from "@/data/socialLinks";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container section-sm">
        <div className="footer-grid">
          {officeInfo.map((office) => (
            <div key={office.title} className="footer-card">
              <h3>{office.title}</h3>
              <ul className="list-clean muted">
                <li>{office.address}</li>
                <li>{office.phone}</li>
                <li>{office.email}</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="muted">© 2026 Real Capita Group. All rights reserved.</p>
          <div className="footer-socials">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
