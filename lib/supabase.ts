import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Browser client (used in client components)
export const supabase = isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('your_')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get(target, prop) {
        if (prop === 'auth') {
          return {
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            getSession: async () => ({ data: { session: null } }),
            signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
            signUp: async () => ({ error: new Error('Supabase not configured') }),
            signOut: async () => {},
          };
        }
        const dummyQuery: any = () => dummyQuery;
        dummyQuery.select = () => dummyQuery;
        dummyQuery.insert = () => Promise.resolve({ data: null, error: null });
        dummyQuery.update = () => Promise.resolve({ data: null, error: null });
        dummyQuery.delete = () => Promise.resolve({ data: null, error: null });
        dummyQuery.eq = () => dummyQuery;
        dummyQuery.single = () => Promise.resolve({ data: null, error: null });
        dummyQuery.order = () => dummyQuery;
        dummyQuery.limit = () => Promise.resolve({ data: [], error: null });
        return dummyQuery;
      }
    });

// Server client with service role (used in API routes / server actions)
export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (isValidUrl(supabaseUrl) && serviceRoleKey && !supabaseUrl.includes('your_')) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabase;
}

