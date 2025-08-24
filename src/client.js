import { createClient } from '@supabase/supabase-js';
const URL = 'https://wyxdyqphvzvyiobyxkzd.supabase.co';
const API_KEY = 'sb_publishable_uwLLVbl2dV47kY2rjgIYhw_P_yjrAvm';
export const supabase = createClient(URL, API_KEY);

