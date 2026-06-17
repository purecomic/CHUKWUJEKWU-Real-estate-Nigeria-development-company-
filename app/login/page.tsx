"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) { setError("Enter email and password"); return; }
    setLoading(true);
    setError("");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    router.push("/admin");
  };

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <h1 style={{color:"#f97316",fontSize:"28px",fontWeight:"900"}}>CHUKWUJEKWU RE</h1>
          <p style={{color:"#6b7280"}}>Sign in to Admin Panel</p>
        </div>
        <div style={{background:"#1f2937",borderRadius:"20px",padding:"32px",border:"1px solid #374151"}}>
          {error && <p style={{color:"#ef4444"}}>{error}</p>}
          <div>
            <label style={{color:"#9ca3af",display:"block",marginBottom:"8px"}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",width:"100%",boxSizing:"border-box"}} />
          </div>
          <div style={{marginTop:"16px"}}>
            <label style={{color:"#9ca3af",display:"block",marginBottom:"8px"}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",width:"100%",boxSizing:"border-box"}} />
          </div>
          <button onClick={handleLogin} disabled={loading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"12px",padding:"16px",fontSize:"16px",fontWeight:"bold",cursor:"pointer",marginTop:"24px",width:"100%"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <p style={{textAlign:"center",marginTop:"20px"}}><a href="/" style={{color:"#f97316",textDecoration:"none"}}>Back to website</a></p>
      </div>
    </main>
  );
}
