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

  const contacts = [
    {e:"📞",t:"Call Us",v:"+234 800 000 0000",h:"tel:+2348000000000"},
    {e:"💬",t:"WhatsApp",v:"+234 800 000 0000",h:"https://wa.me/2348000000000"},
    {e:"✉️",t:"Email",v:"info@chukwujekwu.com",h:"mailto:info@chukwujekwu.com"},
    {e:"📍",t:"Office",v:"15 Broad Street, Lagos",h:"#"},
  ];

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box" as any};

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="/listings" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Listings</a>
          <a href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</a>
        </div>
      </nav>
      <div style={{background:"#ea580c",padding:"40px 20px",textAlign:"center"}}>
        <h1 style={{color:"white",fontSize:"32px",fontWeight:"bold",margin:"0 0 8px"}}>Contact Us</h1>
        <p style={{color:"#fed7aa",margin:0}}>We are here to help you find your perfect property</p>
      </div>
      <div style={{maxWidth:"700px",margin:"0 auto",padding:"24px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"24px"}}>
          {contacts.map((c,i)=>(
            <a key={i} href={c.h} style={{background:"#1f2937",borderRadius:"16px",padding:"20px",textDecoration:"none",display:"block",textAlign:"center",border:"1px solid #374151"}}>
              <p style={{fontSize:"32px",margin:"0 0 8px"}}>{c.e}</p>
              <p style={{color:"white",fontWeight:"bold",margin:"0 0 4px",fontSize:"14px"}}>{c.t}</p>
              <p style={{color:"#9ca3af",margin:0,fontSize:"13px"}}>{c.v}</p>
            </a>
          ))}
        </div>
        <div style={{background:"#1f2937",borderRadius:"16px",padding:"24px",border:"1px solid #374151"}}>
          <h2 style={{color:"white",fontSize:"20px",fontWeight:"bold",marginBottom:"20px"}}>Send us a Message</h2>
          {success && <div style={{background:"#14532d",border:"1px solid #16a34a",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}><p style={{color:"#4ade80",margin:0}}>✅ Message sent! We will get back to you soon.</p></div>}
          {error && <div style={{background:"#450a0a",border:"1px solid #ef4444",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}><p style={{color:"#ef4444",margin:0}}>{error}</p></div>}
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div>
              <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Full Name *</label>
              <input placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp} />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Email *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp} />
              </div>
              <div>
                <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Phone</label>
                <input type="tel" placeholder="+234..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inp} />
              </div>
            </div>
            <div>
              <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Message *</label>
              <textarea placeholder="How can we help you?" rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{...inp,resize:"none"}} />
            </div>
            <button onClick={send} disabled={loading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"12px",padding:"16px",fontSize:"16px",fontWeight:"bold",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
      <footer style={{background:"#030712",padding:"24px",textAlign:"center",marginTop:"40px"}}>
        <p style={{color:"#374151",fontSize:"12px",margin:0}}>2025 All rights reserved</p>
      </footer>
    </main>
  );
}
