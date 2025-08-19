import { supabase } from "@/lib/supabase";

export const getAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) throw error;
    
    return data;
}

export const getUserProjects = async (user_id : any) => { // TODO update type
    const { data, error } = await supabase.from("projects").select("*").eq('user_id', user_id);

    if (error) throw error;
    
    return data;
}