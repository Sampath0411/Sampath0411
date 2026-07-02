// Shared Supabase client + content load/save helpers used by index.html and admin.html

(function () {
  'use strict';

  // Lazy-create the Supabase client when the library is available
  function getClient() {
    if (window._supabaseClient) return window._supabaseClient;
    if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
      throw new Error('Supabase not configured. Make sure supabase-config.js and the Supabase JS lib are loaded.');
    }
    window._supabaseClient = window.supabase.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
    return window._supabaseClient;
  }

  // Default content — used as a fallback if Supabase is unavailable
  window.DEFAULT_CONTENT = {
    hero_name: "I'm Sampath Satya Saran.",
    hero_description: "Second-year BTech CSE student at Andhra University, Visakhapatnam (2025–2029). I'm a multi-dimensional builder — photographer, designer, and developer — with a strong focus on animated UI/UX and branding. I build startup-scale solutions relevant to Indian daily life.",
    about_p1: "I'm a second-year BTech CSE student at Andhra University, Visakhapatnam (2025–2029). I'm a multi-dimensional builder — photographer, designer, and developer — with a strong focus on animated UI/UX and branding.",
    about_p2: "I believe in handcrafted, original design — nothing that looks AI-generated or templated. I build startup-scale solutions relevant to Indian daily life, with a fast-shipping builder mindset.",
    about_p3: "Active on Instagram as @sampath.exe (tech/education, video editing, and personal). I edit with CapCut on an Acer Aspire i3 — proving you don't need expensive gear to create.",
    about_p4: "I've participated in VibeCon and various AI innovation challenges, always pushing to learn and ship faster.",
    contact_intro: "Let's build something amazing together",
    contact_email: "sampathlox@gmail.com",
    contact_phone: "+91 929149 3225",
    contact_whatsapp: "9291493225"
  };

  // Fetch all content rows from Supabase and merge over defaults
  async function loadContent() {
    try {
      const client = getClient();
      const { data, error } = await client.from('site_content').select('key,value');
      if (error) {
        console.warn('[supabase] loadContent error — using defaults:', error.message);
        return { ...window.DEFAULT_CONTENT };
      }
      const merged = { ...window.DEFAULT_CONTENT };
      (data || []).forEach(row => { merged[row.key] = row.value; });
      return merged;
    } catch (e) {
      console.warn('[supabase] loadContent failed — using defaults:', e.message);
      return { ...window.DEFAULT_CONTENT };
    }
  }

  // Apply content to any [data-editable="KEY"] elements on the page
  function renderContent(content) {
    document.querySelectorAll('[data-editable]').forEach(el => {
      const key = el.getAttribute('data-editable');
      if (content[key] != null) {
        // Preserve any inner highlights by setting textContent
        el.textContent = content[key];
      }
    });
  }

  // Persist a single key/value to Supabase
  async function saveContentKey(key, value) {
    const client = getClient();
    const { error } = await client
      .from('site_content')
      .upsert({ key, value }, { onConflict: 'key' });
    if (error) throw error;
    return true;
  }

  // Expose helpers
  window.SiteContent = { loadContent, renderContent, saveContentKey, getClient };
})();
