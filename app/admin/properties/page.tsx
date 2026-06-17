"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminProperties() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({title:"",price:"",location:"",property_type:"",listing_type:"",bedrooms:"",bathrooms:"",area:"",description:"",image_url:""});
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("properties").select("*").order("created_at",{ascending:false});
    setProperties(data||[]);
    setLoading(false);
  };

  useEffect(()=>{ fetch(); },[]);

  const save = async () => {
    const { error } = await supabase.from("properties").insert([{...form, price: Number(form.price), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), area: Number(form.area)}]);
    if(error){ setMsg("Error: "+error.message); return; }
    setMsg("Property added!"); setShowForm(false); setForm({title:"",price:"",location:"",property_type:"",listing_type:"",bedrooms:"",bathrooms:"",area:"",description:"",image_url:""}); fetch();
  };

  const del = async (id:string) => {
    if(!confirm("Delete this property?")) return;
    await supabase.from("properties").delete().eq("id",id);
    fetch();
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"10px",width:"100%",boxSizing:"border-box" as any,marginBottom:"10px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
        <div><a href="/admin" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back</a><h1 style={{color:"white",margin:"4px 0 0"}}>Properties</h1></div>
        <button onClick={()=>setShowForm(!showForm)} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"10px 20px",cursor:"pointer",fontWeight:"bold"}}>+ Add Property</button>
      </div>
      {msg && <p style={{color:"#4ade80",marginBottom:"16px"}}>{msg}</p>}
      {showForm && (
        <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",marginBottom:"24px",border:"1px solid #334155"}}>
          <h2 style={{color:"#f97316",marginTop:0}}>New Property</h2>
          <input style={inp} placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <input style={inp} placeholder="Price (₦)" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <input style={inp} placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          <input style={inp} placeholder="Type (Apartment/House/Land...)" value={form.property_type} onChange={e=>setForm({...form,property_type:e.target.value})} />
          <input style={inp} placeholder="Listing (For Sale/For Rent)" value={form.listing_type} onChange={e=>setForm({...form,listing_type:e.target.value})} />
          <input style={inp} placeholder="Bedrooms" value={form.bedrooms} onChange={e=>setForm({...form,bedrooms:e.target.value})} />
          <input style={inp} placeholder="Bathrooms" value={form.bathrooms} onChange={e=>setForm({...form,bathrooms:e.target.value})} />
          <input style={inp} placeholder="Area (sqm)" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} />
          <input style={inp} placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
          <textarea style={{...inp,height:"80px"}} placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={save} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",cursor:"pointer",fontWeight:"bold"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#374151",color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}
      {loading ? <p>Loading...</p> : (
        <div style={{display:"grid",gap:"16px"}}>
          {properties.map(p=>(
            <div key={p.id} style={{background:"#1e293b",borderRadius:"12px",padding:"20px",border:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{color:"#f97316",fontWeight:"bold",margin:"0 0 4px"}}>{p.title}</p>
                <p style={{color:"#94a3b8",margin:"0 0 4px",fontSize:"14px"}}>{p.location} · {p.property_type} · {p.listing_type}</p>
                <p style={{color:"#4ade80",margin:0,fontWeight:"bold"}}>₦{Number(p.price).toLocaleString()}</p>
              </div>
              <button onClick={()=>del(p.id)} style={{background:"#7f1d1d",color:"white",border:"none",borderRadius:"8px",padding:"8px 16px",cursor:"pointer"}}>Delete</button>
            </div>
          ))}
          {properties.length===0 && <p style={{color:"#64748b"}}>No properties yet.</p>}
        </div>
      )}
    </div>
  );
}
