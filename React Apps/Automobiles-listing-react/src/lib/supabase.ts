import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yvdjaeoiwvuqrkpuhcck.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hm6uwYSW_JSY_Oj5Vq8DpQ_CQQYgEu9';

export const supabase = createClient(supabaseUrl, supabaseKey);
