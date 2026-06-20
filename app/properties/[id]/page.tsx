"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function PropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commissionRate, setCommissionRate] = useState(10);

  useEffect(()=>{
    const load = async () => {
      const { data } = await supabase.from("properties").select("*").eq("id",id).single();
      setProperty(data);
      setLoading(false);
      const { data: cfg } = await supabase.from("settings").select("value").eq("key","commission_rate").single();
      if(cfg) setCommissionRate(Number(cfg.value)||10);
    };
    if(id) load();
  },[id]);

  if(loading) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}><p style={{color:"#64748b"}}>Loading...</p></div>;
  if(!property) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}><p style={{color:"#64748b"}}>Property not found.</p></div>;

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <nav style={{background:"rgba(255,255,255,0.95)",borderBottom:"1px solid #e2e8f0",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
        <a href="/" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"}}>
          <div style={{width:"32px",height:"32px",background:"linear-gradient(135deg,#1e40af,#3b82f6)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontWeight:"900",fontSize:"14px"}}>C</span></div>
          <div><p style={{color:"#1e40af",fontWeight:"800",fontSize:"13px",margin:0}}>CHUKWUJEKWU</p><p style={{color:"#94a3b8",fontSize:"10px",margin:0}}>REAL ESTATE</p></div>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
          <a href="/listings" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Listings</a>
          <a href="/agents" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Agents</a>
          <a href="/contact" style={{color:"#475569",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Contact</a>
        </div>
      </nav>
      <div style={{paddingTop:"64px"}}>
        {property.image_url ? <img src={property.image_url} alt={property.title} style={{width:"100%",height:"300px",objectFit:"cover"}} /> : <div style={{width:"100%",height:"300px",background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"64px"}}>🏠</span></div>}
        <div style={{maxWidth:"700px",margin:"0 auto",padding:"32px 20px"}}>
          <a href="/listings" style={{color:"#2563eb",textDecoration:"none",fontSize:"13px",fontWeight:"600",display:"inline-block",marginBottom:"16px"}}>← Back to Listings</a>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
            <span style={{background:"#dbeafe",color:"#1d4ed8",fontSize:"12px",padding:"4px 12px",borderRadius:"100px",fontWeight:"600"}}>{property.listing_type}</span>
            <span style={{color:"#94a3b8",fontSize:"13px"}}>{property.property_type}</span>
          </div>
          <h1 style={{color:"#0f172a",fontSize:"24px",fontWeight:"800",margin:"0 0 8px"}}>{property.title}</h1>
          <p style={{color:"#64748b",margin:"0 0 16px",fontSize:"14px"}}>📍 {property.location}</p>
          <p style={{color:"#1e40af",fontWeight:"800",fontSize:"28px",margin:"0 0 16px"}}>₦{Number(property.price).toLocaleString()}</p>
          <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:"12px",padding:"14px 16px",marginBottom:"24px"}}>
            <p style={{color:"#15803d",margin:0,fontWeight:"700",fontSize:"14px"}}>🤝 Agent commission ({commissionRate}%): ₦{((commissionRate/100)*Number(property.price)).toLocaleString()}</p>
          </div>
          <div style={{display:"flex",gap:"16px",marginBottom:"24px",flexWrap:"wrap"}}>
            {property.bedrooms>0 && <div style={{background:"white",borderRadius:"10px",padding:"14px 20px",border:"1px solid #e2e8f0",textAlign:"center"}}><p style={{fontSize:"20px",margin:"0 0 4px"}}>🛏</p><p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 2px"}}>{property.bedrooms}</p><p style={{color:"#94a3b8",fontSize:"12px",margin:0}}>Bedrooms</p></div>}
            {property.bathrooms>0 && <div style={{background:"white",borderRadius:"10px",padding:"14px 20px",border:"1px solid #e2e8f0",textAlign:"center"}}><p style={{fontSize:"20px",margin:"0 0 4px"}}>🚿</p><p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 2px"}}>{property.bathrooms}</p><p style={{color:"#94a3b8",fontSize:"12px",margin:0}}>Bathrooms</p></div>}
            {property.area>0 && <div style={{background:"white",borderRadius:"10px",padding:"14px 20px",border:"1px solid #e2e8f0",textAlign:"center"}}><p style={{fontSize:"20px",margin:"0 0 4px"}}>📐</p><p style={{color:"#0f172a",fontWeight:"700",margin:"0 0 2px"}}>{property.area}</p><p style={{color:"#94a3b8",fontSize:"12px",margin:0}}>Sqm</p></div>}
          </div>
          {property.description && <div style={{background:"white",borderRadius:"12px",padding:"20px",border:"1px solid #e2e8f0",marginBottom:"24px"}}><h3 style={{color:"#0f172a",fontWeight:"700",margin:"0 0 10px",fontSize:"15px"}}>Description</h3><p style={{color:"#64748b",margin:0,fontSize:"14px",lineHeight:"1.7"}}>{property.description}</p></div>}
          <a href="/contact" style={{background:"#1e40af",color:"white",textDecoration:"none",borderRadius:"10px",padding:"14px",display:"block",textAlign:"center",fontWeight:"700",fontSize:"15px"}}>Enquire About This Property</a>
        </div>
      </div>
      <footer style={{background:"#0f172a",padding:"32px 20px",textAlign:"center"}}><p style={{color:"#475569",fontSize:"12px",margin:0}}>© 2025 CHUKWUJEKWU Real Estate. All rights reserved.</p></footer>
    </main>
  );
}
