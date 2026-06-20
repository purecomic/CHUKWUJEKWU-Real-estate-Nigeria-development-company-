"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if(!email||!password){ setError("Enter email and password"); return; }
    setLoading(true); setError("");
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if(err){ setError(err.message); return; }
    router.push("/admin");
  };

  const inp = {background:"#f8fafc",color:"#0f172a",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"12px 14px",fontSize:"14px",outline:"none",width:"100%",boxSizing:"border-box" as const};

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"linear-gradient(135deg,#eff6ff,#dbeafe)",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"380px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <a href="/" style={{display:"inline-flex",alignItems:"center",gap:"8px",textDecoration:"none",marginBottom:"24px"}}>
            <div style={{width:"40px",height:"40px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"white",fontWeight:"900",fontSize:"18px"}}>C</span>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{color:"#1e40af",fontWeight:"800",fontSize:"14px",margin:0}}>CHUKWUJEKWU</p>
              <p style={{color:"#94a3b8",fontSize:"11px",margin:0}}>REAL ESTATE</p>
            </div>
          </a>
          <h1 style={{color:"#0f172a",fontSize:"22px",fontWeight:"800",margin:"0 0 4px"}}>Admin Login</h1>
          <p style={{color:"#64748b",fontSize:"13px",margin:0}}>Sign in to your admin panel</p>
        </div>
        <div style={{background:"white",borderRadius:"20px",padding:"28px",boxShadow:"0 4px 24px rgba(30,64,175,0.08)",border:"1px solid #e2e8f0"}}>
          {error && <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:"10px",padding:"10px 14px",marginBottom:"16px"}}><p style={{color:"#dc2626",margin:0,fontSize:"13px"}}>{error}</p></div>}
          <div style={{marginBottom:"14px"}}>
            <label style={{color:"#374151",fontSize:"12px",display:"block",marginBottom:"6px",fontWeight:"600"}}>Email Address</label>
            <input type="email" placeholder="admin@example.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={inp} />
          </div>
          <div style={{marginBottom:"20px"}}>
            <label style={{color:"#374151",fontSize:"12px",display:"block",marginBottom:"6px",fontWeight:"600"}}>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={inp} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{background:"#1e40af",color:"white",border:"none",borderRadius:"10px",padding:"13px",fontSize:"14px",fontWeight:"700",cursor:loading?"not-allowed":"pointer",width:"100%",opacity:loading?0.7:1}}>
            {loading?"Signing in...":"Sign In"}
          </button>
          <p style={{color:"#94a3b8",fontSize:"12px",textAlign:"center",margin:"16px 0 0"}}>Admin access only</p>
        </div>
        <p style={{textAlign:"center",marginTop:"20px"}}><a href="/" style={{color:"#2563eb",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>← Back to website</a></p>
      </div>
    </main>
  );
}
