import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="/listings" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Listings</a>
          <a href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</a>
        </div>
      </nav>

      <div style={{background:"#ea580c",padding:"40px 20px",textAlign:"center"}}>
        <h1 style={{color:"white",fontSize:"32px",fontWeight:"bold",margin:"0 0 8px"}}>Contact Us</h1>
        <p style={{color:"#fed7aa",margin:0}}>We are here to help you find your perfect property</p>
      </div>

      <div style={{maxWidth:"700px",margin:"0 auto",padding:"24px 20px"}}>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"24px"}}>
          {[
            {e:"📞",t:"Call Us",v:"+234 800 000 0000",h:"tel:+2348000000000"},
            {e:"💬",t:"WhatsApp",v:"+234 800 000 0000",h:"https://wa.me/2348000000000"},
            {e:"✉️",t:"Email",v:"info@chukwujekwu.com",h:"mailto:info@chukwujekwu.com"},
            {e:"📍",t:"Office",v:"15 Broad Street, Lagos",h:"#"},
          ].map((c,i)=>(
            <a key={i} href={c.h} style={{background:"#1f2937",borderRadius:"16px",padding:"20px",textDecoration:"none",display:"block",textAlign:"center",border:"1px solid #374151"}}>
              <p style={{fontSize:"32px",margin:"0 0 8px"}}>{c.e}</p>
              <p style={{color:"#f97316",fontWeight:"bold",fontSize:"13px",margin:"0 0 4px"}}>{c.t}</p>
              <p style={{color:"#9ca3af",fontSize:"12px",margin:0}}>{c.v}</p>
            </a>
          ))}
        </div>

        <div style={{background:"#1f2937",borderRadius:"16px",padding:"24px"}}>
          <h2 style={{color:"white",fontSize:"20px",fontWeight:"bold",marginBottom:"20px"}}>Send us a Message</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div>
              <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Full Name *</label>
              <input placeholder="Your full name" style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              <div>
                <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Email *</label>
                <input type="email" placeholder="your@email.com" style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Phone</label>
                <input type="tel" placeholder="+234..." style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
              </div>
            </div>
            <div>
              <label style={{color:"#9ca3af",fontSize:"13px",display:"block",marginBottom:"6px"}}>Message *</label>
              <textarea placeholder="How can we help you?" rows={5} style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"14px",fontSize:"15px",resize:"none",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            </div>
            <button style={{background:"#ea580c",color:"white",border:"none",borderRadius:"12px",padding:"16px",fontSize:"16px",fontWeight:"bold",cursor:"pointer"}}>
              Send Message
            </button>
          </div>
        </div>

      </div>

      <footer style={{background:"#030712",padding:"24px",textAlign:"center",marginTop:"40px"}}>
        <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#374151",fontSize:"12px",margin:0}}>2025 All rights reserved</p>
      </footer>
    </main>
  );
}
