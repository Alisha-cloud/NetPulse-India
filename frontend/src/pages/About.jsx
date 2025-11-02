import React from "react";
import {
  Globe,
  Bell,
  BarChart3,
  Users,
  MessageSquare,
  Activity,
  Wifi,
  UserCheck,
  Clock,
  MapPin,
} from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Real-Time Heatmap",
      desc: "Visualizes internet shutdowns across India using live geo-coordinates and intensity-based mapping.",
      icon: <Globe size={26} color="#1486c9" />,
    },
    {
      title: "Smart Alert System",
      desc: "Instant alerts to notify citizens and officials whenever new disruptions are reported.",
      icon: <Bell size={26} color="#ff9800" />,
    },
    {
      title: "Impact Analytics",
      desc: "Interactive insights into economic loss, users affected, and disruption duration.",
      icon: <BarChart3 size={26} color="#4caf50" />,
    },
    {
      title: "Crowd Verification",
      desc: "Citizens verify or flag shutdowns in real-time to improve authenticity and trust.",
      icon: <Users size={26} color="#673ab7" />,
    },
    {
      title: "Public Voices Wall",
      desc: "A space for citizens to share their experiences, stories, and opinions.",
      icon: <MessageSquare size={26} color="#e91e63" />,
    },
    {
      title: "Timeline Trends",
      desc: "Month-wise visualization of internet disruptions showing emerging digital patterns.",
      icon: <Activity size={26} color="#2196f3" />,
    },
  ];

  const impactStats = [
    {
      title: "Internet Shutdowns",
      value: "673",
      sub: "Since 2012",
      icon: <Wifi size={28} color="#1486c9" />,
    },
    {
      title: "People Affected",
      value: "1.4B+",
      sub: "Annually",
      icon: <UserCheck size={28} color="#f57c00" />,
    },
    {
      title: "Hours Offline",
      value: "15,000+",
      sub: "In 2023 alone",
      icon: <Clock size={28} color="#43a047" />,
    },
    {
      title: "States Impacted",
      value: "23",
      sub: "Across India",
      icon: <MapPin size={28} color="#9c27b0" />,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f9fafc",
        paddingBottom: "60px",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 10%",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Text */}
        <div style={{ flex: "1 1 450px", paddingRight: "30px" }}>
          <h1
            style={{
              color: "#0f4c81",
              fontWeight: "700",
              fontSize: "2.3rem",
              marginBottom: "15px",
            }}
          >
            When the Internet Goes Silent, NetPulse India Listens.
          </h1>
          <p style={{ color: "#444", fontSize: "1.05rem", lineHeight: "1.7" }}>
            Every shutdown tells a story. NetPulse India tracks, visualizes, and
            amplifies those voices to make sure every citizen stays digitally
            connected and informed.
          </p>
        </div>

        {/* Right Image */}
        <div
          style={{
            flex: "1 1 450px",
            textAlign: "center",
          }}
        >
          <img
            src="about-hero.jpg"
            alt="Digital India Connectivity"
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 8%", backgroundColor: "#f9fafc" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#1486c9",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        >
          Innovations Driving NetPulse India
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px 25px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ marginBottom: "12px" }}>{f.icon}</div>
              <h5 style={{ fontWeight: "600", color: "#0f4c81" }}>{f.title}</h5>
              <p style={{ color: "#555", fontSize: "0.95rem", marginTop: "8px" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section
        style={{
          padding: "70px 8%",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            color: "#0f4c81",
            fontWeight: "700",
            marginBottom: "15px",
          }}
        >
          The Impact on India
        </h2>
        <p
          style={{
            color: "#555",
            fontSize: "1rem",
            marginBottom: "40px",
          }}
        >
          Real-time tracking of internet restrictions and their consequences across India.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "25px",
            justifyContent: "center",
          }}
        >
          {impactStats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "#f9fafc",
                borderRadius: "12px",
                padding: "25px 15px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>{s.icon}</div>
              <h3 style={{ color: "#1486c9", fontWeight: "700" }}>{s.value}</h3>
              <h6 style={{ fontWeight: "600", color: "#333" }}>{s.title}</h6>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section
        style={{
          padding: "70px 10%",
          textAlign: "center",
          backgroundColor: "#f9fafc",
          borderTop: "1px solid #e6e6e6",
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            color: "#0f4c81",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Our Mission
        </h2>
        <p
          style={{
            color: "#444",
            fontSize: "1.05rem",
            lineHeight: "1.8",
            maxWidth: "850px",
            margin: "auto",
          }}
        >
          At NetPulse India, our mission is to build a transparent, accountable,
          and data-driven ecosystem that protects digital rights. We aim to
          empower every citizen with awareness, amplify collective voices, and
          ensure that the pulse of India's internet never goes silent.
        </p>
      </section>
    </div>
  );
};

export default About;