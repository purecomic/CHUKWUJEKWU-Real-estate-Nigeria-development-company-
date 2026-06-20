import Link from "next/link";

export default function Home() {
  return (
    <main style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#ffffff",scrollBehavior:"smooth"}}>

      {/* Navbar */}
      <nav style={{background:"rgba(255,255,255,0.95)",backdropFilter:"blur(10px)",borderBottom:"1px solid #e2e8f0",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{width:"32px",height:"32px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontWeight:"900",fontSize:"14px"}}>C</span>
          </div>
          <div>
            <p style={{color:"#1e40af",fontWeight:"800",fontSize:"13px",margin:0,letterSpacing:"0.5px"}}>CHUKWUJEKWU</p>
            <p style={{color:"#94a3b8",fontSize:"10px",margin:0,letterSpacing:"1px"}}>REAL ESTATE</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"24px"}}>
          <Link href="/listings" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Listings</Link>
          <Link href="/agents" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Agents</Link>
          <Link href="/contact" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Contact</Link>
          <Link href="/login" style={{background:"#1e40af",color:"white",padding:"8px 18px",borderRadius:"8px",textDecoration:"none",fontWeight:"600",fontSize:"13px"}}>Login</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:"linear-gradient(135deg,#eff6ff 0%,#dbeafe 50%,#bfdbfe 100%)",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"100px 20px 60px",paddingTop:"120px"}}>
        <div style={{maxWidth:"680px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#dbeafe",border:"1px solid #93c5fd",borderRadius:"100px",padding:"6px 16px",marginBottom:"24px"}}>
            <div style={{width:"6px",height:"6px",background:"#2563eb",borderRadius:"50%"}}></div>
            <p style={{color:"#1d4ed8",fontSize:"12px",fontWeight:"600",margin:0,letterSpacing:"1px"}}>NIGERIA PREMIER REAL ESTATE</p>
          </div>
          <h1 style={{color:"#0f172a",fontSize:"clamp(32px,7vw,60px)",fontWeight:"800",lineHeight:"1.15",marginBottom:"20px",letterSpacing:"-1px"}}>
            Find Your Perfect<br/>
            <span style={{color:"#2563eb"}}>Dream Property</span>
          </h1>
          <p style={{color:"#64748b",fontSize:"16px",marginBottom:"40px",lineHeight:"1.7"}}>
            Discover verified properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 10,000+ Nigerians.
          </p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/listings" style={{background:"#1e40af",color:"white",padding:"14px 32px",borderRadius:"10px",fontWeight:"700",textDecoration:"none",fontSize:"15px",boxShadow:"0 4px 14px rgba(30,64,175,0.3)"}}>
              Browse Properties
            </Link>
            <Link href="/contact" style={{background:"white",color:"#1e40af",padding:"14px 32px",borderRadius:"10px",fontWeight:"700",textDecoration:"none",fontSize:"15px",border:"2px solid #bfdbfe"}}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:"#1e40af",padding:"48px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"20px"}}>
          {[["5,000+","Properties Listed"],["10,000+","Happy Clients"],["200+","Verified Agents"],["15+","Years Experience"]].map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:"20px"}}>
              <p style={{color:"white",fontSize:"32px",fontWeight:"800",margin:"0 0 4px"}}>{s[0]}</p>
              <p style={{color:"#93c5fd",margin:0,fontSize:"13px",fontWeight:"500"}}>{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Types */}
      <section style={{background:"#f8fafc",padding:"72px 20px"}}>
        <div style={{maxWidth:"860px",margin:"0 auto"}}>
          <p style={{color:"#2563eb",textAlign:"center",fontWeight:"700",letterSpacing:"2px",fontSize:"11px",marginBottom:"8px"}}>CATEGORIES</p>
          <h2 style={{color:"#0f172a",fontSize:"30px",fontWeight:"800",textAlign:"center",marginBottom:"8px"}}>Browse by Type</h2>
          <p style={{color:"#94a3b8",textAlign:"center",fontSize:"14px",marginBottom:"40px"}}>Find the property type that suits your needs</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {[["Houses","🏠","Family homes & duplexes","house"],["Apartments","🏢","Modern flats & suites","apartment"],["Land","🌍","Prime plots of land","land"],["Shops","🏪","Commercial spaces","shop"]].map((p,i)=>(
              <Link key={i} href={"/listings?type="+p[3]} style={{background:"white",borderRadius:"16px",padding:"28px 20px",textAlign:"center",textDecoration:"none",display:"block",border:"1px solid #e2e8f0",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                <p style={{fontSize:"36px",margin:"0 0 10px"}}>{p[1]}</p>
                <p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 6px",fontSize:"15px"}}>{p[0]}</p>
                <p style={{color:"#94a3b8",margin:0,fontSize:"12px"}}>{p[2]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{background:"white",padding:"72px 20px"}}>
        <div style={{maxWidth:"860px",margin:"0 auto"}}>
          <p style={{color:"#2563eb",textAlign:"center",fontWeight:"700",letterSpacing:"2px",fontSize:"11px",marginBottom:"8px"}}>WHY US</p>
          <h2 style={{color:"#0f172a",fontSize:"30px",fontWeight:"800",textAlign:"center",marginBottom:"8px"}}>Why Choose Us</h2>
          <p style={{color:"#94a3b8",textAlign:"center",fontSize:"14px",marginBottom:"40px"}}>We make finding your dream property simple and safe</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {[["✅","Verified","All properties verified & certified"],["🔒","Secure","Safe and transparent transactions"],["⚡","Fast","Quick deals with expert guidance"],["🤝","Trusted","10k+ satisfied clients nationwide"]].map((w,i)=>(
              <div key={i} style={{background:"#f8fafc",borderRadius:"16px",padding:"24px",border:"1px solid #e2e8f0"}}>
                <p style={{fontSize:"28px",margin:"0 0 10px"}}>{w[0]}</p>
                <p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 6px",fontSize:"15px"}}>{w[1]}</p>
                <p style={{color:"#64748b",margin:0,fontSize:"13px"}}>{w[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"linear-gradient(135deg,#1e40af,#2563eb)",padding:"72px 20px",textAlign:"center"}}>
        <div style={{maxWidth:"500px",margin:"0 auto"}}>
          <h2 style={{color:"white",fontSize:"28px",fontWeight:"800",marginBottom:"12px"}}>Ready to Find Your Dream Property?</h2>
          <p style={{color:"#bfdbfe",marginBottom:"32px",fontSize:"15px",lineHeight:"1.6"}}>Talk to our expert agents today and get started</p>
          <Link href="/contact" style={{background:"white",color:"#1e40af",padding:"14px 36px",borderRadius:"10px",fontWeight:"700",textDecoration:"none",fontSize:"15px",boxShadow:"0 4px 14px rgba(0,0,0,0.15)"}}>
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:"#0f172a",borderTop:"1px solid #1e293b",padding:"40px 20px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"12px"}}>
          <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontWeight:"900",fontSize:"12px"}}>C</span>
          </div>
          <p style={{color:"white",fontWeight:"800",fontSize:"15px",margin:0}}>CHUKWUJEKWU Real Estate</p>
        </div>
        <p style={{color:"#475569",fontSize:"13px",marginBottom:"4px"}}>Nigeria Development Company</p>
        <p style={{color:"#334155",fontSize:"12px",marginBottom:"4px"}}>15 Broad Street, Lagos Island, Lagos Nigeria</p>
        <p style={{color:"#334155",fontSize:"12px",margin:0}}>© 2025 All rights reserved</p>
      </footer>

    </main>
  );
}
