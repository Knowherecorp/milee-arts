
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server
// This is a Supabase Edge Function for handling file storage operations

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        }
      }
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    
    if (authHeader) {
      // Extract the JWT token from the Authorization header
      const token = authHeader.replace('Bearer ', '');
      
      // Set the auth token in the Supabase client
      supabaseClient.auth.setSession({
        access_token: token,
        refresh_token: '',
      });
    }

    // Parse the request body
    const requestData = await req.json();
    
    // Extract file data
    const { fileName, fileType, fileData } = requestData;
    
    if (!fileName || !fileType || !fileData) {
      return new Response(
        JSON.stringify({ error: 'Missing required file data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Upload the file to storage
    const { data, error } = await supabaseClient.storage
      .from('product-images')
      .upload(`uploads/${Date.now()}_${fileName}`, fileData, {
        contentType: fileType,
        upsert: false
      });
    
    if (error) {
      console.error('Storage upload error:', error);
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('product-images')
      .getPublicUrl(data.path);
    
    return new Response(
      JSON.stringify({ url: publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
