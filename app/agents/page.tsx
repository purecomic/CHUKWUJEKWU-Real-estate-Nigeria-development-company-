export default function AgentsPage() {
  const agents = [
    {name:"Emeka Okafor",role:"Senior Property Agent",location:"Lagos",phone:"+234 801 234 5678",email:"emeka@chukwujekwu.com",listings:12,emoji:"👨"},
    {name:"Amina Bello",role:"Property Agent",location:"Abuja",phone:"+234 802 345 6789",email:"amina@chukwujekwu.com",listings:8,emoji:"👩"},
    {name:"Chidi Nwosu",role:"Commercial Agent",location:"Port Harcourt",phone:"+234 803 456 7890",email:"chidi@chukwujekwu.com",listings:15,emoji:"👨"},
    {name:"Fatima Aliyu",role:"Property Agent",location:"Kano",phone:"+234 804 567 8901",email:"fatima@chukwujekwu.com",listings:6,emoji:"👩"},
  ];
  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="/listings" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Listings</a>
          <a href="/contact" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Contact</a>
        </div>
      </nav>
      <div style={{background:"#111827",padding:"40px 20px",textAlign:"center"}}>
        <h1 style={{color:"white",fontSize:"32px",fontWeight:"bold",margin:"0 0 8px"}}>Our Agents</h1>
        <p style={{color:"#6b7280",margin:0}}>Meet our expert real estate professionals</p>
      </div>
      <div style={{maxWidth:"800px",margin:"0 auto",padding:"24px 20px"}}>
        <div style={{display:"grid",gap:"16px"}}>
          {agents.map((a,i)=>(
            <div key={i} style={{background:"#1f2937",borderRadius:"16px",padding:"20px",border:"1px solid #374151"}}>
              <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"}}>
                <div style={{width:"64px",height:"64px",background:"#ea580c",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",flexShrink:0}}>{a.emoji}</div>
                <div style={{flex:1}}>
                  <h3 style={{color:"white",fontWeight:"bold",fontSize:"18px",margin:"0 0 4px"}}>{a.name}</h3>
                  <p style={{color:"#f97316",fontSize:"13px",margin:"0 0 2px"}}>{a.role}</p>
                  <p style={{color:"#6b7280",fontSize:"13px",margin:0}}>📍 {a.location}</p>
                </div>
                <div style={{background:"#111827",borderRadius:"10px",padding:"8px 14px",textAlign:"center"}}>
                  <p style={{color:"#f97316",fontWeight:"bold",fontSize:"20px",margin:"0 0 2px"}}>{a.listings}</p>
                  <p style={{color:"#6b7280",fontSize:"11px",margin:0}}>Listings</p>
                </div>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <a href={"tel:"+a.phone} style={{flex:1,background:"#ea580c",color:"white",padding:"12px",borderRadius:"10px",textDecoration:"none",fontWeight:"bold",textAlign:"center",fontSize:"14px"}}>Call</a>
                <a href={"https://wa.me/"+a.phone.replace(/\D/g,"")} target="_blank" style={{flex:1,background:"#16a34a",color:"white",padding:"12px",borderRadius:"10px",textDecoration:"none",fontWeight:"bold",textAlign:"center",fontSize:"14px"}}>WhatsApp</a>
                <a href={"mailto:"+a.email} style={{flex:1,background:"#111827",color:"white",padding:"12px",borderRadius:"10px",textDecoration:"none",fontWeight:"bold",textAlign:"center",fontSize:"14px",border:"1px solid #374151"}}>Email</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer style={{background:"#030712",padding:"24px",textAlign:"center",marginTop:"40px"}}>
        <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#374151",fontSize:"12px",margin:0}}>2025 All rights reserved</p>
      </footer>
    </main>
  );
}
