import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { enterprises } from "@/data/enterprises";

type EnterpriseGridProps = {
  showIntro?: boolean;
};

export default function EnterpriseGrid({ showIntro = true }: EnterpriseGridProps) {
  return (
    <section className="section">
      <div className="container">
        {showIntro ? (
          <SectionTitle
            eyebrow="Our Enterprise"
            title="A structured grid for sister concerns and business units"
            description="Each card can hold a photo, short summary, and one clean link."
          />
        ) : null}

        <div className="grid grid-3">
          {enterprises.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              description={item.description}
              imageLabel={item.label}
              link={item.link}
              linkLabel="Visit Unit"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
