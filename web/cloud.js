import {createClient} from './vendor/supabase.js';
export const ORGANIZATION='813ffcaf-835a-4e51-82db-3e411a978a20';
export const APP_URL='https://montedopasto.github.io/trueborn-global-intelligence/';
// Publishable key only. Database permissions and RLS enforce authorization.
export const cloud=createClient('https://yvrwfkqngmubeeheidny.supabase.co','sb_publishable_sf5NZunp-oDHqIeZaNCVBw_cQjCetuL',{
 auth:{storage:window.sessionStorage,persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'},
 global:{headers:{'X-Client-Info':'trueborn-global-intelligence/0.5.0'}}
});
