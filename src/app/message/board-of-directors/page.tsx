import Image from "next/image";

const directors = [
  
  {
    name: "Mohammad Arifuzzaman",
    role: "Managing Director & CEO",
    education: "PhD, Research Fellow; M.S.S (Sociology), MBA (Marketing)",
    message:
      "We are committed to responsible growth, stronger planning, and better customer service across every initiative.",
    image: "/images/message/director-1.jpg",
  },
  {
    name: "Manzur Ahammad Sohan",
    role: "Chairman",
    education: "Hafez",
    message:
      "Our goal is to strengthen trust, professionalism, and long-term corporate excellence in every business decision.",
    image: "/images/message/director-2.jpg",
  },
  {
    name: "Ishtiak Al Mamoon",
    role: "Director (Business Development)",
    education: "Ph.D., SMIEEE, FIEB",
    message:
      "We focus on innovation, structured expansion, and value-driven opportunities for sustainable progress.",
    image: "/images/message/director-3.jpg",
  },
  {
    name: "Palash Hendry Sen",
    role: "Director (Administration)",
    education: "Administration and operational coordination",
    message:
      "Strong administration, discipline, and service standards are essential for maintaining corporate quality.",
    image: "/images/message/director-4.jpg",
  },
  {
    name: "Md Ali Haider",
    role: "Executive Director",
    education: "Executive leadership and field operations",
    message:
      "Execution quality and practical decision-making help us deliver projects with reliability and consistency.",
    image: "/images/message/director-5.jpg",
  },
  {
    name: "Rabaya Akhter",
    role: "Director",
    education: "Corporate leadership and strategic support",
    message:
      "We believe modern organizations grow best when vision, commitment, and accountability work together.",
    image: "/images/message/director-6.jpg",
  },
  {
    name: "Tania Tanjia",
    role: "Director",
    education: "Business and organizational support",
    message:
      "Customer confidence, timely service, and long-term care remain central to our values.",
    image: "/images/message/director-7.jpg",
  },
  {
    name: "Sushmita Islam",
    role: "Director",
    education: "Corporate management and communications",
    message:
      "Our commitment is to maintain a dependable, people-focused, and future-oriented business culture.",
    image: "/images/message/director-8.jpg",
  },
];
const featuredDirectors = directors.slice(0, 2);
const otherDirectors = directors.slice(2);

export default function BoardOfDirectorsPage() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        padding: "60px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <p
            style={{
              margin: "0 0 10px 0",
              color: "#16a34a",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Leadership Team
          </p>

          <h1
          className="section-title"
            style={{
              
              margin: 0,
              color: "#0b69b7",
              
              fontWeight: 800,
              lineHeight: "1.1",
            }}
          >
            Board of Directors
          </h1>
        </div>

     <>
  <div className="board-featured-grid">
    {featuredDirectors.map((director, index) => (
      <div key={index} className="board-card board-card-featured">
        <div className="board-image-wrap board-image-wrap-featured">
          <img src={director.image} alt={director.name} className="board-image" />
        </div>

        <div className="board-content board-content-featured">
          <p className="board-role">{director.role}</p>
          <h3 className="board-name">{director.name}</h3>
          <p className="board-text"><strong>Education:</strong> {director.education}</p>
          <p className="board-text"><strong>Message:</strong> {director.message}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="board-others-grid">
    {otherDirectors.map((director, index) => (
      <div key={index} className="board-card">
        <div className="board-image-wrap">
          <img src={director.image} alt={director.name} className="board-image" />
        </div>

        <div className="board-content">
          <p className="board-role">{director.role}</p>
          <h3 className="board-name">{director.name}</h3>
          <p className="board-text"><strong>Education:</strong> {director.education}</p>
          <p className="board-text"><strong>Message:</strong> {director.message}</p>
        </div>
      </div>
    ))}
  </div>
</>
      </div>
    </section>
  );
}