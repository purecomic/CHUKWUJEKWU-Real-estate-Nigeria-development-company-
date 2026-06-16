"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

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
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    router.push("/admin");
  };

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <h1 style={{color:"#f97316",fontSize:"28px",fontWeight:"900",margin:"0 0 8px"}}>CHUKWUJEKWU RE</h1>
          <p style={{color:"#6b7280",margin:0}}>Sign in to Admin Panel</p>
        </div>
        <div style={{background:"#1f2937",borderRadius:"20px",padding:"32px",border:"1px solid #374151"}}>
          {error && (
            <div style={{background:"#450a0a",border:"1px solid #ef4444",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}>
              <p style={{color:"#ef4444",margin:0,fontSize:"14px"}}>{error}</p>
            </div>
          )}
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            <div>
              <label style={{color:"#9ca3af",fontSize:"14px",display:"block",marginBottom:"8px"}}>Email Address</label>
              <input
                type="email"
                placeholder="admin@bigearn.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box"}}
              />
            </div>
            <div>
              <label style={{color:"#9ca3af",fontSize:"14px",display:"block",marginBottom:"8px"}}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box"}}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{background:loading?"#9a3412":"#ea580c",color:"white",border:"none",borderRadius:"12px",padding:"16px",fontSize:"16px",fontWeight:"bold",cursor:loading?"not-allowed":"pointer",marginTop:"8px"}}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <p style={{color:"#6b7280",fontSize:"13px",textAlign:"center",marginTop:"20px",marginBottom:0}}>
            Admin access only
          </p>
        </div>
        <p style={{textAlign:"center",marginTop:"20px"}}>
          <a href="/" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>Back to website</a>
        </p>
      </div>
    </main>
  );
}
