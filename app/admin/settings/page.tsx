"use client";
export default function AdminSettings() {
  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a>
      <h1 style={{color:"white",margin:"4px 0 24px"}}>Settings</h1>
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",border:"1px solid #334155"}}>
        <p style={{color:"#94a3b8"}}>Site: CHUKWUJEKWU Real Estate Company Nigeria</p>
        <p style={{color:"#94a3b8"}}>Stack: Next.js 13 · Supabase · Vercel</p>
        <p style={{color:"#94a3b8"}}>Admin: Restricted to authorized users only</p>
      </div>
    </div>
  );
}
