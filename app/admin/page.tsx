"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [counts, setCounts] = useState({properties:0,agents:0,inquiries:0,users:0});

  useEffect(()=>{
    const load = async () => {
      const [p,a,i,u] = await Promise.all([
        supabase.from("properties").select("id",{count:"exact",head:true}),
        supabase.from("agents").select("id",{count:"exact",head:true}),
        supabase.from("inquiries").select("id",{count:"exact",head:true}),
        supabase.from("users").select("id",{count:"exact",head:true}),
      ]);
      setCounts({properties:p.count||0,agents:a.count||0,inquiries:i.count||0,users:u.count||0});
    };
    load();
  },[]);

  const stats = [
    {label:"Properties",value:counts.properties,emoji:"🏠",color:"#1e40af"},
    {label:"Agents",value:counts.agents,emoji:"👥",color:"#0369a1"},
    {label:"Inquiries",value:counts.inquiries,emoji:"✉️",color:"#0f766e"},
    {label:"Users",value:counts.users,emoji:"👤",color:"#7c3aed"},
  ];

  const quickLinks = [
    {label:"Add Property",desc:"List a new property",href:"/admin/properties/new",emoji:"🏠",bg:"#1e40af"},
    {label:"Add Agent",desc:"Register agent",href:"/admin/agents/new",emoji:"👥",bg:"#0369a1"},
    {label:"Inquiries",desc:"Check messages",href:"/admin/inquiries",emoji:"✉️",bg:"#0f766e"},
    {label:"Commission",desc:"Edit rates",href:"/admin/commission",emoji:"💰",bg:"#7c3aed"},
  ];

  const navItems = [
    {label:"Dashboard",emoji:"📊",href:"/admin"},
    {label:"Properties",emoji:"🏠",href:"/admin/properties"},
    {label:"Agents",emoji:"👥",href:"/admin/agents"},
    {label:"Inquiries",emoji:"✉️",href:"/admin/inquiries"},
    {label:"Settings",emoji:"⚙️",href:"/admin/settings"},
  ];

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#f8fafc",minHeight:"100vh",paddingBottom:"72px"}}>
      <div style={{background:"linear-gradient(135deg,#1e40af,#2563eb)",padding:"24px 20px 32px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
          <div>
            <p style={{color:"#bfdbfe",fontSize:"11px",margin:"0 0 2px",letterSpacing:"1px"}}>ADMIN PANEL</p>
            <p style={{color:"white",fontWeight:"800",fontSize:"18px",margin:0}}>CHUKWUJEKWU RE</p>
          </div>
          <a href="/" style={{background:"rgba(255,255,255,0.15)",color:"white",padding:"6px 14px",borderRadius:"8px",textDecoration:"none",fontSize:"12px",fontWeight:"600"}}>← Site</a>
        </div>
        <p style={{color:"white",fontWeight:"700",fontSize:"16px",margin:"0 0 16px"}}>Dashboard</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          {stats.map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.15)",borderRadius:"14px",padding:"16px",backdropFilter:"blur(10px)"}}>
              <p style={{fontSize:"22px",margin:"0 0 6px"}}>{s.emoji}</p>
              <p style={{color:"white",fontSize:"26px",fontWeight:"800",margin:"0 0 2px"}}>{s.value}</p>
              <p style={{color:"#bfdbfe",margin:0,fontSize:"12px"}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"20px 16px"}}>
        <p style={{color:"#0f172a",fontWeight:"700",fontSize:"14px",margin:"0 0 14px"}}>Quick Actions</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"}}>
          {quickLinks.map(q=>(
            <a key={q.href} href={q.href} style={{background:q.bg,borderRadius:"14px",padding:"16px",textDecoration:"none",display:"block"}}>
              <p style={{fontSize:"22px",margin:"0 0 6px"}}>{q.emoji}</p>
              <p style={{color:"white",fontWeight:"700",margin:"0 0 2px",fontSize:"13px"}}>{q.label}</p>
              <p style={{color:"rgba(255,255,255,0.7)",margin:0,fontSize:"11px"}}>{q.desc}</p>
            </a>
          ))}
        </div>
        <p style={{color:"#0f172a",fontWeight:"700",fontSize:"14px",margin:"0 0 14px"}}>All Sections</p>
        <div style={{display:"grid",gap:"10px"}}>
          {[
            {label:"Properties",desc:"Add, edit, delete listings",href:"/admin/properties",emoji:"🏠"},
            {label:"Agents",desc:"Manage your agents",href:"/admin/agents",emoji:"👥"},
            {label:"Inquiries",desc:"View contact messages",href:"/admin/inquiries",emoji:"✉️"},
            {label:"Notifications",desc:"Send notifications",href:"/admin/notifications",emoji:"🔔"},
            {label:"Users",desc:"View registered users",href:"/admin/users",emoji:"👤"},
            {label:"Commission",desc:"Edit agent commission rate",href:"/admin/commission",emoji:"💰"},
            {label:"Settings",desc:"Admin panel settings",href:"/admin/settings",emoji:"⚙️"},
          ].map(s=>(
            <a key={s.href} href={s.href} style={{background:"white",borderRadius:"12px",padding:"14px 16px",border:"1px solid #e2e8f0",textDecoration:"none",display:"flex",alignItems:"center",gap:"14px",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <span style={{fontSize:"22px"}}>{s.emoji}</span>
              <div style={{flex:1}}>
                <p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 2px",fontSize:"14px"}}>{s.label}</p>
                <p style={{color:"#94a3b8",margin:0,fontSize:"12px"}}>{s.desc}</p>
              </div>
              <span style={{color:"#cbd5e1",fontSize:"16px"}}>→</span>
            </a>
          ))}
        </div>
      </div>
      <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #e2e8f0",display:"flex",boxShadow:"0 -2px 10px rgba(0,0,0,0.06)"}}>
        {navItems.map(n=>(
          <a key={n.href} href={n.href} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",textDecoration:"none",gap:"3px"}}>
            <span style={{fontSize:"18px"}}>{n.emoji}</span>
            <p style={{color:n.href==="/admin"?"#1e40af":"#94a3b8",fontSize:"10px",fontWeight:n.href==="/admin"?"700":"500",margin:0}}>{n.label}</p>
          </a>
        ))}
      </nav>
    </main>
  );
}
