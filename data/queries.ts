import { supabase } from "@/lib/supabase";

export const getAllProjects = async () => {
    const currentTimestamp = new Date().toISOString();
    const { data, error } = await supabase.from("projects").select("*").gt('expires_at', currentTimestamp);

    if (error) throw error;
    
    return data;
}

export const getUserProjects = async (userId : string | undefined) => {
    if (!userId) throw new Error('Please sign in again')

    const currentTimestamp = new Date().toISOString();
    const { data, error } = await supabase.from("projects").select("*").eq('user_id', userId).gt('expires_at', currentTimestamp);

    if (error) throw error;
    
    return data;
}