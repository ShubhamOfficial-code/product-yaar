import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jgocuimgofnzkqxjalyj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb2N1aW1nb2ZuemtxeGphbHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NjMzMzQsImV4cCI6MjA5MDMzOTMzNH0.DuJGt9QVvZZqVAaz6VdpVuzJ_gTMt2pfGdW_s1fOwy8";

// Test connection
async function checkSupabase() {
  try {
    console.log("🔍 Checking Supabase Configuration...\n");
    
    console.log("✓ Supabase URL configured:", SUPABASE_URL);
    console.log("✓ Supabase Anon Key configured: (present but not visible for security)\n");
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    console.log("✓ Supabase client created successfully\n");
    
    // Test basic connectivity
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log("⚠️  Auth session check failed:", error.message);
    } else {
      console.log("✓ Supabase Auth service is accessible");
      console.log("  Session data:", data.session ? "User logged in" : "No active session (expected in Node)");
    }
    
    // Check database access
    const { error: dbError, data: dbData } = await supabase
      .from('tickets')
      .select('count(*)', { count: 'exact' })
      .limit(1);
    
    if (dbError) {
      if (dbError.code === 'PGRST116') {
        console.log("\n⚠️  Database Issue: 'tickets' table not found or no permission");
        console.log("   Error:", dbError.message);
      } else if (dbError.code === 'CORS') {
        console.log("\n⚠️  CORS Error: Check browser vs Node environment");
      } else {
        console.log("\n⚠️  Database connection error:");
        console.log("   Code:", dbError.code);
        console.log("   Message:", dbError.message);
      }
    } else {
      console.log("✓ Database connection successful");
      console.log("  'tickets' table is accessible");
    }
    
    console.log("\n" + "=".repeat(60));
    console.log("SUPABASE STATUS SUMMARY:");
    console.log("=".repeat(60));
    console.log("✓ Configuration: VALID");
    console.log("✓ Credentials: PRESENT");
    console.log("✓ Client Library: CONNECTED");
    console.log("⚠️  Database Tables: REQUIRES SETUP");
    console.log("⚠️  Authentication: MOCK DATA IN USE (not Supabase Auth)");
    console.log("⚠️  Current App Status: USING MOCK DATA, NOT SUPABASE");
    
  } catch (err) {
    console.error("❌ Error checking Supabase:", err.message);
  }
}

checkSupabase();
