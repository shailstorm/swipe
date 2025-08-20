import { supabase } from "@/lib/supabase";

export const createProject = async ({title, description, userId, expireDate} : {title: string, description: string, userId: any,  expireDate: Date}) => {
    if (!title.trim()) throw new Error("Title is required.");
    if (!description.trim()) throw new Error("Description is required.");
    if (!expireDate) throw new Error("Expiry Date is required.");

    const { error } = await supabase.from("projects").insert({
      title: title,
      description: description,
      user_id: userId,
      expires_at: expireDate
    });
    
    if (error) throw error;
}