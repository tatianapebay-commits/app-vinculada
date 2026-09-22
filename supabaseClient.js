import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';


// 1. La URL base que sacaste de la captura (sin /rest/v1/)
const SUPABASE_URL = "https://vlvbhmcyltvdayuycmuu.supabase.co";


// 2. La Publishable Key (sb_publishable_...) que copiaste en la pantalla anterior
const SUPABASE_KEY = "sb_publishable_7kJvSi0fOy3mfhy7IpebOw_pV2KLXRY";


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
