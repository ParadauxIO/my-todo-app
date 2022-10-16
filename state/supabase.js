import AsyncStorage from "@react-native-async-storage/async-storage";
import appjson from "../app.json";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    appjson.supabase.url,
    appjson.supabase.anon_key,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);