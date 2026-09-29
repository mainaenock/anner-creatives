import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  if (!await isAdminRequest()) return forbidden();
  try { const {id}=await params; const body=await request.json() as {name?:string;category?:string;description?:string;price?:number;oldPrice?:number|null;imageKey?:string|null}; if (!body.name?.trim() || !body.category?.trim() || !Number.isFinite(body.price) || Number(body.price)<=0) return Response.json({error:"Name, category and a valid price are required."},{status:400}); const [product]=await getDb().update(products).set({name:body.name.trim(),category:body.category.trim(),description:body.description?.trim()??"",price:Number(body.price),oldPrice:body.oldPrice?Number(body.oldPrice):null,imageKey:body.imageKey??null}).where(eq(products.id,Number(id))).returning(); return product?Response.json({product}):Response.json({error:"Product not found."},{status:404}); }
  catch(error){console.error(JSON.stringify({event:"admin_product_update_failed",error:error instanceof Error?error.message:"unknown"}));return Response.json({error:"Could not update this product."},{status:500});}
}
export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}) {
  if (!await isAdminRequest()) return forbidden();
  try { const {id}=await params; await getDb().update(products).set({active:false}).where(eq(products.id,Number(id))); return new Response(null,{status:204}); }
  catch(error){console.error(JSON.stringify({event:"admin_product_delete_failed",error:error instanceof Error?error.message:"unknown"}));return Response.json({error:"Could not remove this product."},{status:500});}
}
