"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminAgents() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"",email:"",phone:"",specialty:"",image_url:""});
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("agents").select("*").order("created_at",{ascending:false});
    setAgents(data||[]);
    setLoading(false);
  };

  useEffect(()=>{ fetch(); },[]);

  const save = async () => {
    const { error } = await supabase.from("agents").insert([form]);
    if(error){ setMsg("Error: "+error.message); return; }
    setMsg("Agent added!"); setShowForm(false); setForm({name:"",email:"",phone:"",specialty:"",image_url:""}); fetch();
  };

  const del = async (id:string) => {
    if(!confirm("Delete this agent?")) return;
    await supabase.from("agents").delete().eq("id",id);
    fetch();
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"10px",width:"100%",boxSizing:"border-box" as any,marginBottom:"10px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
        <div><a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a><h1 style={{color:"white",margin:"4px 0 0"}}>Agents</h1></div>
        <button onClick={()=>setShowForm(!showForm)} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"10px 20px",cursor:"pointer",fontWeight:"bold"}}>+ Add Agent</button>
      </div>
      {msg && <p style={{color:"#4ade80",marginBottom:"16px"}}>{msg}</p>}
      {showForm && (
        <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",marginBottom:"24px",border:"1px solid #334155"}}>
          <h2 style={{color:"#f97316",marginTop:0}}>New Agent</h2>
          <input style={inp} placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input style={inp} placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} />
          <input style={inp} placeholder="Photo URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={save} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",cursor:"pointer",fontWeight:"bold"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#374151",color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}
      {loading ? <p>Loading...</p> : (
        <div style={{display:"grid",gap:"16px"}}>
          {agents.map(a=>(
            <div key={a.id} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>{a.name}</p>
                <p style={{color:"#94a3b8",margin:"0 0 4px",fontSize:"14px"}}>{a.email} · {a.phone}</p>
                <p style={{color:"#64748b",margin:0,fontSize:"13px"}}>{a.specialty}</p>
              </div>
              <button onClick={()=>del(a.id)} style={{background:"#7f1d1d",color:"white",border:"none",borderRadius:"8px",padding:"8px 16px",cursor:"pointer"}}>Delete</button>
            </div>
          ))}
          {agents.length===0 && <p style={{color:"#64748b"}}>No agents yet.</p>}
        </div>
      )}
    </div>
  );
}
