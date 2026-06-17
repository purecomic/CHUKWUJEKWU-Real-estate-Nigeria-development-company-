"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminUsers() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from("users").select("*").order("created_at",{ascending:false});
      setUsers(data||[]);
      setLoading(false);
    };
    fetch();
  },[]);

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a>
      <h1 style={{color:"white",margin:"4px 0 24px"}}>Users</h1>
      {loading ? <p>Loading...</p> : (
        <div style={{display:"grid",gap:"16px"}}>
          {users.map(u=>(
            <div key={u.id} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155"}}>
              <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>{u.email||u.name||"Unknown"}</p>
              <p style={{color:"#94a3b8",margin:0,fontSize:"14px"}}>Joined: {new Date(u.created_at).toLocaleDateString()}</p>
            </div>
          ))}
          {users.length===0 && <p style={{color:"#64748b"}}>No users found.</p>}
        </div>
      )}
    </div>
  );
}
