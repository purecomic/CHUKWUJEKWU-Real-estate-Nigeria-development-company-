import Link from "next/link";

export default function ListingsPage() {
  const properties = [
    {id:"1",title:"4-Bedroom Duplex in Lekki Phase 1",price:"180,000,000",location:"Lagos",type:"House",listing:"Sale",beds:4,baths:4,emoji:"🏠"},
    {id:"2",title:"3-Bedroom Apartment in Maitama",price:"6,500,000/yr",location:"Abuja",type:"Apartment",listing:"Rent",beds:3,baths:3,emoji:"🏢"},
    {id:"3",title:"2 Plots of Land in Trans Amadi",price:"95,000,000",location:"Rivers",type:"Land",listing:"Sale",beds:0,baths:0,emoji:"🌍"},
    {id:"4",title:"Shop Space Near Ikeja City Mall",price:"2,800,000/yr",location:"Lagos",type:"Shop",listing:"Rent",beds:0,baths:0,emoji:"🏪"},
    {id:"5",title:"2-Bedroom Flat in Bodija Estate",price:"1,200,000/yr",location:"Oyo",type:"Apartment",listing:"Rent",beds:2,baths:2,emoji:"🏢"},
    {id:"6",title:"Corner Piece Plot in Asokoro",price:"55,000,000",location:"Abuja",type:"Land",listing:"Sale",beds:0,baths:0,emoji:"🌍"},
  ];

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      
      {/* Navbar */}
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <Link href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</Link>
        <div style={{display:"flex",gap:"16px"}}>
          <Link href="/listings" style={{color:"#f97316",textDecoration:"none",fontSize:"14px",fontWeight:"bold"}}>Listings</Link>
          <Link href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</Link>
          <Link href="/contact" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Contact</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{background:"#111827",padding:"40px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <h1 style={{color:"white",fontSize:"28px",fontWeight:"bold",marginBottom:"20px"}}>Property Listings</h1>
          
          {/* Filters */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            <select style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option>All Locations</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Rivers</option>
              <option>Oyo</option>
            </select>
            <select style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option>All Types</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Land</option>
              <option>Shop</option>
            </select>
            <select style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option>Sale & Rent</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <button style={{background:"#ea580c",color:"white",border:"none",borderRadius:"10px",padding:"12px",fontSize:"14px",fontWeight:"bold",cursor:"pointer"}}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div style={{maxWidth:"800px",margin:"0 auto",padding:"24px 20px"}}>
        <p style={{color:"#6b7280",fontSize:"14px",marginBottom:"20px"}}>{properties.length} properties found</p>
        <div style={{display:"grid",gap:"16px"}}>
          {properties.map(p => (
            <Link key={p.id} href={"/properties/"+p.id} style={{textDecoration:"none",display:"block"}}>
              <div style={{background:"#1f2937",borderRadius:"16px",overflow:"hidden",border:"1px solid #374151"}}>
                {/* Image placeholder */}
                <div style={{background:"linear-gradient(135deg,#1c0a00,#111827)",height:"180px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"64px",position:"relative"}}>
                  {p.emoji}
                  <span style={{position:"absolute",top:"12px",left:"12px",background:p.listing==="Sale"?"#ea580c":"#16a34a",color:"white",padding:"4px 10px",borderRadius:"20px",fontSize:"12px",fontWeight:"bold"}}>
                    {p.listing==="Sale"?"For Sale":"For Rent"}
                  </span>
                  <span style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.7)",color:"white",padding:"4px 10px",borderRadius:"20px",fontSize:"12px"}}>
                    {p.type}
                  </span>
                </div>
                {/* Info */}
                <div style={{padding:"16px"}}>
                  <p style={{color:"#f97316",fontSize:"20px",fontWeight:"900",margin:"0 0 6px"}}>₦{p.price}</p>
                  <p style={{color:"white",fontSize:"16px",fontWeight:"bold",margin:"0 0 8px"}}>{p.title}</p>
                  <p style={{color:"#6b7280",fontSize:"14px",margin:"0 0 12px"}}>📍 {p.location}</p>
                  {p.beds > 0 && (
                    <div style={{display:"flex",gap:"16px",borderTop:"1px solid #374151",paddingTop:"12px"}}>
                      <span style={{color:"#9ca3af",fontSize:"13px"}}>🛏 {p.beds} Beds</span>
                      <span style={{color:"#9ca3af",fontSize:"13px"}}>🚿 {p.baths} Baths</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:"#030712",padding:"30px 20px",textAlign:"center",marginTop:"40px"}}>
        <p style={{color:"#f97316",fontWeight:"bold",marginBottom:"4px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#374151",fontSize:"12px"}}>© 2025 All rights reserved</p>
      </footer>
    </main>
  );
}
