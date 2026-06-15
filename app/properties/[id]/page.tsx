import Link from "next/link";

const props: Record<string,any> = {
  "1":{title:"4-Bedroom Duplex in Lekki Phase 1",price:"180,000,000",location:"Lagos",type:"House",listing:"Sale",beds:4,baths:4,emoji:"🏠",desc:"A stunning modern duplex with swimming pool in Lekki Phase 1.",phone:"2348012345678",agent:"Emeka Okafor",email:"emeka@chukwujekwu.com"},
  "2":{title:"3-Bedroom Apartment in Maitama",price:"6,500,000/yr",location:"Abuja",type:"Apartment",listing:"Rent",beds:3,baths:3,emoji:"🏢",desc:"Fully serviced luxury apartment with 24hr power in Maitama.",phone:"2348023456789",agent:"Amina Bello",email:"amina@chukwujekwu.com"},
  "3":{title:"2 Plots of Land in Trans Amadi",price:"95,000,000",location:"Rivers",type:"Land",listing:"Sale",beds:0,baths:0,emoji:"🌍",desc:"Commercial land with C of O in Trans Amadi Industrial Layout.",phone:"2348034567890",agent:"Chidi Nwosu",email:"chidi@chukwujekwu.com"},
  "4":{title:"Shop Near Ikeja City Mall",price:"2,800,000/yr",location:"Lagos",type:"Shop",listing:"Rent",beds:0,baths:0,emoji:"🏪",desc:"60sqm retail shop in busy commercial plaza near Ikeja City Mall.",phone:"2348012345678",agent:"Emeka Okafor",email:"emeka@chukwujekwu.com"},
  "5":{title:"2-Bedroom Flat in Bodija Estate",price:"1,200,000/yr",location:"Oyo",type:"Apartment",listing:"Rent",beds:2,baths:2,emoji:"🏢",desc:"Well maintained 2 bedroom flat with private garden in Bodija.",phone:"2348023456789",agent:"Amina Bello",email:"amina@chukwujekwu.com"},
  "6":{title:"Corner Plot in Asokoro Extension",price:"55,000,000",location:"Abuja",type:"Land",listing:"Sale",beds:0,baths:0,emoji:"🌍",desc:"Rare corner piece plot in Asokoro. All papers intact.",phone:"2348034567890",agent:"Chidi Nwosu",email:"chidi@chukwujekwu.com"},
};

export default function Page({params}:{params:{id:string}}) {
  const p = props[params.id];
  if(!p) return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"16px"}}>
      <p style={{color:"white",fontSize:"24px"}}>Property not found</p>
      <a href="/listings" style={{color:"#f97316"}}>Back to Listings</a>
    </div>
  );
  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <a href="/listings" style={{color:"#9ca3af",textDecoration:"none",fontSize:"14px"}}>Back to Listings</a>
      </nav>
      <div style={{maxWidth:"700px",margin:"0 auto",padding:"20px"}}>
        <div style={{background:"linear-gradient(135deg,#1c0a00,#111827)",borderRadius:"20px",height:"200px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"80px",marginBottom:"16px",position:"relative"}}>
          {p.emoji}
          <span style={{position:"absolute",top:"12px",left:"12px",background:p.listing==="Sale"?"#ea580c":"#16a34a",color:"white",padding:"5px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"bold"}}>For {p.listing}</span>
          <span style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.7)",color:"white",padding:"5px 12px",borderRadius:"20px",fontSize:"12px"}}>{p.type}</span>
        </div>
        <div style={{background:"#1f2937",borderRadius:"16px",padding:"18px",marginBottom:"14px"}}>
          <p style={{color:"#f97316",fontSize:"24px",fontWeight:"900",margin:"0 0 6px"}}>N{p.price}</p>
          <h1 style={{color:"white",fontSize:"20px",fontWeight:"bold",margin:"0 0 8px"}}>{p.title}</h1>
          <p style={{color:"#6b7280",margin:"0 0 12px"}}>Location: {p.location}</p>
          {p.beds>0&&<div style={{display:"flex",gap:"16px",borderTop:"1px solid #374151",paddingTop:"12px"}}><span style={{color:"#9ca3af"}}>Beds: {p.beds}</span><span style={{color:"#9ca3af"}}>Baths: {p.baths}</span></div>}
        </div>
        <div style={{background:"#1f2937",borderRadius:"16px",padding:"18px",marginBottom:"14px"}}>
          <h2 style={{color:"white",fontWeight:"bold",marginBottom:"10px"}}>Description</h2>
          <p style={{color:"#9ca3af",lineHeight:"1.7",margin:0}}>{p.desc}</p>
        </div>
        <div style={{background:"#1f2937",borderRadius:"16px",padding:"18px",marginBottom:"14px"}}>
          <h2 style={{color:"white",fontWeight:"bold",marginBottom:"14px"}}>Contact Agent</h2>
          <p style={{color:"white",fontWeight:"bold",marginBottom:"14px"}}>{p.agent}</p>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <a href={"tel:+"+p.phone} style={{background:"#ea580c",color:"white",padding:"14px",borderRadius:"12px",textDecoration:"none",fontWeight:"bold",textAlign:"center",display:"block"}}>Call Agent</a>
            <a href={"https://wa.me/"+p.phone} target="_blank" style={{background:"#16a34a",color:"white",padding:"14px",borderRadius:"12px",textDecoration:"none",fontWeight:"bold",textAlign:"center",display:"block"}}>WhatsApp Agent</a>
            <a href={"mailto:"+p.email} style={{background:"#111827",color:"white",padding:"14px",borderRadius:"12px",textDecoration:"none",fontWeight:"bold",textAlign:"center",display:"block",border:"1px solid #374151"}}>Email Agent</a>
          </div>
        </div>
        <div style={{background:"#1f2937",borderRadius:"16px",padding:"18px",marginBottom:"24px"}}>
          <h2 style={{color:"white",fontWeight:"bold",marginBottom:"14px"}}>Send Inquiry</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <input placeholder="Full Name" style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"13px",fontSize:"15px",outline:"none"}}/>
            <input placeholder="Email" type="email" style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"13px",fontSize:"15px",outline:"none"}}/>
            <input placeholder="Phone" type="tel" style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"13px",fontSize:"15px",outline:"none"}}/>
            <textarea placeholder="Message..." rows={3} style={{background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"13px",fontSize:"15px",resize:"none",outline:"none"}}/>
            <button style={{background:"#ea580c",color:"white",border:"none",borderRadius:"12px",padding:"15px",fontSize:"15px",fontWeight:"bold",cursor:"pointer"}}>Send Inquiry</button>
            <button style={{background:"transparent",color:"#f97316",border:"2px solid #ea580c",borderRadius:"12px",padding:"15px",fontSize:"15px",fontWeight:"bold",cursor:"pointer"}}>Request Inspection</button>
          </div>
        </div>
      </div>
      <footer style={{background:"#030712",padding:"24px",textAlign:"center"}}>
        <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#374151",fontSize:"12px",margin:0}}>2025 All rights reserved</p>
      </footer>
    </main>
  );
}
