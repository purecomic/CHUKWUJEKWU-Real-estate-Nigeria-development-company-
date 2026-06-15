export default function AdminPage() {
  const stats = [
    {label:"Total Properties",value:"6",emoji:"🏠",color:"#ea580c"},
    {label:"Total Agents",value:"4",emoji:"👥",color:"#2563eb"},
    {label:"Inquiries",value:"12",emoji:"✉️",color:"#16a34a"},
    {label:"Total Users",value:"28",emoji:"👤",color:"#9333ea"},
  ];
  const inquiries = [
    {name:"John Adeyemi",email:"john@email.com",property:"4-Bedroom Duplex in Lekki",date:"Today"},
    {name:"Grace Obi",email:"grace@email.com",property:"3-Bedroom Apartment Maitama",date:"Yesterday"},
    {name:"Musa Ibrahim",email:"musa@email.com",property:"Land in Trans Amadi",date:"2 days ago"},
  ];
  return (
    <main style={{background:"#0f172a",minHeight:"100vh",fontFamily:"system-ui,sans-serif",display:"flex"}}>
      {/* Sidebar */}
      <div style={{width:"220px",background:"#1e293b",borderRight:"1px solid #334155",display:"flex",flexDirection:"column",position:"fixed",height:"100vh",top:0,left:0}}>
        <div style={{padding:"20px",borderBottom:"1px solid #334155"}}>
          <p style={{color:"#f97316",fontWeight:"900",fontSize:"14px",margin:"0 0 2px"}}>CHUKWUJEKWU</p>
          <p style={{color:"#64748b",fontSize:"11px",margin:0}}>Admin Panel</p>
        </div>
        <nav style={{padding:"12px",flex:1}}>
          {[
            {label:"Dashboard",emoji:"📊",href:"/admin",active:true},
            {label:"Properties",emoji:"🏠",href:"/admin/properties"},
            {label:"Agents",emoji:"👥",href:"/admin/agents"},
            {label:"Inquiries",emoji:"✉️",href:"/admin/inquiries"},
            {label:"Notifications",emoji:"🔔",href:"/admin/notifications"},
            {label:"Users",emoji:"👤",href:"/admin/users"},
            {label:"Settings",emoji:"⚙️",href:"/admin/settings"},
          ].map((item,i)=>(
            <a key={i} href={item.href} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"10px",textDecoration:"none",marginBottom:"4px",background:item.active?"#ea580c":"transparent",color:item.active?"white":"#94a3b8",fontSize:"14px",fontWeight:item.active?"bold":"normal"}}>
              <span>{item.emoji}</span>{item.label}
            </a>
          ))}
        </nav>
        <div style={{padding:"12px",borderTop:"1px solid #334155"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"10px",textDecoration:"none",color:"#ef4444",fontSize:"14px"}}>
            🚪 Logout
          </a>
        </div>
      </div>

      {/* Main */}
      <div style={{marginLeft:"220px",flex:1,padding:"24px"}}>
        <div style={{marginBottom:"24px"}}>
          <h1 style={{color:"white",fontSize:"24px",fontWeight:"bold",margin:"0 0 4px"}}>Dashboard</h1>
          <p style={{color:"#64748b",margin:0}}>Welcome back, Admin</p>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"14px",marginBottom:"24px"}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:"#1e293b",borderRadius:"16px",padding:"20px",border:"1px solid #334155"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                <span style={{fontSize:"28px"}}>{s.emoji}</span>
                <div style={{width:"10px",height:"10px",borderRadius:"50%",background:s.color}}></div>
              </div>
              <p style={{color:"white",fontSize:"32px",fontWeight:"900",margin:"0 0 4px"}}>{s.value}</p>
              <p style={{color:"#64748b",fontSize:"13px",margin:0}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"14px",marginBottom:"24px"}}>
          <a href="/admin/properties/new" style={{background:"#ea580c",borderRadius:"16px",padding:"20px",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <p style={{color:"white",fontWeight:"bold",margin:"0 0 4px"}}>Add Property</p>
              <p style={{color:"#fed7aa",fontSize:"13px",margin:0}}>List new property</p>
            </div>
            <span style={{fontSize:"24px"}}>+</span>
          </a>
          <a href="/admin/agents/new" style={{background:"#1e3a5f",borderRadius:"16px",padding:"20px",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"space-between",border:"1px solid #334155"}}>
            <div>
              <p style={{color:"white",fontWeight:"bold",margin:"0 0 4px"}}>Add Agent</p>
              <p style={{color:"#64748b",fontSize:"13px",margin:0}}>Register agent</p>
            </div>
            <span style={{fontSize:"24px"}}>+</span>
          </a>
        </div>

        {/* Recent Inquiries */}
        <div style={{background:"#1e293b",borderRadius:"16px",border:"1px solid #334155"}}>
          <div style={{padding:"16px 20px",borderBottom:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h2 style={{color:"white",fontWeight:"bold",margin:0}}>Recent Inquiries</h2>
            <a href="/admin/inquiries" style={{color:"#f97316",fontSize:"13px",textDecoration:"none"}}>View All</a>
          </div>
          {inquiries.map((inq,i)=>(
            <div key={i} style={{padding:"16px 20px",borderBottom:i<inquiries.length-1?"1px solid #334155":"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start"}}>
                <div>
                  <p style={{color:"white",fontWeight:"bold",margin:"0 0 2px",fontSize:"15px"}}>{inq.name}</p>
                  <p style={{color:"#64748b",fontSize:"13px",margin:"0 0 4px"}}>{inq.email}</p>
                  <p style={{color:"#f97316",fontSize:"12px",margin:0}}>{inq.property}</p>
                </div>
                <span style={{color:"#475569",fontSize:"12px"}}>{inq.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
