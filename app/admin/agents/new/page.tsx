"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function NewAgent() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const router = useRouter();
  const [form, setForm] = useState({name:"",email:"",phone:"",specialty:"",image_url:""});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if(!form.name||!form.email){ setMsg("Name and email are required"); return; }
    setLoading(true);
    const { error } = await supabase.from("agents").insert([form]);
    setLoading(false);
    if(error){ setMsg("Error: "+error.message); return; }
    router.push("/admin/agents");
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"12px",width:"100%",boxSizing:"border-box" as any,marginBottom:"12px",fontSize:"15px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin/agents" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back to Agents</a>
      <h1 style={{color:"white",margin:"8px 0 24px"}}>Add New Agent</h1>
      {msg && <p style={{color:"#ef4444",marginBottom:"16px"}}>{msg}</p>}
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",border:"1px solid #334155",maxWidth:"600px"}}>
        <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input style={inp} placeholder="Email *" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input style={inp} placeholder="Specialty (e.g. Residential, Commercial...)" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} />
        <input style={inp} placeholder="Photo URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
        <div style={{display:"flex",gap:"12px",marginTop:"8px"}}>
          <button onClick={save} disabled={loading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"12px 32px",cursor:"pointer",fontWeight:"bold",fontSize:"16px"}}>
            {loading ? "Saving..." : "Save Agent"}
          </button>
          <button onClick={()=>router.push("/admin/agents")} style={{background:"#374151",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
