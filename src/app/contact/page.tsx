import ContactMap from "@/sections/home/ContactMap";

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact</h1>
          <p className="page-description">
            Keep contact details clear. Add office addresses, phone numbers, email, and map here.
          </p>
        </div>
      </section>
      <ContactMap />
    </>
  );
}
