import AsyncStorage from "@react-native-async-storage/async-storage";
import appjson from "../app.json";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";
setupURLPolyfill();
export const supabase = createClient(
    appjson.supabase.url,
    appjson.supabase.anon_key,
    {
        localStorage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
);
