import { useState } from "react";

const data = {
  balance: { youOwe: 1240, owedToYou: 3750 },
  recentSMS: [
    { id: 1, raw: "₹500 debited via UPI to Rahul Kumar", amount: 500, to: "Rahul Kumar", time: "2 min ago", logged: false },
    { id: 2, raw: "₹1200 credited via UPI from Priya Singh", amount: 1200, from: "Priya Singh", time: "1 hr ago", logged: true },
    { id: 3, raw: "₹350 debited via UPI to Zomato", amount: 350, to: "Zomato", time: "3 hr ago", logged: false },
  ],
  friends: [
    { name: "Rahul Kumar", avatar: "RK", owes: 500, youOwe: 0, color: "#FF6B35" },
    { name: "Priya Singh", avatar: "PS", owes: 0, youOwe: 1240, color: "#9B59B6" },
    { name: "Arjun Mehta", avatar: "AM", owes: 2000, youOwe: 0, color: "#2ECC71" },
    { name: "Sneha Patel", avatar: "SP", owes: 1250, youOwe: 0, color: "#E74C3C" },
  ],
  roadmap: [
    {
      phase: "Phase 0",
      title: "Rebuild Expense Merge",
      status: "active",
      duration: "Now",
      color: "#FF6B35",
      tasks: [
        "MERN stack refresh — build from memory",
        "PostgreSQL schema design practice",
        "React Native environment setup",
        "Auth flow (JWT + sessions)",
      ],
      goal: "Prove you can build end-to-end without references",
    },
    {
      phase: "Phase 1",
      title: "MVP Core",
      status: "upcoming",
      duration: "Month 1–2",
      color: "#F39C12",
      tasks: [
        "SMS parsing for UPI patterns (HDFC, SBI, Paytm, GPay)",
        "Manual expense entry fallback",
        "Friend group management",
        "Simple split (equal / custom)",
        "Settlement tracking",
      ],
      goal: "Working app — 5 real friends using it",
    },
    {
      phase: "Phase 2",
      title: "Automation Layer",
      status: "upcoming",
      duration: "Month 3–4",
      color: "#27AE60",
      tasks: [
        "Background SMS listener (Android first)",
        "Smart categorization (food, travel, bills)",
        "Push notification prompts",
        "Recurring expense detection",
        "UPI ID → contact name mapping",
      ],
      goal: "The magic moment — auto-detect working",
    },
    {
      phase: "Phase 3",
      title: "Premium + Growth",
      status: "upcoming",
      duration: "Month 5–6",
      color: "#8E44AD",
      tasks: [
        "Freemium gate (₹99–199/mo)",
        "Monthly spending reports PDF",
        "WhatsApp reminder integration",
        "Referral system",
        "iOS SMS (workaround via Shortcuts)",
      ],
      goal: "First ₹1000 MRR",
    },
  ],
  techNotes: [
    { label: "SMS Parsing", note: "Use regex on TRANSACTION_SMS category. Patterns differ by bank — build a pattern library.", tag: "critical" },
    { label: "Android SMS", note: "READ_SMS permission. Works great. iOS needs Shortcuts app workaround — do Android first.", tag: "platform" },
    { label: "PostgreSQL Schema", note: "users → groups → expenses → splits → settlements. Add UPI transaction ID for dedup.", tag: "schema" },
    { label: "React Native", note: "Expo Go for dev speed. Eject only when you need native SMS modules.", tag: "stack" },
    { label: "Auth", note: "Phone number OTP via Twilio/MSG91. Indians trust OTP over email signup.", tag: "ux" },
  ],
};

const PhaseCard = ({ phase, isActive }) => {
  const [open, setOpen] = useState(isActive);
  return (
    <div
      style={{
        border: `1px solid ${isActive ? phase.color : "#2a2a2a"}`,
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden",
        background: isActive ? `${phase.color}0d` : "#141414",
        transition: "all 0.2s",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: phase.color,
              display: "inline-block",
              boxShadow: isActive ? `0 0 8px ${phase.color}` : "none",
            }}
          />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: phase.color, letterSpacing: 1 }}>
            {phase.phase}
          </span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: "#f0f0f0", fontSize: 15 }}>
            {phase.title}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 0.5 }}>
            {phase.duration}
          </span>
          <span style={{ color: "#444", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 18px 16px" }}>
          <div
            style={{
              fontSize: 12,
              fontFamily: "'Sora', sans-serif",
              color: phase.color,
              marginBottom: 10,
              padding: "6px 10px",
              background: `${phase.color}15`,
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            🎯 {phase.goal}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {phase.tasks.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: phase.color, marginTop: 2, fontSize: 10 }}>◆</span>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: "#bbb", lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const tagColors = { critical: "#E74C3C", platform: "#F39C12", schema: "#3498DB", stack: "#2ECC71", ux: "#9B59B6" };

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [smsItems, setSmsItems] = useState(data.recentSMS);
  const net = data.balance.owedToYou - data.balance.youOwe;

  const logSMS = (id) => {
    setSmsItems((prev) => prev.map((s) => (s.id === id ? { ...s, logged: true } : s)));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        color: "#f0f0f0",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1e1e1e",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#0c0c0c",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #FF6B35, #F7C59F)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ₹
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>UPITrack</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>
              STARTUP BUILDER
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#444",
            background: "#141414",
            border: "1px solid #222",
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          Phase 0 → Active
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e", padding: "0 24px" }}>
        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "roadmap", label: "Roadmap" },
          { id: "tech", label: "Tech Notes" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #FF6B35" : "2px solid transparent",
              color: tab === t.id ? "#FF6B35" : "#555",
              fontFamily: "'Sora', sans-serif",
              fontWeight: tab === t.id ? 600 : 400,
              fontSize: 13,
              padding: "12px 16px",
              cursor: "pointer",
              marginBottom: -1,
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <>
            {/* Net balance */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a1a1a, #141414)",
                border: "1px solid #2a2a2a",
                borderRadius: 16,
                padding: 24,
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 11, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 6 }}>
                NET BALANCE
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: net >= 0 ? "#2ECC71" : "#E74C3C",
                  letterSpacing: -1,
                  marginBottom: 4,
                }}
              >
                {net >= 0 ? "+" : ""}₹{Math.abs(net).toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 12, color: "#555" }}>
                {net >= 0 ? "Friends owe you more than you owe" : "You owe more than friends owe you"}
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 16, paddingTop: 16, borderTop: "1px solid #1e1e1e" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>You owe</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#E74C3C" }}>₹{data.balance.youOwe.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Owed to you</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#2ECC71" }}>₹{data.balance.owedToYou.toLocaleString("en-IN")}</div>
                </div>
              </div>
            </div>

            {/* SMS Detections */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14 }}>📱 SMS Detections</div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    color: "#FF6B35",
                    background: "#FF6B3515",
                    padding: "3px 8px",
                    borderRadius: 10,
                  }}
                >
                  AUTO-DETECTED
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {smsItems.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      background: "#141414",
                      border: `1px solid ${s.logged ? "#1e1e1e" : "#2a2a2a"}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: s.logged ? 0.5 : 1,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#888", marginBottom: 4 }}>
                        {s.raw}
                      </div>
                      <div style={{ fontSize: 10, color: "#444" }}>{s.time}</div>
                    </div>
                    {!s.logged ? (
                      <button
                        onClick={() => logSMS(s.id)}
                        style={{
                          background: "#FF6B35",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 600,
                          fontSize: 12,
                          padding: "6px 14px",
                          cursor: "pointer",
                          marginLeft: 12,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Log it →
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: "#444", marginLeft: 12, fontFamily: "'Space Mono', monospace" }}>
                        ✓ logged
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>👥 Friends & Balances</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.friends.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#141414",
                      border: "1px solid #1e1e1e",
                      borderRadius: 10,
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: `${f.color}20`,
                        border: `1px solid ${f.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        color: f.color,
                        flexShrink: 0,
                      }}
                    >
                      {f.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {f.owes > 0 ? (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#2ECC71" }}>+₹{f.owes.toLocaleString("en-IN")}</div>
                          <div style={{ fontSize: 10, color: "#555" }}>owes you</div>
                        </>
                      ) : (
                        <>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#E74C3C" }}>-₹{f.youOwe.toLocaleString("en-IN")}</div>
                          <div style={{ fontSize: 10, color: "#555" }}>you owe</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ROADMAP TAB */}
        {tab === "roadmap" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Your Build Roadmap</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
                From learning project → to first ₹1000 MRR. One phase at a time.
              </div>
            </div>
            {data.roadmap.map((phase) => (
              <PhaseCard key={phase.phase} phase={phase} isActive={phase.status === "active"} />
            ))}
            <div
              style={{
                marginTop: 20,
                padding: 16,
                background: "#FF6B3510",
                border: "1px solid #FF6B3530",
                borderRadius: 12,
                fontSize: 13,
                color: "#FF6B35",
                lineHeight: 1.6,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <strong>🔑 Rule #1:</strong> Don't move to Phase 1 until Expense Merge is rebuilt cleanly. That milestone proves you can ship. Everything after is just more of the same muscle.
            </div>
          </>
        )}

        {/* TECH NOTES TAB */}
        {tab === "tech" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Tech Notes</div>
              <div style={{ fontSize: 13, color: "#666" }}>Critical decisions and gotchas for your stack.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.techNotes.map((n, i) => (
                <div
                  key={i}
                  style={{
                    background: "#141414",
                    border: "1px solid #1e1e1e",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{n.label}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'Space Mono', monospace",
                        color: tagColors[n.tag],
                        background: `${tagColors[n.tag]}15`,
                        padding: "2px 7px",
                        borderRadius: 8,
                        letterSpacing: 0.5,
                      }}
                    >
                      {n.tag.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{n.note}</div>
                </div>
              ))}
            </div>

            {/* Stack summary */}
            <div
              style={{
                marginTop: 20,
                background: "#141414",
                border: "1px solid #1e1e1e",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Your Stack at a Glance</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["MongoDB", "Express.js", "React Native", "Node.js", "PostgreSQL", "JWT Auth", "Expo Go", "MSG91 OTP", "Regex SMS Parser"].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      color: "#ccc",
                      background: "#1e1e1e",
                      border: "1px solid #2a2a2a",
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
