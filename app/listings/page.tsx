
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [listing, setListing] = useState("");

  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    let query = supabase.from("properties").select("*").order("created_at", {ascending: false});
    if (location) query = query.eq("location", location);
    if (type) query = query.eq("property_type", type);
    if (listing) query = query.eq("listing_type", listing);
    const { data, error: err } = await query;
    if (err) setError(err.message);
    setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const typeEmoji = {house:"🏠", apartment:"🏢", land:"🌍", shop:"🏪"};

  return (
    <main style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <nav style={{background:"#0a0a0a",borderBottom:"1px solid #1f2937",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50}}>
        <a href="/" style={{color:"#f97316",fontWeight:"900",fontSize:"16px",textDecoration:"none"}}>CHUKWUJEKWU RE</a>
        <div style={{display:"flex",gap:"16px"}}>
          <a href="/agents" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Agents</a>
          <a href="/contact" style={{color:"#d1d5db",textDecoration:"none",fontSize:"14px"}}>Contact</a>
        </div>
      </nav>

      <div style={{background:"#111827",padding:"40px 20px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <h1 style={{color:"white",fontSize:"28px",fontWeight:"bold",marginBottom:"20px"}}>Property Listings</h1>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            <select value={location} onChange={e=>setLocation(e.target.value)} style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option value="">All Locations</option>
              <option>Lagos</option>
              <option>FCT Abuja</option>
              <option>Rivers</option>
              <option>Oyo</option>
            </select>
            <select value={type} onChange={e=>setType(e.target.value)} style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="shop">Shop</option>
            </select>
            <select value={listing} onChange={e=>setListing(e.target.value)} style={{background:"#1f2937",color:"white",border:"1px solid #374151",borderRadius:"10px",padding:"12px",fontSize:"14px"}}>
              <option value="">Sale & Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <button onClick={fetchProperties} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"10px",padding:"12px",fontSize:"14px",fontWeight:"bold",cursor:"pointer"}}>Search</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"800px",margin:"0 auto",padding:"24px 20px"}}>
        {error && <p style={{color:"red",marginBottom:"16px"}}>Error: {error}</p>}
        {loading ? (
          <p style={{color:"#f97316",textAlign:"center",padding:"60px 0"}}>Loading properties...</p>
        ) : properties.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{color:"#6b7280",fontSize:"18px"}}>No properties found.</p>
            <p style={{color:"#374151",fontSize:"14px",marginTop:"8px"}}>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          </div>
        ) : (
          <>
            <p style={{color:"#6b7280",fontSize:"14px",marginBottom:"20px"}}>{properties.length} properties found</p>
            <div style={{display:"grid",gap:"16px"}}>
              {properties.map((p: any) => (
                <a key={p.id} href={"/properties/"+p.id} style={{textDecoration:"none",display:"block"}}>
                  <div style={{background:"#1f2937",borderRadius:"16px",overflow:"hidden",border:"1px solid #374151"}}>
                    <div style={{background:"linear-gradient(135deg,#1c0a00,#111827)",height:"180px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"64px",position:"relative"}}>
                      {typeEmoji[p.property_type as keyof typeof typeEmoji] || "🏠"}
                      <span style={{position:"absolute",top:"12px",left:"12px",background:p.listing_type==="sale"?"#ea580c":"#16a34a",color:"white",padding:"4px 10px",borderRadius:"20px",fontSize:"12px",fontWeight:"bold"}}>
                        {p.listing_type==="sale"?"For Sale":"For Rent"}
                      </span>
                      <span style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.7)",color:"white",padding:"4px 10px",borderRadius:"20px",fontSize:"12px",textTransform:"capitalize"}}>
                        {p.property_type}
                      </span>
                    </div>
                    <div style={{padding:"16px"}}>
                      <p style={{color:"#f97316",fontSize:"20px",fontWeight:"900",margin:"0 0 6px"}}>
                        N{Number(p.price).toLocaleString()}
                      </p>
                      <p style={{color:"white",fontSize:"16px",fontWeight:"bold",margin:"0 0 8px"}}>{p.title}</p>
                      <p style={{color:"#6b7280",fontSize:"14px",margin:"0 0 12px"}}>Location: {p.location}</p>
                      {p.bedrooms && (
                        <div style={{display:"flex",gap:"16px",borderTop:"1px solid #374151",paddingTop:"12px"}}>
                          <span style={{color:"#9ca3af",fontSize:"13px"}}>Beds: {p.bedrooms}</span>
                          <span style={{color:"#9ca3af",fontSize:"13px"}}>Baths: {p.bathrooms}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      <footer style={{background:"#030712",padding:"24px",textAlign:"center",marginTop:"40px"}}>
        <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>CHUKWUJEKWU Real Estate</p>
        <p style={{color:"#374151",fontSize:"12px",margin:0}}>2025 All rights reserved</p>
      </footer>
    </main>
  );
}
