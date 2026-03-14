import EnterpriseGrid from "@/sections/home/EnterpriseGrid";

export default function EnterprisePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Enterprise</h1>
          <p className="page-description">
            This page can show all sister concerns or business units in a clean grid layout.
          </p>
        </div>
      </section>
      <EnterpriseGrid showIntro={false} />
    </>
  );
}
