"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminInquiries() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from("inquiries").select("*").order("created_at",{ascending:false});
      setInquiries(data||[]);
      setLoading(false);
    };
    fetch();
  },[]);

  const del = async (id:string) => {
    if(!confirm("Delete this inquiry?")) return;
    await supabase.from("inquiries").delete().eq("id",id);
    setInquiries(prev=>prev.filter(i=>i.id!==id));
  };

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a>
      <h1 style={{color:"white",margin:"4px 0 24px"}}>Inquiries</h1>
      {loading ? <p>Loading...</p> : (
        <div style={{display:"grid",gap:"16px"}}>
          {inquiries.map(i=>(
            <div key={i.id} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>{i.name}</p>
                  <p style={{color:"#94a3b8",margin:"0 0 4px",fontSize:"14px"}}>{i.email} · {i.phone}</p>
                  <p style={{color:"#64748b",margin:"0 0 8px",fontSize:"13px"}}>{i.property}</p>
                  <p style={{color:"white",margin:0,fontSize:"14px"}}>{i.message}</p>
                </div>
                <button onClick={()=>del(i.id)} style={{background:"#7f1d1d",color:"white",border:"none",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",marginLeft:"16px"}}>Delete</button>
              </div>
            </div>
          ))}
          {inquiries.length===0 && <p style={{color:"#64748b"}}>No inquiries yet.</p>}
        </div>
      )}
    </div>
  );
}
