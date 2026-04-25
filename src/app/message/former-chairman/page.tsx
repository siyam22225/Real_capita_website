import Image from "next/image";

export default function FormerChairmanPage() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #123a63 0%, #0f2744 100%)",
        padding: "70px 0",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#22c55e",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Who We Are
            </p>

            <h1
            className="section-title"
              style={{
                margin: "0 0 28px 0",
               
                lineHeight: "1.1",
                fontWeight: 800,
              }}
            >
              Former Chairman Message
            </h1>

            <div style={{ fontSize: "20px", lineHeight: "1.95", color: "rgba(255,255,255,0.92)" }}>
              <p>
               Bangladesh has experienced high economic growth accompanied with rapid urbanization. We are always bettering ourselves in pursuit of long-term sustainable growth. Urban growth has resulted in a tremendous increase of energy consumption.
              </p>
              <p>
               Dhaka Metropolitan city   has now turned into a densely populated, bustling city. Millions of people reside in Dhaka city, the capital of Bangladesh for service, business & other purposes. Unfortunately, the increase in housing does not correlate to the population growth.
              </p>
              <p>
             It is possible to reduce the mounting pressure of our rapidly growing population in Dhaka city largely by developing the surrounding area of Dhaka city in a controlled, pre-planned manner & by establishing permanent residential accommodation for this vast population.
              </p>
              <p>
                Real estate developers & agents are there to make your dream come true, to take you towards your dreamland. With us, we ensure that one gets the luxury of living away from noise pollution & in close proximity of all sorts of amenities such as transportation, shopping malls, banks, gardens, meditation centers as well as educational institutions.   We have built a sustainable satellite township to give our stakeholders an eco-friendly living solution suited to your lifestyle. A part of delivering exceptional customer service is providing them with a knowledgeable, professional, qualified & experienced sales team to assist with all the aspects of the plot buying process.
              </p>
              <p>
                Our experienced consultants are specialized in marketing & managing Real Capita Group. Real Capita Group has been handpicked in order to give clients the best possible selection of property in “RC Maya Kanan” & “RC Rivery Village” to cater to all budget ranges & to ensure that we offer only the best.
</p>
<p> 
  Real Capita Group: Create your own sunshine from generation to generation.
</p>

            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "260px",
                height: "260px",
                margin: "0 auto 26px",
                borderRadius: "999px",
                overflow: "hidden",
                border: "6px solid rgba(255,255,255,0.9)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/images/message/former-chairman.jpg"
                alt="Former Chairman"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <h2 style={{ margin: "0 0 8px 0", fontSize: "36px", lineHeight: "1.2", fontWeight: 800 }}>
              Late Alhaj Md. Anower Hossain
            </h2>

            <p style={{ margin: "0 0 22px 0", fontSize: "20px", color: "#dbeafe", fontWeight: 700 }}>
              1960 – 2020
            </p>

            <div style={{ fontSize: "18px", lineHeight: "1.9", color: "rgba(255,255,255,0.92)" }}>
              <p><strong>Position:</strong> Chairman</p>
              <p><strong>Education:</strong> B.Com (Hons), Management</p>
              <p><strong>Profession:</strong> Businessman &amp; Contractor</p>
              <p><strong>Achievements:</strong> Recognized for leadership, dedication, and development vision.</p>
              <p><strong>Business Activities:</strong> First Class Contractor in LGED & Roads & Highways department all over Dhaka City Corporation. (1981- 2006)</p>
              <p><strong>Legacy:</strong> A lasting contribution to structured growth and corporate trust.</p>
              <p><strong>Personal Qualities:</strong> Known for integrity, vision, and commitment to excellence.</p>
              <p><strong>Foreign Visit:</strong>  India & KSA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}