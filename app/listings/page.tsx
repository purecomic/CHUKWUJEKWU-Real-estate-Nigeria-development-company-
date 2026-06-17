"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ListingsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [listing, setListing] = useState("");
  const [commissionRate, setCommissionRate] = useState(10);

  const fetchProperties = async () => {
    setLoading(true); setError("");
    let query = supabase.from("properties").select("*").order("created_at",{ascending:false});
    if(location) query = query.eq("location",location);
    if(type) query = query.eq("property_type",type);
    if(listing) query = query.eq("listing_type",listing);
    const { data, error: err } = await query;
    if(err) setError(err.message);
    setProperties(data||[]);
    setLoading(false);
  };

  useEffect(()=>{
    fetchProperties();
    const loadRate = async () => {
      const { data } = await supabase.from("settings").select("value").eq("key","commission_rate").single();
      if(data) setCommissionRate(Number(data.value)||10);
    };
    loadRate();
  },[]);

  const sel = {background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"};

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="/listings" style={{color:"#f97316",textDecoration:"none",fontSize:"14px",fontWeight:"bold"}}>Listings</a>
          <a href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</a>
          <a href="/contact" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Contact</a>
        </div>
      </nav>
      <div style={{background:"linear-gradient(135deg,#1c0a00,#0a0a0a)",padding:"40px 20px",textAlign:"center"}}>
        <h1 style={{color:"white",fontSize:"32px",fontWeight:"bold",margin:"0 0 8px"}}>Property Listings</h1>
        <p style={{color:"#9ca3af",margin:"0 0 24px"}}>Find your perfect property in Nigeria</p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <select style={sel} value={location} onChange={e=>{setLocation(e.target.value);setTimeout(fetchProperties,100)}}>
            <option value="">All Locations</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Lekki">Lekki</option>
          </select>
          <select style={sel} value={type} onChange={e=>{setType(e.target.value);setTimeout(fetchProperties,100)}}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Duplex">Duplex</option>
          </select>
          <select style={sel} value={listing} onChange={e=>{setListing(e.target.value);setTimeout(fetchProperties,100)}}>
            <option value="">For Sale & Rent</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
      </div>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px 20px"}}>
        <div style={{background:"#1c1917",border:"1px solid #f97316",borderRadius:"12px",padding:"14px 20px",marginBottom:"24px",display:"flex",alignItems:"center",gap:"12px"}}>
          <span style={{fontSize:"20px"}}>🤝</span>
          <p style={{color:"#fed7aa",margin:0,fontSize:"14px"}}>
            <strong style={{color:"#f97316"}}>Agent Commission: {commissionRate}%</strong> — Earn ₦{((commissionRate/100)*1000000).toLocaleString()} per ₦1M sale. Your commission is shown on each property below.
          </p>
        </div>
        {loading ? <p style={{color:"white",textAlign:"center"}}>Loading properties...</p> :
         error ? <p style={{color:"#ef4444",textAlign:"center"}}>{error}</p> : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"20px"}}>
            {properties.map(p=>(
              <div key={p.id} style={{background:"#1f2937",borderRadius:"16px",overflow:"hidden",border:"1px solid #374151"}}>
                {p.image_url
                  ? <img src={p.image_url} alt={p.title} style={{width:"100%",height:"200px",objectFit:"cover"}} />
                  : <div style={{width:"100%",height:"200px",background:"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"40px"}}>🏠</span></div>
                }
                <div style={{padding:"16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                    <span style={{background:"#ea580c",color:"white",fontSize:"11px",padding:"3px 8px",borderRadius:"6px"}}>{p.listing_type}</span>
                    <span style={{color:"#64748b",fontSize:"12px"}}>{p.property_type}</span>
                  </div>
                  <h3 style={{color:"white",margin:"0 0 6px",fontSize:"16px"}}>{p.title}</h3>
                  <p style={{color:"#9ca3af",margin:"0 0 8px",fontSize:"13px"}}>📍 {p.location}</p>
                  <p style={{color:"#f97316",fontWeight:"bold",fontSize:"20px",margin:"0 0 8px"}}>₦{Number(p.price).toLocaleString()}</p>
                  <div style={{background:"#14532d",borderRadius:"8px",padding:"8px 12px",marginBottom:"12px"}}>
                    <p style={{color:"#4ade80",margin:0,fontSize:"13px",fontWeight:"bold"}}>🤝 Your commission: ₦{((commissionRate/100)*Number(p.price)).toLocaleString()}</p>
                  </div>
                  <div style={{display:"flex",gap:"12px",color:"#9ca3af",fontSize:"13px",marginBottom:"12px"}}>
                    {p.bedrooms>0 && <span>🛏 {p.bedrooms} bed</span>}
                    {p.bathrooms>0 && <span>🚿 {p.bathrooms} bath</span>}
                    {p.area>0 && <span>📐 {p.area} sqm</span>}
                  </div>
                  <a href={"/properties/"+p.id} style={{background:"#ea580c",color:"white",textDecoration:"none",borderRadius:"10px",padding:"10px",display:"block",textAlign:"center",fontWeight:"bold",fontSize:"14px"}}>View Property</a>
                </div>
              </div>
            ))}
            {properties.length===0 && <p style={{color:"#64748b",gridColumn:"1/-1",textAlign:"center"}}>No properties found.</p>}
          </div>
        )}
      </div>
    </main>
  );
}
