import { supabase } from "@/lib/supabase";

export const createProject = async ({title, description, user_id} : {title: string, description: string, user_id: any}) => {
    const { error } = await supabase.from("projects").insert({
      title: title,
      description: description,
      user_id: user_id,
    });
    if (error) throw error;
}