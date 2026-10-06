import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://vlvbhmcyltvdayuycmuu.supabase.co";
const SUPABASE_KEY = "sb_publishable_7kJvSi0fOy3mfhy7IpebOw_pV2KLXRY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);