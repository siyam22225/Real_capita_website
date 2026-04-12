import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminMessagesPage() {
    await requireAdmin();
let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];

try {
  messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
} catch (error) {
  console.error("ADMIN_MESSAGES_PAGE_ERROR", error);
}

  return (
    <section
      style={{
        padding: "48px 0 70px",
        background: "transparent",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <AdminNav />
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              margin: "0 0 10px 0",
              color: "#16a34a",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 48px)",
            }}
          >
            Contact Messages
          </h1>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.94)",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(21,150,212,0.08)",
            boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
          }}
        >
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "980px",
              }}
            >
              <thead>
                <tr style={{ background: "#f8fbff" }}>
                  {["Name", "Email", "Phone", "Query Type", "Subject", "Message", "Date"].map(
                    (head) => (
                      <th
                        key={head}
                        style={{
                          textAlign: "left",
                          padding: "16px 18px",
                          fontSize: "14px",
                          color: "#0f172a",
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "24px 18px",
                        color: "#64748b",
                        fontSize: "15px",
                      }}
                    >
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id}>
                      <td style={cellStyle}>{msg.name}</td>
                      <td style={cellStyle}>{msg.email}</td>
                      <td style={cellStyle}>{msg.phone}</td>
                      <td style={cellStyle}>{msg.queryType}</td>
                      <td style={cellStyle}>{msg.subject}</td>
                      <td style={cellStyle}>{msg.message}</td>
                      <td style={cellStyle}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

const cellStyle: React.CSSProperties = {
  padding: "16px 18px",
  fontSize: "14px",
  color: "#475569",
  borderBottom: "1px solid #e5e7eb",
  verticalAlign: "top",
};