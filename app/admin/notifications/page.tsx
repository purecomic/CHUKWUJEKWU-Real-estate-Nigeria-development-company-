"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminNotifications() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({title:"",message:""});
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("notifications").select("*").order("created_at",{ascending:false});
    setNotifs(data||[]);
    setLoading(false);
  };

  useEffect(()=>{ fetch(); },[]);

  const send = async () => {
    if(!form.title||!form.message){ setMsg("Fill in all fields"); return; }
    const { error } = await supabase.from("notifications").insert([form]);
    if(error){ setMsg("Error: "+error.message); return; }
    setMsg("Notification sent!"); setForm({title:"",message:""}); fetch();
  };

  const del = async (id:string) => {
    await supabase.from("notifications").delete().eq("id",id);
    setNotifs(prev=>prev.filter(n=>n.id!==id));
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"10px",width:"100%",boxSizing:"border-box" as any,marginBottom:"10px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a>
      <h1 style={{color:"white",margin:"4px 0 24px"}}>Notifications</h1>
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",marginBottom:"24px",border:"1px solid #334155"}}>
        <h2 style={{color:"#f97316",marginTop:0}}>Send Notification</h2>
        {msg && <p style={{color:"#4ade80"}}>{msg}</p>}
        <input style={inp} placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea style={{...inp,height:"80px"}} placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
        <button onClick={send} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",cursor:"pointer",fontWeight:"bold"}}>Send</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{display:"grid",gap:"16px"}}>
          {notifs.map(n=>(
            <div key={n.id} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>{n.title}</p>
                <p style={{color:"white",margin:0,fontSize:"14px"}}>{n.message}</p>
              </div>
              <button onClick={()=>del(n.id)} style={{background:"#7f1d1d",color:"white",border:"none",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",marginLeft:"16px"}}>Delete</button>
            </div>
          ))}
          {notifs.length===0 && <p style={{color:"#64748b"}}>No notifications yet.</p>}
        </div>
      )}
    </div>
  );
}
