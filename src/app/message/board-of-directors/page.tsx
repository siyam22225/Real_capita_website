"use client";

const directors = [
  {
    name: "Mohammad Arifuzzaman",
    role: "Managing Director & CEO",
    education: "PhD, Research Fellow; M.S.S (Sociology), MBA (Marketing)",
    message:
      "We are committed to responsible growth, stronger planning, and better customer service across every initiative.",
    image: "/images/message/director-1.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Manzur Ahammad Sohan",
    role: "Chairman",
    education: "Hafez",
    message:
      "Our goal is to strengthen trust, professionalism, and long-term corporate excellence in every business decision.",
    image: "/images/message/director-2.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Ishtiak Al Mamoon",
    role: "Director (Business Development)",
    education: "Ph.D., SMIEEE, FIEB",
    message:
      "We focus on innovation, structured expansion, and value-driven opportunities for sustainable progress.",
    image: "/images/message/director-3.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Palash Hendry Sen",
    role: "Director (Administration)",
    education: "Administration and operational coordination",
    message:
      "Strong administration, discipline, and service standards are essential for maintaining corporate quality.",
    image: "/images/message/director-4.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Md Ali Haider",
    role: "Executive Director",
    education: "Executive leadership and field operations",
    message:
      "Execution quality and practical decision-making help us deliver projects with reliability and consistency.",
    image: "/images/message/director-5.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Rabaya Akhter",
    role: "Director",
    education: "Corporate leadership and strategic support",
    message:
      "We believe modern organizations grow best when vision, commitment, and accountability work together.",
    image: "/images/message/director-6.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Tania Tanjia",
    role: "Director",
    education: "Business and organizational support",
    message:
      "Customer confidence, timely service, and long-term care remain central to our values.",
    image: "/images/message/director-7.jpg",
    facebook: "#",
    whatsapp: "#",
  },
  {
    name: "Sushmita Islam",
    role: "Director",
    education: "Corporate management and communications",
    message:
      "Our commitment is to maintain a dependable, people-focused, and future-oriented business culture.",
    image: "/images/message/director-8.jpg",
    facebook: "#",
    whatsapp: "#",
  },
];

const featuredDirectors = directors.slice(0, 2);
const otherDirectors = directors.slice(2);
function SocialLinks({
  facebook,
  whatsapp,
}: {
  facebook: string;
  whatsapp: string;
}) {
  return (
    <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1877f2", lineHeight: 0 }}
      >
        <svg viewBox="0 0 24 24" width="40" height="40">
          <path
            fill="currentColor"
            d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6H16.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V11H7.3v3H10V22h3.5z"
          />
        </svg>
      </a>

      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#16a34a", lineHeight: 0 }}
      >
        <svg viewBox="0 0 24 24" width="40" height="40">
          <path
            fill="currentColor"
            d="M20.5 11.8c0 4.8-3.9 8.7-8.8 8.7-1.5 0-2.9-.4-4.2-1.1L3 20.7l1.4-4.1c-.8-1.4-1.2-3-1.2-4.7C3.2 7.1 7.1 3.2 12 3.2s8.5 3.8 8.5 8.6z"
          />
        </svg>
      </a>
    </div>
  );
}

function DirectorCard({
  director,
  featured = false,
}: {
  director: (typeof directors)[number];
  featured?: boolean;
}) {
  return (
    <div className={`board-card ${featured ? "board-card-featured" : ""}`}>
      <div className={`board-image-wrap ${featured ? "board-image-wrap-featured" : ""}`}>
        <img src={director.image} alt={director.name} className="board-image" />
      </div>

      <div className={`board-content ${featured ? "board-content-featured" : ""}`}>
        <p className="board-role">{director.role}</p>
        <h3 className="board-name">{director.name}</h3>

        <p className="board-text">
          <strong>Education:</strong> {director.education}
        </p>

        <p className="board-text">
          <strong>Message:</strong> {director.message}
        </p>

        <SocialLinks facebook={director.facebook} whatsapp={director.whatsapp} />
      </div>
    </div>
  );
}
export default function BoardOfDirectorsPage() {
  return (
    <>
      <section className="board-page">
        <div className="board-container">
          <div className="board-heading">
            <p className="board-badge">Leadership Team</p>
            <h1 className="board-title">Board of Directors</h1>
          </div>

          <div className="board-featured-grid">
            {featuredDirectors.map((director, index) => (
              <DirectorCard key={index} director={director} featured />
            ))}
          </div>

          <div className="board-others-grid">
            {otherDirectors.map((director, index) => (
              <DirectorCard key={index} director={director} />
            ))}
          </div>
        </div>
      </section>

<style jsx global>{`
        .board-page {
          background: linear-gradient(180deg, #f8fbfd 0%, #edf6fb 100%);
          padding: 48px 0 72px;
        }

        .board-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .board-heading {
          text-align: center;
          margin-bottom: 34px;
        }

        .board-badge {
          margin: 0 0 10px 0;
          color: #16a34a;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .board-title {
          margin: 0;
          color: #145fb3;
          font-size: clamp(42px, 6vw, 66px);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.04em;
        }

        .board-featured-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .board-others-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .board-card {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .board-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.12);
        }

        .board-card-featured {
          border-radius: 26px;
        }

      .board-image-wrap {
  height: 230px;
          background: #e8eef5;
          overflow: hidden;
        }

        .board-image-wrap-featured {
          height: 260px;
        }

     .board-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  background: #eef2f7;
}

        .board-content {
          padding: 20px 22px 22px;
        }

        .board-content-featured {
          padding: 22px 24px 24px;
        }

        .board-role {
          margin: 0 0 10px 0;
          color: #16a34a;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.5;
        }

        .board-name {
          margin: 0 0 12px 0;
          color: #1d63bd;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.2;
        }

        .board-text {
          margin: 0 0 10px 0;
          color: #475569;
          font-size: 15px;
          line-height: 1.75;
        }

        .board-socials {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          line-height: 0;
        }

        .board-social-link {
          width: 14px !important;
          height: 14px !important;
          min-width: 14px !important;
          min-height: 14px !important;
          max-width: 14px !important;
          max-height: 14px !important;
          border-radius: 999px;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none;
          background: transparent;
          border: none;
          padding: 0 !important;
          margin: 0 !important;
          flex-shrink: 0;
          overflow: hidden;
          transition: transform 0.18s ease;
        }

        .board-social-link.facebook {
          color: #1877f2;
        }

        .board-social-link.whatsapp {
          color: #16a34a;
        }

        .board-social-link:hover {
          transform: translateY(-1px);
        }

        .board-social-icon {
          width: 10px !important;
          height: 10px !important;
          min-width: 10px !important;
          min-height: 10px !important;
          max-width: 10px !important;
          max-height: 10px !important;
          display: block !important;
          flex-shrink: 0;
        }

        @media (max-width: 1100px) {
          .board-others-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .board-page {
            padding: 36px 0 56px;
          }

          .board-container {
            padding: 0 16px;
          }

          .board-featured-grid,
          .board-others-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .board-image-wrap-featured,
          .board-image-wrap {
            height: 220px;
          }

          .board-name {
            font-size: 20px;
          }

          .board-content,
          .board-content-featured {
            padding: 18px;
          }
        }
      `}</style>
    </>
  );
}