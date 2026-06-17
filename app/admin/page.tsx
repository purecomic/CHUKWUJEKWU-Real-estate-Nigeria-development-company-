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
      setCounts({
        properties: p.count||0,
        agents: a.count||0,
        inquiries: i.count||0,
        users: u.count||0,
      });
    };
    load();
  },[]);

  const navItems = [
    {label:"Dashboard",emoji:"📊",href:"/admin",active:true},
    {label:"Properties",emoji:"🏠",href:"/admin/properties"},
    {label:"Agents",emoji:"👥",href:"/admin/agents"},
    {label:"Inquiries",emoji:"✉️",href:"/admin/inquiries"},
    {label:"Notifications",emoji:"🔔",href:"/admin/notifications"},
    {label:"Users",emoji:"👤",href:"/admin/users"},
    {label:"Settings",emoji:"⚙️",href:"/admin/settings"},
  ];

  const stats = [
    {label:"Total Properties",value:counts.properties,emoji:"🏠",color:"#ea580c"},
    {label:"Total Agents",value:counts.agents,emoji:"👥",color:"#2563eb"},
    {label:"Inquiries",value:counts.inquiries,emoji:"✉️",color:"#16a34a"},
    {label:"Total Users",value:counts.users,emoji:"👤",color:"#9333ea"},
  ];

  const quickLinks = [
    {label:"Add Property",desc:"List a new property",href:"/admin/properties/new",emoji:"🏠",bg:"#ea580c"},
    {label:"Add Agent",desc:"Register agent",href:"/admin/agents/new",emoji:"👥",bg:"#1e3a5f"},
    {label:"View Inquiries",desc:"Check messages",href:"/admin/inquiries",emoji:"✉️",bg:"#14532d"},
    {label:"Notifications",desc:"Send to users",href:"/admin/notifications",emoji:"🔔",bg:"#4a1d96"},
  ];

  return (
    <main style={{background:"#0f172a",minHeight:"100vh",fontFamily:"system-ui,sans-serif",display:"flex"}}>
      <div style={{width:"220px",background:"#1e293b",borderRight:"1px solid #334155",display:"flex",flexDirection:"column",position:"fixed",height:"100vh",top:0,left:0}}>
        <div style={{padding:"20px",borderBottom:"1px solid #334155"}}>
          <p style={{color:"#f97316",fontWeight:"900",fontSize:"14px",margin:"0 0 2px"}}>CHUKWUJEKWU</p>
          <p style={{color:"#64748b",fontSize:"11px",margin:0}}>Admin Panel</p>
        </div>
        <nav style={{padding:"12px",flex:1}}>
          {navItems.map(item=>(
            <a key={item.href} href={item.href} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"10px",textDecoration:"none",marginBottom:"4px",background:item.active?"#ea580c":"transparent",color:item.active?"white":"#94a3b8",fontSize:"14px",fontWeight:item.active?"bold":"normal"}}>
              <span>{item.emoji}</span>{item.label}
            </a>
          ))}
        </nav>
        <a href="/" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"10px",textDecoration:"none",margin:"12px",color:"#ef4444",fontSize:"14px"}}>
          🚪 Exit Admin
        </a>
      </div>
      <div style={{marginLeft:"220px",padding:"24px",flex:1,color:"white"}}>
        <h1 style={{color:"white",margin:"0 0 4px"}}>Dashboard</h1>
        <p style={{color:"#64748b",marginBottom:"24px"}}>Welcome back, Admin</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px",marginBottom:"24px"}}>
          {stats.map(s=>(
            <div key={s.label} style={{background:"#1e293b",borderRadius:"16px",padding:"20px",border:"1px solid #334155"}}>
              <p style={{fontSize:"28px",margin:"0 0 8px"}}>{s.emoji}</p>
              <p style={{fontSize:"28px",fontWeight:"900",color:s.color,margin:"0 0 4px"}}>{s.value}</p>
              <p style={{color:"#64748b",margin:0,fontSize:"13px"}}>{s.label}</p>
            </div>
          ))}
        </div>
        <h2 style={{color:"white",margin:"0 0 16px"}}>Quick Actions</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
          {quickLinks.map(q=>(
            <a key={q.href} href={q.href} style={{background:q.bg,borderRadius:"16px",padding:"20px",textDecoration:"none",display:"block"}}>
              <p style={{fontSize:"24px",margin:"0 0 8px"}}>{q.emoji}</p>
              <p style={{color:"white",fontWeight:"bold",margin:"0 0 4px"}}>{q.label}</p>
              <p style={{color:"rgba(255,255,255,0.7)",margin:0,fontSize:"13px"}}>{q.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
