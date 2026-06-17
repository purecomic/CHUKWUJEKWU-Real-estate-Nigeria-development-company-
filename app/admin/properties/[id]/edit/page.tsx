"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";

export default function EditProperty() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState({title:"",price:"",location:"",property_type:"",listing_type:"",bedrooms:"",bathrooms:"",area:"",description:""});
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    const load = async () => {
      const { data } = await supabase.from("properties").select("*").eq("id",id).single();
      if(data){
        setForm({
          title:data.title||"", price:String(data.price||""), location:data.location||"",
          property_type:data.property_type||"", listing_type:data.listing_type||"",
          bedrooms:String(data.bedrooms||""), bathrooms:String(data.bathrooms||""),
          area:String(data.area||""), description:data.description||""
        });
        if(data.image_url){ setCurrentImage(data.image_url); setImagePreview(data.image_url); }
      }
    };
    if(id) load();
  },[id]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const save = async () => {
    if(!form.title||!form.price||!form.location){ setMsg("Fill in title, price and location"); return; }
    setLoading(true);
    let image_url = currentImage;
    if(imageFile){
      setUploading(true);
      const ext = imageFile.name.split(".").pop();
      const filename = `property-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("properties").upload(filename, imageFile, {cacheControl:"3600",upsert:false});
      setUploading(false);
      if(uploadErr){ setMsg("Image upload failed: "+uploadErr.message); setLoading(false); return; }
      const { data: urlData } = supabase.storage.from("properties").getPublicUrl(filename);
      image_url = urlData.publicUrl;
    }
    const { error } = await supabase.from("properties").update({
      ...form, image_url,
      price:Number(form.price),
      bedrooms:Number(form.bedrooms)||0,
      bathrooms:Number(form.bathrooms)||0,
      area:Number(form.area)||0
    }).eq("id",id);
    setLoading(false);
    if(error){ setMsg("Error: "+error.message); return; }
    router.push("/admin/properties");
  };

  const inp = {background:"#111827",color:"white",border:"1px solid #374151",borderRadius:"8px",padding:"12px",width:"100%",boxSizing:"border-box" as any,marginBottom:"12px",fontSize:"15px"};

  return (
    <div style={{padding:"24px",background:"#0f172a",minHeight:"100vh",color:"white",fontFamily:"system-ui,sans-serif"}}>
      <a href="/admin/properties" style={{color:"#f97316",textDecoration:"none",fontSize:"14px"}}>← Back to Properties</a>
      <h1 style={{color:"white",margin:"8px 0 24px"}}>Edit Property</h1>
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
        <textarea style={{...inp,height:"100px"}} placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />

        <label style={{color:"#9ca3af",display:"block",marginBottom:"8px",fontSize:"14px"}}>Property Image {currentImage && "(tap to change)"}</label>
        <label style={{display:"block",background:"#111827",border:"2px dashed #374151",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",marginBottom:"12px"}}>
          <input type="file" accept="image/*" onChange={handleImage} style={{display:"none"}} />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{width:"100%",maxHeight:"200px",objectFit:"cover",borderRadius:"8px"}} />
          ) : (
            <div>
              <p style={{fontSize:"32px",margin:"0 0 8px"}}>📷</p>
              <p style={{color:"#64748b",margin:0,fontSize:"14px"}}>Tap to select image from device</p>
            </div>
          )}
        </label>

        <div style={{display:"flex",gap:"12px",marginTop:"8px"}}>
          <button onClick={save} disabled={loading||uploading} style={{background:"#ea580c",color:"white",border:"none",borderRadius:"8px",padding:"12px 32px",cursor:"pointer",fontWeight:"bold",fontSize:"16px"}}>
            {uploading ? "Uploading image..." : loading ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={()=>router.push("/admin/properties")} style={{background:"#374151",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
