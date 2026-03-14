import SectionTitle from "@/components/ui/SectionTitle";
import { officeInfo } from "@/data/offices";

export default function ContactMap() {
  const mainOffice = officeInfo[0];

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Contact & Location"
          title="Keep one side for details and one side for the map"
          description="This follows your sketch and keeps the section easy to understand."
        />

        <div className="grid grid-2 contact-box">
          <div className="contact-info">
            <div className="contact-list">
              <div className="contact-item">
                <strong>Corporate Office</strong>
                <span>{mainOffice.address}</span>
              </div>
              <div className="contact-item">
                <strong>Phone</strong>
                <a href={`tel:${mainOffice.phone}`}>{mainOffice.phone}</a>
              </div>
              <div className="contact-item">
                <strong>Email</strong>
                <a href={`mailto:${mainOffice.email}`}>{mainOffice.email}</a>
              </div>
              <div className="contact-item">
                <strong>Office Hours</strong>
                <span>Saturday to Thursday, 10:00 AM to 6:00 PM</span>
              </div>
            </div>
          </div>

          <iframe
            className="map-frame"
            title="Map location"
            src="https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&z=13&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
