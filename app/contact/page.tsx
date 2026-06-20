"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function ContactPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [form, setForm] = useState({name:"",email:"",phone:"",message:""});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    if(!form.name||!form.email||!form.message){ setError("Please fill in name, email and message"); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.from("inquiries").insert([form]);
    setLoading(false);
    if(err){ setError("Error: "+err.message); return; }
    setSuccess(true); setForm({name:"",email:"",phone:"",message:""});
  };

  const inp = {background:"white",color:"#0f172a",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"12px 14px",fontSize:"14px",outline:"none",width:"100%",boxSizing:"border-box" as const};

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <nav style={{background:"rgba(255,255,255,0.97)",borderBottom:"1px solid #e2e8f0",position:"fixed",top:0,left:0,right:0,zIndex:100,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",overflowX:"auto",padding:"0 16px",height:"56px",gap:"16px"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:"6px",textDecoration:"none",flexShrink:0}}>
            <div style={{width:"26px",height:"26px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontWeight:"900",fontSize:"11px"}}>C</span></div>
            <p style={{color:"#1e40af",fontWeight:"800",fontSize:"11px",margin:0,whiteSpace:"nowrap"}}>CHUKWUJEKWU RE</p>
          </a>
          <a href="/listings" style={{color:"#475569",textDecoration:"none",fontSize:"12px",fontWeight:"500",whiteSpace:"nowrap",flexShrink:0}}>Listings</a>
          <a href="/agents" style={{color:"#475569",textDecoration:"none",fontSize:"12px",fontWeight:"500",whiteSpace:"nowrap",flexShrink:0}}>Agents</a>
          <a href="/contact" style={{color:"#1e40af",textDecoration:"none",fontSize:"12px",fontWeight:"700",whiteSpace:"nowrap",flexShrink:0}}>Contact</a>
          <a href="/login" style={{background:"#1e40af",color:"white",padding:"6px 14px",borderRadius:"6px",textDecoration:"none",fontWeight:"600",fontSize:"12px",whiteSpace:"nowrap",flexShrink:0}}>Login</a>
        </div>
      </nav>
      <div style={{paddingTop:"56px"}}>
        <div style={{background:"linear-gradient(135deg,#eff6ff,#dbeafe)",padding:"48px 20px",textAlign:"center"}}>
          <p style={{color:"#2563eb",fontWeight:"700",letterSpacing:"2px",fontSize:"11px",marginBottom:"8px"}}>GET IN TOUCH</p>
          <h1 style={{color:"#0f172a",fontSize:"28px",fontWeight:"800",margin:"0 0 8px"}}>Contact Us</h1>
          <p style={{color:"#64748b",margin:0,fontSize:"14px"}}>We are here to help you find your perfect property</p>
        </div>
        <div style={{maxWidth:"700px",margin:"0 auto",padding:"40px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"32px"}}>
            {[{e:"📞",t:"Call Us",v:"+234 800 000 0000",h:"tel:+2348000000000"},{e:"💬",t:"WhatsApp",v:"+234 800 000 0000",h:"https://wa.me/2348000000000"},{e:"✉️",t:"Email",v:"info@chukwujekwu.com",h:"mailto:info@chukwujekwu.com"},{e:"📍",t:"Office",v:"15 Broad Street, Lagos",h:"#"}].map((c,i)=>(
              <a key={i} href={c.h} style={{background:"white",borderRadius:"14px",padding:"20px",textDecoration:"none",display:"block",textAlign:"center",border:"1px solid #e2e8f0"}}>
                <p style={{fontSize:"28px",margin:"0 0 8px"}}>{c.e}</p>
                <p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 4px",fontSize:"13px"}}>{c.t}</p>
                <p style={{color:"#94a3b8",margin:0,fontSize:"12px"}}>{c.v}</p>
              </a>
            ))}
          </div>
          <div style={{background:"white",borderRadius:"16px",padding:"28px",border:"1px solid #e2e8f0"}}>
            <h2 style={{color:"#0f172a",fontSize:"18px",fontWeight:"800",marginBottom:"20px"}}>Send us a Message</h2>
            {success && <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}><p style={{color:"#15803d",margin:0,fontSize:"13px"}}>✅ Message sent! We will get back to you soon.</p></div>}
            {error && <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}><p style={{color:"#dc2626",margin:0,fontSize:"13px"}}>{error}</p></div>}
            <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
              <div><label style={{color:"#374151",fontSize:"13px",display:"block",marginBottom:"6px",fontWeight:"500"}}>Full Name *</label><input placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp} /></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                <div><label style={{color:"#374151",fontSize:"13px",display:"block",marginBottom:"6px",fontWeight:"500"}}>Email *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp} /></div>
                <div><label style={{color:"#374151",fontSize:"13px",display:"block",marginBottom:"6px",fontWeight:"500"}}>Phone</label><input type="tel" placeholder="+234..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inp} /></div>
              </div>
              <div><label style={{color:"#374151",fontSize:"13px",display:"block",marginBottom:"6px",fontWeight:"500"}}>Message *</label><textarea placeholder="How can we help you?" rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{...inp,resize:"none"}} /></div>
              <button onClick={send} disabled={loading} style={{background:"#1e40af",color:"white",border:"none",borderRadius:"10px",padding:"14px",fontSize:"14px",fontWeight:"700",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>{loading?"Sending...":"Send Message"}</button>
            </div>
          </div>
        </div>
      </div>
      <footer style={{background:"#0f172a",padding:"32px 20px",textAlign:"center"}}><p style={{color:"#475569",fontSize:"12px",margin:0}}>© 2025 CHUKWUJEKWU Real Estate. All rights reserved.</p></footer>
    </main>
  );
}
