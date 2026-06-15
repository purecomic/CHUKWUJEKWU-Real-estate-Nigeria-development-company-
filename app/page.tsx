import Link from "next/link";

export default function Home() {
  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#0a0a0a"}}>

      {/* Navbar */}
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{color:"#f97316",fontWeight:"900",fontSize:"18px"}}>
          CHUKWUJEKWU <span style={{color:"white",fontSize:"14px"}}>RE</span>
        </div>
        <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
          <Link href="/listings" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Listings</Link>
          <Link href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</Link>
          <Link href="/contact" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Contact</Link>
          <Link href="/login" style={{background:"#ea580c",color:"white",padding:"8px 16px",borderRadius:"8px",textDecoration:"none",fontWeight:"bold",fontSize:"14px"}}>Login</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:"linear-gradient(135deg,#0a0a0a,#1c0a00)",minHeight:"90vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 20px"}}>
        <div style={{maxWidth:"600px"}}>
          <p style={{color:"#f97316",fontWeight:"600",letterSpacing:"4px",fontSize:"12px",marginBottom:"16px"}}>NIGERIA PREMIER REAL ESTATE</p>
          <h1 style={{color:"white",fontSize:"clamp(32px,8vw,64px)",fontWeight:"900",lineHeight:"1.1",marginBottom:"20px"}}>
            Find Your Perfect<br/>
            <span style={{color:"#f97316"}}>Property</span>
          </h1>
          <p style={{color:"#9ca3af",fontSize:"16px",marginBottom:"40px",lineHeight:"1.6"}}>
            Discover verified properties across Lagos, Abuja, Port Harcourt and beyond. Trusted by 10,000+ Nigerians.
          </p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/listings" style={{background:"#ea580c",color:"white",padding:"14px 28px",borderRadius:"12px",fontWeight:"bold",textDecoration:"none",fontSize:"16px"}}>
              Browse Properties
            </Link>
            <Link href="/contact" style={{border:"2px solid #ea580c",color:"#f97316",padding:"14px 28px",borderRadius:"12px",fontWeight:"bold",textDecoration:"none",fontSize:"16px"}}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:"#111827",padding:"60px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"20px"}}>
          {[["5,000+","Properties"],["10,000+","Happy Clients"],["200+","Agents"],["15+","Years Exp"]].map((s,i)=>(
            <div key={i} style={{background:"#1f2937",borderRadius:"16px",padding:"28px",textAlign:"center"}}>
              <p style={{color:"#f97316",fontSize:"32px",fontWeight:"900",margin:"0 0 6px"}}>{s[0]}</p>
              <p style={{color:"#9ca3af",margin:0,fontSize:"14px"}}>{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Types */}
      <section style={{background:"#0a0a0a",padding:"60px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <p style={{color:"#f97316",textAlign:"center",fontWeight:"600",letterSpacing:"3px",fontSize:"12px",marginBottom:"12px"}}>CATEGORIES</p>
          <h2 style={{color:"white",fontSize:"32px",fontWeight:"bold",textAlign:"center",marginBottom:"36px"}}>Browse by Type</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {[["Houses","🏠","Family homes & duplexes","house"],["Apartments","🏢","Modern flats","apartment"],["Land","🌍","Prime plots of land","land"],["Shops","🏪","Commercial spaces","shop"]].map((p,i)=>(
              <Link key={i} href={"/listings?type="+p[3]} style={{background:"#1f2937",borderRadius:"16px",padding:"28px 20px",textAlign:"center",textDecoration:"none",display:"block",border:"1px solid #374151"}}>
                <p style={{fontSize:"40px",margin:"0 0 10px"}}>{p[1]}</p>
                <p style={{color:"white",fontWeight:"bold",fontSize:"18px",margin:"0 0 6px"}}>{p[0]}</p>
                <p style={{color:"#6b7280",margin:0,fontSize:"13px"}}>{p[2]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{background:"#111827",padding:"60px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <h2 style={{color:"white",fontSize:"32px",fontWeight:"bold",textAlign:"center",marginBottom:"36px"}}>Why Choose Us</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {[["✅","Verified","All properties verified"],["🔒","Secure","Safe transactions"],["⚡","Fast","Quick deals"],["🤝","Trusted","10k+ satisfied clients"]].map((w,i)=>(
              <div key={i} style={{background:"#1f2937",borderRadius:"16px",padding:"24px",textAlign:"center"}}>
                <p style={{fontSize:"32px",margin:"0 0 10px"}}>{w[0]}</p>
                <p style={{color:"white",fontWeight:"bold",margin:"0 0 6px"}}>{w[1]}</p>
                <p style={{color:"#6b7280",fontSize:"13px",margin:0}}>{w[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{background:"#ea580c",padding:"60px 20px",textAlign:"center"}}>
        <h2 style={{color:"white",fontSize:"28px",fontWeight:"bold",marginBottom:"16px"}}>Ready to Find Your Dream Property?</h2>
        <p style={{color:"#fed7aa",marginBottom:"32px"}}>Talk to our expert agents today</p>
        <Link href="/contact" style={{background:"white",color:"#ea580c",padding:"14px 32px",borderRadius:"12px",fontWeight:"bold",textDecoration:"none",fontSize:"16px"}}>
          Get In Touch
        </Link>
      </section>

      {/* Footer */}
      <footer style={{background:"#030712",borderTop:"1px solid #1f2937",padding:"40px 20px",textAlign:"center"}}>
        <p style={{color:"#f97316",fontWeight:"bold",fontSize:"18px",marginBottom:"8px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#6b7280",fontSize:"14px",marginBottom:"8px"}}>Nigeria Development Company</p>
        <p style={{color:"#374151",fontSize:"12px"}}>15 Broad Street, Lagos Island, Lagos Nigeria</p>
        <p style={{color:"#374151",fontSize:"12px",marginTop:"16px"}}>© 2025 All rights reserved</p>
      </footer>

    </main>
  );
}
