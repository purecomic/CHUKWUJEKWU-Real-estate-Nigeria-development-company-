"use client";
export default function AdminSettings() {
  const sections = [
    {title:"Properties",desc:"Add, edit or delete property listings",href:"/admin/properties",emoji:"🏠"},
    {title:"Agents",desc:"Manage real estate agents",href:"/admin/agents",emoji:"👥"},
    {title:"Inquiries",desc:"View contact messages from visitors",href:"/admin/inquiries",emoji:"✉️"},
    {title:"Users",desc:"View registered users",href:"/admin/users",emoji:"👤"},
    {title:"Notifications",desc:"Send notifications to users",href:"/admin/notifications",emoji:"🔔"},
  ];
  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back to Dashboard</a>
      <h1 style={{color:"white",margin:"8px 0 8px"}}>Settings & Navigation</h1>
      <p style={{color:"#64748b",marginBottom:"24px"}}>Manage all sections of your admin panel</p>
      <div style={{display:"grid",gap:"16px",marginBottom:"32px"}}>
        {sections.map(s=>(
          <a key={s.href} href={s.href} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155",textDecoration:"none",display:"flex",alignItems:"center",gap:"16px"}}>
            <span style={{fontSize:"28px"}}>{s.emoji}</span>
            <div>
              <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px",fontSize:"16px"}}>{s.title}</p>
              <p style={{color:"#94a3b8",margin:0,fontSize:"14px"}}>{s.desc}</p>
            </div>
            <span style={{color:"#475569",marginLeft:"auto",fontSize:"20px"}}>→</span>
          </a>
        ))}
      </div>
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155"}}>
        <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 12px"}}>Site Info</p>
        <p style={{color:"#94a3b8",margin:"0 0 4px",fontSize:"14px"}}>Site: CHUKWUJEKWU Real Estate Company Nigeria</p>
        <p style={{color:"#94a3b8",margin:"0 0 4px",fontSize:"14px"}}>Stack: Next.js 13 · Supabase · Vercel</p>
        <p style={{color:"#94a3b8",margin:0,fontSize:"14px"}}>Admin: Restricted to authorized users only</p>
      </div>
    </div>
  );
}
