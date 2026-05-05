import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Foundation",
    subtitle: "Days 1–10",
    color: "#FF6B35",
    accent: "#FF6B3522",
    days: [
      { day: "1–2", topic: "Project Setup & Git", skills: ["Node.js + npm basics", "Git init, commit, push", "Folder structure for MERN", "Environment variables (.env)"], deliverable: "GitHub repo live with proper folder structure" },
      { day: "3–4", topic: "Backend: Express Basics", skills: ["What is a REST API?", "Express server setup", "Routes, Controllers, Middleware", "Postman to test APIs"], deliverable: "A working Express server with 3 routes" },
      { day: "5–6", topic: "PostgreSQL + Sequelize ORM", skills: ["Relational DB concepts", "Tables, Foreign Keys, Joins", "Sequelize models & migrations", "CRUD with ORM"], deliverable: "Users & Payments tables designed and seeded" },
      { day: "7–8", topic: "Auth System", skills: ["JWT tokens explained", "bcrypt for passwords", "Register / Login / Logout APIs", "Auth middleware (protect routes)"], deliverable: "Full auth flow working in Postman" },
      { day: "9–10", topic: "React Fundamentals", skills: ["Components, Props, State", "useEffect, useState", "Axios for API calls", "React Router v6"], deliverable: "Login + Register page connected to your backend" },
    ]
  },
  {
    id: 2,
    title: "Core Features",
    subtitle: "Days 11–25",
    color: "#4ECDC4",
    accent: "#4ECDC422",
    days: [
      { day: "11–13", topic: "SMS Parsing Logic", skills: ["Regex deep dive", "UPI SMS patterns (GPay, PhonePe, Paytm)", "Parse: amount, UPI ID, date", "Node.js string manipulation"], deliverable: "Function that parses any UPI SMS into structured data" },
      { day: "14–15", topic: "Payment Logging API", skills: ["POST /payments endpoint", "Validation with Joi", "DB relationships (User → Payments)", "Error handling patterns"], deliverable: "Payments saved to DB via API" },
      { day: "16–18", topic: "Groups & Friends System", skills: ["Many-to-many relationships", "Groups, Members, Invites schema", "Group CRUD APIs", "Understanding database joins deeply"], deliverable: "Create group, add friends, list members" },
      { day: "19–21", topic: "Split & Balance Logic", skills: ["Business logic: who owes whom", "Settlement algorithm", "Transaction history", "Aggregation queries in PostgreSQL"], deliverable: "₹ balance calculated correctly for any group" },
      { day: "22–23", topic: "React Dashboard UI", skills: ["Component architecture planning", "Context API for global state", "Reusable components", "Tailwind CSS utility classes"], deliverable: "Dashboard showing payments + group balances" },
      { day: "24–25", topic: "React Native Intro", skills: ["RN vs React: what's different", "Expo setup", "Core components (View, Text, FlatList)", "Navigation with React Navigation"], deliverable: "Mobile app skeleton with 3 screens" },
    ]
  },
  {
    id: 3,
    title: "Mobile + Intelligence",
    subtitle: "Days 26–38",
    color: "#A855F7",
    accent: "#A855F722",
    days: [
      { day: "26–28", topic: "SMS Detection on Mobile", skills: ["Android SMS permissions", "React Native SMS listener lib", "Background task basics", "Sending parsed data to your API"], deliverable: "App reads SMS and shows detected payments" },
      { day: "29–30", topic: "Push Notifications", skills: ["Expo Notifications setup", "Trigger: 'New payment detected!'", "Deep linking to payment screen", "Notification permissions flow"], deliverable: "User gets notified on UPI SMS detection" },
      { day: "31–33", topic: "Full Mobile UI", skills: ["Bottom tab navigation", "FlatList with pull-to-refresh", "Modal sheets for quick logging", "React Native Animated API"], deliverable: "Complete mobile app flow end-to-end" },
      { day: "34–35", topic: "Freemium System", skills: ["Feature flags in backend", "Subscription model schema", "Razorpay integration (Indian payments!)", "Webhooks for payment confirmation"], deliverable: "Premium plan purchase flow working" },
      { day: "36–38", topic: "Testing & Debugging", skills: ["Jest unit tests for business logic", "API testing with Supertest", "React Testing Library basics", "Debugging React Native with Flipper"], deliverable: "Test suite with 80%+ coverage on core logic" },
    ]
  },
  {
    id: 4,
    title: "Ship It",
    subtitle: "Days 39–45",
    color: "#F59E0B",
    accent: "#F59E0B22",
    days: [
      { day: "39–40", topic: "Deployment", skills: ["Backend on Railway/Render", "PostgreSQL on Supabase (free)", "React on Vercel", "Environment configs for production"], deliverable: "Live URL for your web app" },
      { day: "41–42", topic: "Security Hardening", skills: ["Rate limiting (express-rate-limit)", "Helmet.js for HTTP headers", "SQL injection prevention", "CORS configuration"], deliverable: "App passes basic security checklist" },
      { day: "43–44", topic: "Analytics & Monitoring", skills: ["Sentry for error tracking", "Basic analytics events", "Server health monitoring", "Logging with Winston"], deliverable: "You know when your app breaks before users do" },
      { day: "45", topic: "Launch Prep", skills: ["App Store / Play Store basics", "Landing page with waitlist", "Beta tester onboarding", "Product Hunt strategy"], deliverable: "🚀 You're ready to show the world" },
    ]
  }
];

const rules = [
  { icon: "🧠", rule: "Understand before you copy", desc: "Every code block I give you — I'll explain line by line. You ask until it clicks." },
  { icon: "🔨", rule: "Build, break, fix", desc: "Intentionally break things. That's how you learn to debug like a pro." },
  { icon: "📝", rule: "Daily commit", desc: "Every day you code, you push to GitHub. No exceptions. It builds discipline." },
  { icon: "❓", rule: "Ask stupid questions", desc: "There are none. If you don't understand something, we don't move forward." },
  { icon: "🚫", rule: "No skipping fundamentals", desc: "Tempting to jump to mobile. Don't. The backend is where real skill lives." },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);

  const currentPhase = phases.find(p => p.id === activePhase);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#E8E8F0",
      fontFamily: "'Courier New', 'Courier', monospace",
      padding: "0",
      overflowX: "hidden"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1E1E2E",
        padding: "32px 24px 24px",
        background: "linear-gradient(180deg, #0D0D18 0%, #0A0A0F 100%)"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "#FF6B3515",
            border: "1px solid #FF6B3540",
            borderRadius: 4,
            padding: "4px 12px",
            fontSize: 11,
            color: "#FF6B35",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16
          }}>
            Mentor Mode · Active
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 900,
            margin: "0 0 8px",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.1
          }}>
            UPI Tracker
            <span style={{ color: "#FF6B35" }}>.</span>
          </h1>
          <p style={{ color: "#666", fontSize: 14, margin: 0, letterSpacing: "0.05em" }}>
            45-day build roadmap · MERN + PostgreSQL + React Native · 0 to shipped
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>

        {/* Mentor Rules */}
        <div style={{
          border: "1px solid #1E1E2E",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 36,
          background: "#0D0D18"
        }}>
          <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Ground Rules (read this first)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rules.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
                <div>
                  <span style={{ color: "#E8E8F0", fontWeight: 700, fontSize: 13 }}>{r.rule} — </span>
                  <span style={{ color: "#888", fontSize: 13 }}>{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => { setActivePhase(p.id); setExpandedDay(null); }}
              style={{
                background: activePhase === p.id ? p.color : "transparent",
                border: `1px solid ${activePhase === p.id ? p.color : "#1E1E2E"}`,
                color: activePhase === p.id ? "#0A0A0F" : "#666",
                borderRadius: 4,
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 0.15s"
              }}
            >
              Phase {p.id}: {p.title}
              <span style={{
                marginLeft: 8,
                opacity: 0.7,
                fontWeight: 400,
                fontSize: 11
              }}>{p.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Phase Content */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 900,
              margin: "0 0 4px",
              fontFamily: "'Georgia', serif"
            }}>
              Phase {currentPhase.id}: <span style={{ color: currentPhase.color }}>{currentPhase.title}</span>
            </h2>
            <p style={{ color: "#555", fontSize: 12, margin: 0 }}>{currentPhase.subtitle}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentPhase.days.map((d, i) => {
              const key = `${activePhase}-${i}`;
              const isOpen = expandedDay === key;
              return (
                <div
                  key={key}
                  style={{
                    border: `1px solid ${isOpen ? currentPhase.color + "60" : "#1E1E2E"}`,
                    borderRadius: 6,
                    overflow: "hidden",
                    background: isOpen ? currentPhase.accent : "#0D0D18",
                    transition: "all 0.2s"
                  }}
                >
                  <button
                    onClick={() => setExpandedDay(isOpen ? null : key)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      textAlign: "left"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                      <span style={{
                        background: currentPhase.color + "22",
                        color: currentPhase.color,
                        borderRadius: 3,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontFamily: "'Courier New', monospace",
                        fontWeight: 700,
                        flexShrink: 0,
                        letterSpacing: "0.05em"
                      }}>Day {d.day}</span>
                      <span style={{ color: "#E8E8F0", fontSize: 14, fontWeight: 700 }}>{d.topic}</span>
                    </div>
                    <span style={{ color: "#444", fontSize: 16, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${currentPhase.color}30` }}>
                      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                            What you'll learn
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {d.skills.map((s, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <span style={{ color: currentPhase.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▶</span>
                                <span style={{ color: "#AAA", fontSize: 12, lineHeight: 1.5 }}>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                            Day's deliverable
                          </div>
                          <div style={{
                            background: currentPhase.color + "15",
                            border: `1px solid ${currentPhase.color}30`,
                            borderRadius: 4,
                            padding: "12px 14px",
                          }}>
                            <span style={{ color: currentPhase.color, fontSize: 11 }}>✓ </span>
                            <span style={{ color: "#CCC", fontSize: 12, lineHeight: 1.5 }}>{d.deliverable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stack Overview */}
        <div style={{
          marginTop: 40,
          border: "1px solid #1E1E2E",
          borderRadius: 8,
          padding: "20px 24px",
          background: "#0D0D18"
        }}>
          <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Your Tech Stack
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {[
              { layer: "Backend", tech: "Node.js + Express" },
              { layer: "Database", tech: "PostgreSQL + Sequelize" },
              { layer: "Frontend", tech: "React + Tailwind" },
              { layer: "Mobile", tech: "React Native + Expo" },
              { layer: "Auth", tech: "JWT + bcrypt" },
              { layer: "Payments", tech: "Razorpay" },
              { layer: "Deploy", tech: "Railway + Vercel" },
              { layer: "Version Control", tech: "Git + GitHub" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "#13131F",
                border: "1px solid #1E1E2E",
                borderRadius: 4,
                padding: "10px 12px"
              }}>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.layer}</div>
                <div style={{ fontSize: 12, color: "#CCC", fontWeight: 700 }}>{s.tech}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 24,
          padding: "16px 20px",
          background: "#FF6B3510",
          border: "1px solid #FF6B3530",
          borderRadius: 6,
          fontSize: 13,
          color: "#FF6B35",
          textAlign: "center",
          letterSpacing: "0.05em"
        }}>
          Ready to start? Reply: <strong>"Day 1 — let's go"</strong> and I'll begin teaching.
        </div>
      </div>
    </div>
  );
}
