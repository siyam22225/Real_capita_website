import EnterpriseCard from "@/components/ui/EnterpriseCard";
import { enterpriseItems } from "@/data/enterprises";

export default function EnterpriseGrid() {
  return (
    <section
      style={{
     background: "transparent",
    padding: "70px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
       <div className="responsive-grid-3">
          {enterpriseItems.slice(0, 6).map((item) => (
            <EnterpriseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}