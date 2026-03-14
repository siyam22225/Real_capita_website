import { logoItems } from "@/lib/constants";

export default function LogoSlider() {
  const repeated = [...logoItems, ...logoItems];

  return (
    <section className="section-sm logo-strip">
      <div className="container">
        <div className="logo-track">
          {repeated.map((item, index) => (
            <div key={`${item}-${index}`} className="logo-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
