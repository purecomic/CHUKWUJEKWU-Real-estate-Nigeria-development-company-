"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      const { data } = await supabase.from("agents").select("*").order("created_at",{ascending:false});
      setAgents(data||[]);
      setLoading(false);
    };
    load();
  },[]);

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <nav style={{background:"rgba(255,255,255,0.95)",borderBottom:"1px solid #e2e8f0",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
        <a href="/" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"}}>
          <div style={{width:"32px",height:"32px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontWeight:"900",fontSize:"14px"}}>C</span></div>
          <div><p style={{color:"#1e40af",fontWeight:"800",fontSize:"13px",margin:0}}>CHUKWUJEKWU</p><p style={{color:"#94a3b8",fontSize:"10px",margin:0}}>REAL ESTATE</p></div>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
          <a href="/listings" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Listings</a>
          <a href="/agents" style={{color:"#1e40af",textDecoration:"none",fontSize:"13px",fontWeight:"700"}}>Agents</a>
          <a href="/contact" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Contact</a>
          <a href="/login" style={{background:"#1e40af",color:"white",padding:"8px 18px",borderRadius:"8px",textDecoration:"none",fontWeight:"600",fontSize:"13px"}}>Login</a>
        </div>
      </nav>
      <div style={{paddingTop:"64px"}}>
        <div style={{background:"linear-gradient(135deg,#eff6ff,#dbeafe)",padding:"48px 20px",textAlign:"center"}}>
          <p style={{color:"#2563eb",fontWeight:"700",letterSpacing:"2px",fontSize:"11px",marginBottom:"8px"}}>OUR TEAM</p>
          <h1 style={{color:"#0f172a",fontSize:"28px",fontWeight:"800",margin:"0 0 8px"}}>Meet Our Agents</h1>
          <p style={{color:"#64748b",margin:0,fontSize:"14px"}}>Expert real estate professionals ready to help you</p>
        </div>
        <div style={{maxWidth:"900px",margin:"0 auto",padding:"40px 20px"}}>
          {loading ? <p style={{textAlign:"center",color:"#64748b"}}>Loading agents...</p> : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"20px"}}>
              {agents.map((a,i)=>(
                <div key={i} style={{background:"white",borderRadius:"16px",padding:"28px 20px",textAlign:"center",border:"1px solid #e2e8f0",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                  {a.image_url ? <img src={a.image_url} alt={a.name} style={{width:"80px",height:"80px",borderRadius:"50%",objectFit:"cover",margin:"0 auto 16px",display:"block",border:"3px solid #dbeafe"}} /> : <div style={{width:"80px",height:"80px",borderRadius:"50%",background:"linear-gradient(135deg,#1e40af,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><span style={{color:"white",fontSize:"28px",fontWeight:"800"}}>{(a.name||"A")[0]}</span></div>}
                  <p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 4px",fontSize:"16px"}}>{a.name}</p>
                  <p style={{color:"#2563eb",fontSize:"12px",fontWeight:"600",margin:"0 0 4px"}}>{a.specialty||a.role}</p>
                  <p style={{color:"#94a3b8",fontSize:"12px",margin:"0 0 16px"}}>📍 {a.location||"Nigeria"}</p>
                  <div style={{display:"flex",gap:"8px",justifyContent:"center"}}>
                    {a.phone && <a href={"tel:"+a.phone} style={{background:"#eff6ff",color:"#1e40af",padding:"8px 16px",borderRadius:"8px",textDecoration:"none",fontSize:"12px",fontWeight:"600"}}>📞 Call</a>}
                    {a.email && <a href={"mailto:"+a.email} style={{background:"#1e40af",color:"white",padding:"8px 16px",borderRadius:"8px",textDecoration:"none",fontSize:"12px",fontWeight:"600"}}>✉️ Email</a>}
                  </div>
                </div>
              ))}
              {agents.length===0 && !loading && <p style={{color:"#94a3b8",textAlign:"center",gridColumn:"1/-1"}}>No agents found.</p>}
            </div>
          )}
        </div>
      </div>
      <footer style={{background:"#0f172a",padding:"32px 20px",textAlign:"center"}}><p style={{color:"#475569",fontSize:"12px",margin:0}}>© 2025 CHUKWUJEKWU Real Estate. All rights reserved.</p></footer>
    </main>
  );
}
