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

  // ===== Projects =====
  // Default projects — used as a fallback if Supabase is unavailable
  window.DEFAULT_PROJECTS = [
    { id: 'p1', title: 'WriteConnect — Student & Writer Platform', year: '2025 — Present', description: 'Full-stack Next.js platform connecting students with academic writers. Features dual user roles, real-time chat, request management, review system, and Supabase backend.', location: 'Visakhapatnam, India', sort_order: 1 },
    { id: 'p2', title: 'EventFlow — Event Management Platform', year: '2025', description: 'Complete event management system with QR code generation, CSV export, and dual user roles. Built for Indian use cases.', location: 'Visakhapatnam, India', sort_order: 2 },
    { id: 'p3', title: 'AU Events Portal — 3D Animated Organizer', year: '2025', description: 'A 3D animated login UI for event organizers. Showcases advanced CSS animations and interactive design.', location: 'Visakhapatnam, India', sort_order: 3 },
    { id: 'p4', title: 'ResumePlus / ResumePulse — ATS Resume Builder', year: '2024 — 2025', description: 'ATS-friendly resume builder helping students create professional resumes. Clean design and compatibility with applicant tracking systems.', location: 'Visakhapatnam, India', sort_order: 4 },
    { id: 'p5', title: 'Instagram-like Social Media Platform', year: '2024', description: 'Vanilla JavaScript social media clone with posts, stories, likes, and profiles. Built from scratch to master DOM manipulation.', location: 'Visakhapatnam, India', sort_order: 5 },
    { id: 'p6', title: 'Tony — Voice Assistant', year: '2024', description: 'Multi-language voice assistant with offline + online capabilities. Built for Indian language accessibility.', location: 'Visakhapatnam, India', sort_order: 6 }
  ];

  async function loadProjects() {
    try {
      const client = getClient();
      const { data, error } = await client
        .from('projects')
        .select('id, title, year, description, location, sort_order')
        .order('sort_order', { ascending: true });
      if (error) {
        console.warn('[supabase] loadProjects error — using defaults:', error.message);
        return [...window.DEFAULT_PROJECTS];
      }
      return data || [];
    } catch (e) {
      console.warn('[supabase] loadProjects failed — using defaults:', e.message);
      return [...window.DEFAULT_PROJECTS];
    }
  }

  async function saveProject(project) {
    const client = getClient();
    const payload = {
      title: project.title,
      year: project.year || '',
      description: project.description || '',
      location: project.location || '',
      sort_order: parseInt(project.sort_order, 10) || 0
    };
    if (project.id && !String(project.id).startsWith('p')) {
      payload.id = project.id;
    }
    const { data, error } = await client
      .from('projects')
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function deleteProject(id) {
    const client = getClient();
    if (String(id).startsWith('p')) {
      // It's a default/unsaved row — nothing to delete from DB
      return true;
    }
    const { error } = await client.from('projects').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Render a list of projects into a target container element
  function renderProjects(projects, container) {
    if (!container) return;
    if (!projects || projects.length === 0) {
      container.innerHTML = '<p style="text-align:center;opacity:0.6;font-family:Space Mono,monospace;">No projects yet. Add some from the admin panel.</p>';
      return;
    }
    container.innerHTML = projects.map(p => `
      <div class="timeline-item-flat" data-country="India">
        <div class="timeline-dot"></div>
        <div class="timeline-content-flat">
          <h4 class="timeline-title">${escapeHtml(p.title)}</h4>
          <p class="timeline-date">${escapeHtml(p.year || '')}</p>
          <p class="timeline-description">${escapeHtml(p.description || '')}</p>
          ${p.location ? `<p class="timeline-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Expose helpers
  window.SiteContent = { loadContent, renderContent, saveContentKey, loadProjects, saveProject, deleteProject, renderProjects, escapeHtml, getClient };
})();
