"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminCommission() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [rate, setRate] = useState("10");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(()=>{
    const load = async () => {
      const { data: cfg } = await supabase.from("settings").select("value").eq("key","commission_rate").single();
      if(cfg) setRate(cfg.value);
      const { data: props } = await supabase.from("properties").select("id,title,price").order("created_at",{ascending:false});
      setProperties(props||[]);
    };
    load();
  },[]);

  const save = async () => {
    setLoading(true);
    const { error } = await supabase.from("settings").upsert([{key:"commission_rate",value:rate}],{onConflict:"key"});
    setLoading(false);
    if(error){ setMsg("Error: "+error.message); return; }
    setMsg("Commission updated to "+rate+"%!");
    setTimeout(()=>setMsg(""),3000);
  };

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin/settings" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back to Settings</a>
      <h1 style={{color:"white",margin:"8px 0 4px"}}>Commission Settings</h1>
      <p style={{color:"#64748b",marginBottom:"24px"}}>Set the agent commission rate shown on all property listings</p>
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",border:"1px solid #334155",maxWidth:"400px",marginBottom:"32px"}}>
        <label style={{color:"#9ca3af",display:"block",marginBottom:"8px",fontSize:"14px"}}>Commission Rate (%)</label>
        <div style={{display:"flex",gap:"12px",alignItems:"center",marginBottom:"16px"}}>
          <input type="number" min="0" max="100" value={rate} onChange={e=>setRate(e.target.value)} style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"12px",fontSize:"32px",fontWeight:"bold",width:"100px",textAlign:"center"}} />
          <span style={{color:"#f97316",fontSize:"32px",fontWeight:"bold"}}>%</span>
        </div>
        {msg && <p style={{color:"#4ade80",margin:"0 0 12px"}}>{msg}</p>}
        <button onClick={save} disabled={loading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"12px 32px",cursor:"pointer",fontWeight:"bold",fontSize:"16px"}}>
          {loading ? "Saving..." : "Update Commission"}
        </button>
      </div>
      <h2 style={{color:"white",margin:"0 0 16px"}}>Commission Preview ({rate}%)</h2>
      <div style={{display:"grid",gap:"12px",maxWidth:"600px"}}>
        {properties.map(p=>(
          <div key={p.id} style={{background:"#1e293b",borderRadius:"12px",padding:"16px 20px",border:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <p style={{color:"white",margin:0,fontWeight:"bold"}}>{p.title}</p>
            <div style={{textAlign:"right"}}>
              <p style={{color:"#64748b",margin:"0 0 2px",fontSize:"13px"}}>₦{Number(p.price).toLocaleString()}</p>
              <p style={{color:"#4ade80",margin:0,fontWeight:"bold",fontSize:"14px"}}>Agent earns: ₦{((Number(rate)/100)*Number(p.price)).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {properties.length===0 && <p style={{color:"#64748b"}}>No properties yet.</p>}
      </div>
    </div>
  );
}
