"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function NewProperty() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const router = useRouter();
  const [form, setForm] = useState({title:"",price:"",location:"",property_type:"",listing_type:"",bedrooms:"",bathrooms:"",area:"",description:"",image_url:""});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if(!form.title||!form.price||!form.location){ setMsg("Fill in title, price and location"); return; }
    setLoading(true);
    const { error } = await supabase.from("properties").insert([{
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms)||0,
      bathrooms: Number(form.bathrooms)||0,
      area: Number(form.area)||0
    }]);
    setLoading(false);
    if(error){ setMsg("Error: "+error.message); return; }
    router.push("/admin/properties");
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"12px",width:"100%",boxSizing:"border-box" as any,marginBottom:"12px",fontSize:"15px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin/properties" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back to Properties</a>
      <h1 style={{color:"white",margin:"8px 0 24px"}}>Add New Property</h1>
      {msg && <p style={{color:"#ef4444",marginBottom:"16px"}}>{msg}</p>}
      <div style={{background:"#1e293b",borderRadius:"12px",padding:"24px",border:"1px solid #334155",maxWidth:"600px"}}>
        <input style={inp} placeholder="Property Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input style={inp} placeholder="Price (₦) *" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input style={inp} placeholder="Location *" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <input style={inp} placeholder="Type (Apartment / House / Land / Duplex...)" value={form.property_type} onChange={e=>setForm({...form,property_type:e.target.value})} />
        <input style={inp} placeholder="Listing (For Sale / For Rent)" value={form.listing_type} onChange={e=>setForm({...form,listing_type:e.target.value})} />
        <input style={inp} placeholder="Bedrooms" value={form.bedrooms} onChange={e=>setForm({...form,bedrooms:e.target.value})} />
        <input style={inp} placeholder="Bathrooms" value={form.bathrooms} onChange={e=>setForm({...form,bathrooms:e.target.value})} />
        <input style={inp} placeholder="Area (sqm)" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} />
        <input style={inp} placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
        <textarea style={{...inp,height:"100px"}} placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <div style={{display:"flex",gap:"12px",marginTop:"8px"}}>
          <button onClick={save} disabled={loading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"12px 32px",cursor:"pointer",fontWeight:"bold",fontSize:"16px"}}>
            {loading ? "Saving..." : "Save Property"}
          </button>
          <button onClick={()=>router.push("/admin/properties")} style={{background:"#374151",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
