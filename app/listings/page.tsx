"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ListingsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [listing, setListing] = useState("");
  const [commissionRate, setCommissionRate] = useState(10);

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase.from("properties").select("*").order("created_at",{ascending:false});
    if(location) query = query.eq("location",location);
    if(type) query = query.eq("property_type",type);
    if(listing) query = query.eq("listing_type",listing);
    const { data } = await query;
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

  const sel = {background:"white",color:"#374151",border:"1px solid #d1d5db",borderRadius:"8px",padding:"8px 12px",fontSize:"12px",outline:"none"};

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <nav style={{background:"rgba(255,255,255,0.97)",borderBottom:"1px solid #e2e8f0",position:"fixed",top:0,left:0,right:0,zIndex:100,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",overflowX:"auto",padding:"0 16px",height:"56px",gap:"16px"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:"6px",textDecoration:"none",flexShrink:0}}>
            <div style={{width:"26px",height:"26px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontWeight:"900",fontSize:"11px"}}>C</span></div>
            <p style={{color:"#1e40af",fontWeight:"800",fontSize:"11px",margin:0,whiteSpace:"nowrap"}}>CHUKWUJEKWU RE</p>
          </a>
          <a href="/listings" style={{color:"#1e40af",textDecoration:"none",fontSize:"12px",fontWeight:"700",whiteSpace:"nowrap",flexShrink:0}}>Listings</a>
          <a href="/agents" style={{color:"#475569",textDecoration:"none",fontSize:"12px",fontWeight:"500",whiteSpace:"nowrap",flexShrink:0}}>Agents</a>
          <a href="/contact" style={{color:"#475569",textDecoration:"none",fontSize:"12px",fontWeight:"500",whiteSpace:"nowrap",flexShrink:0}}>Contact</a>
          <a href="/login" style={{background:"#1e40af",color:"white",padding:"6px 14px",borderRadius:"6px",textDecoration:"none",fontWeight:"600",fontSize:"12px",whiteSpace:"nowrap",flexShrink:0}}>Login</a>
        </div>
      </nav>
      <div style={{paddingTop:"56px"}}>
        <div style={{background:"linear-gradient(135deg,#eff6ff,#dbeafe)",padding:"40px 20px",textAlign:"center"}}>
          <p style={{color:"#2563eb",fontWeight:"700",letterSpacing:"2px",fontSize:"11px",marginBottom:"8px"}}>PROPERTY LISTINGS</p>
          <h1 style={{color:"#0f172a",fontSize:"24px",fontWeight:"800",margin:"0 0 8px"}}>Find Your Property</h1>
          <p style={{color:"#64748b",margin:"0 0 20px",fontSize:"13px"}}>Browse verified properties across Nigeria</p>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
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
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px 16px"}}>
          <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:"12px",padding:"10px 14px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"14px"}}>🤝</span>
            <p style={{color:"#1d4ed8",margin:0,fontSize:"12px",fontWeight:"600"}}>Agent Commission: {commissionRate}% — Earn ₦{((commissionRate/100)*1000000).toLocaleString()} per ₦1M sale</p>
          </div>
          {loading ? <p style={{textAlign:"center",color:"#64748b",padding:"40px",fontSize:"14px"}}>Loading properties...</p> : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
              {properties.map(p=>(
                <div key={p.id} style={{background:"white",borderRadius:"14px",overflow:"hidden",border:"1px solid #e2e8f0",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                  {p.image_url ? <img src={p.image_url} alt={p.title} style={{width:"100%",height:"180px",objectFit:"cover"}} /> : <div style={{width:"100%",height:"180px",background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"40px"}}>🏠</span></div>}
                  <div style={{padding:"14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                      <span style={{background:"#dbeafe",color:"#1d4ed8",fontSize:"10px",padding:"2px 8px",borderRadius:"100px",fontWeight:"600"}}>{p.listing_type}</span>
                      <span style={{color:"#94a3b8",fontSize:"11px"}}>{p.property_type}</span>
                    </div>
                    <h3 style={{color:"#0f172a",margin:"0 0 4px",fontSize:"14px",fontWeight:"700"}}>{p.title}</h3>
                    <p style={{color:"#64748b",margin:"0 0 8px",fontSize:"12px"}}>📍 {p.location}</p>
                    <p style={{color:"#1e40af",fontWeight:"800",fontSize:"18px",margin:"0 0 6px"}}>₦{Number(p.price).toLocaleString()}</p>
                    <div style={{background:"#f0fdf4",borderRadius:"6px",padding:"6px 10px",marginBottom:"10px"}}>
                      <p style={{color:"#15803d",margin:0,fontSize:"11px",fontWeight:"600"}}>🤝 Commission: ₦{((commissionRate/100)*Number(p.price)).toLocaleString()}</p>
                    </div>
                    <div style={{display:"flex",gap:"10px",color:"#94a3b8",fontSize:"11px",marginBottom:"12px"}}>
                      {p.bedrooms>0 && <span>🛏 {p.bedrooms}</span>}
                      {p.bathrooms>0 && <span>🚿 {p.bathrooms}</span>}
                      {p.area>0 && <span>📐 {p.area}sqm</span>}
                    </div>
                    <a href={"/properties/"+p.id} style={{background:"#1e40af",color:"white",textDecoration:"none",borderRadius:"8px",padding:"9px",display:"block",textAlign:"center",fontWeight:"600",fontSize:"12px"}}>View Property</a>
                  </div>
                </div>
              ))}
              {properties.length===0 && <p style={{color:"#94a3b8",gridColumn:"1/-1",textAlign:"center",padding:"40px",fontSize:"14px"}}>No properties found.</p>}
            </div>
          )}
        </div>
      </div>
      <footer style={{background:"#0f172a",padding:"28px 20px",textAlign:"center"}}><p style={{color:"#475569",fontSize:"12px",margin:0}}>© 2025 CHUKWUJEKWU Real Estate. All rights reserved.</p></footer>
    </main>
  );
}
