/* script.js
   Handles:
   - profile data storage (localStorage)
   - load/populate UI on each page
   - edit modal open/save
   - simulated "Continue with Google" login and logout
*/

const STORAGE_KEY = 'profileData_v1';
const LOGGED_KEY = 'profileLoggedIn';

// default dummy data (matches screenshots)
const defaultProfile = {
  fullName: "John Doe",
  initials: "JD",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  address: "123 Main Street, New York, NY 10001, USA",
  dob: "15 May 1995",
  gender: "Male",
  nationality: "American",
  father: "Robert Doe",
  mother: "Jane Doe",
  objective: "Passionate software developer seeking challenging opportunities to leverage my skills in full-stack development and contribute to innovative projects.",
  education: [
    { title: "Bachelor of Science in Computer Science", inst: "Stanford University", year: "2017", gpa: "3.8/4.0" },
    { title: "High School Diploma", inst: "Lincoln High School", year: "2013", gpa: "3.9/4.0" }
  ],
  skills: ["JavaScript", "React", "Python", "FastAPI", "MongoDB", "Node.js"],
  projects: [
    { title: "E-Commerce Platform", desc: "Built full stack e-commerce platform with payment integration, user auth, inventory management." },
    { title: "Task Management App", desc: "Collaborative task management app with real-time updates and team collaboration." }
  ],
  certifications: ["AWS Certified Solutions Architect", "MongoDB Developer Certification"],
  hobbies: ["Photography","Hiking","Reading Tech Blogs","Playing Guitar"],
  languages: ["English","Spanish","French"],
  resumeLink: ""
};

// helper: read data
function readProfile(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
    return JSON.parse(JSON.stringify(defaultProfile));
  }
  try {
    return JSON.parse(raw);
  } catch(e){ return JSON.parse(JSON.stringify(defaultProfile)); }
}

// helper: write data
function writeProfile(obj){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

// update DOM (called on load)
function populateAll(){
  const p = readProfile();
  // header/profile name elements (if present)
  setTextIfExists('#hdrName', p.fullName);
  setTextIfExists('#hdrInitial', p.initials || initialsFromName(p.fullName));
  // dashboard fields
  setTextIfExists('#dashName', p.fullName);
  setTextIfExists('#dashMeta', `${p.email} · ${p.phone}`);
  setTextIfExists('#dashPhone', p.phone);
  setTextIfExists('#dashDob', p.dob);
  setTextIfExists('#dashGender', p.gender);
  setTextIfExists('#dashNationality', p.nationality);
  // resume page
  setTextIfExists('#resName', p.fullName);
  setTextIfExists('#resContact', `${p.email} · ${p.phone} · ${p.address}`);
  setTextIfExists('#resObjective', p.objective);
  // education area
  populateList('#resEducation', p.education.map(e => `<div style="background:#f8fffb;padding:12px;border-radius:8px;margin-bottom:8px"><strong>${escapeHtml(e.title)}</strong><br>${escapeHtml(e.inst)} · ${escapeHtml(e.year)} · GPA: ${escapeHtml(e.gpa)}</div>`).join(''));
  // skills tags
  populateList('#resSkills', p.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join(' '));
  // projects
  populateList('#resProjects', p.projects.map(pr => `<div style="background:#f1fbff;padding:10px;border-radius:8px;margin-bottom:8px"><strong>${escapeHtml(pr.title)}</strong><br>${escapeHtml(pr.desc)}</div>`).join(''));
  // certifications
  populateList('#resCerts', p.certifications.map(c=>`<div style="background:#fff5f7;padding:10px;border-radius:8px;margin-bottom:8px">${escapeHtml(c)}</div>`).join(''));
  // hobbies tags
  populateList('#resHobbies', p.hobbies.map(h=>`<span class="tag">${escapeHtml(h)}</span>`).join(' '));

  // biodata page fields
  setTextIfExists('#bioName', p.fullName);
  setTextIfExists('#bioFullName', p.fullName);
  setTextIfExists('#bioDob', p.dob);
  setTextIfExists('#bioGender', p.gender);
  setTextIfExists('#bioNationality', p.nationality);
  setTextIfExists('#bioFather', p.father);
  setTextIfExists('#bioMother', p.mother);
  setTextIfExists('#bioEmail', p.email);
  setTextIfExists('#bioPhone', p.phone);
  setTextIfExists('#bioAddress', p.address);
  populateList('#bioLanguages', p.languages.map(l=>`<span class="tag">${escapeHtml(l)}</span>`).join(' '));
  populateList('#bioEdu', p.education.map(e=>`<div style="background:#f6fffb;padding:12px;border-radius:8px;margin-bottom:10px"><strong>${escapeHtml(e.title)}</strong><br>${escapeHtml(e.inst)} · ${escapeHtml(e.year)} · GPA: ${escapeHtml(e.gpa)}</div>`).join(''));
  populateList('#bioSkills', p.skills.map(s=>`<span class="tag">${escapeHtml(s)}</span>`).join(' '));
  populateList('#bioHobbies', p.hobbies.map(h=>`<span class="tag">${escapeHtml(h)}</span>`).join(' '));

  // set saved resume link input if exists (dashboard)
  const rlink = document.querySelector('#resumeLinkInput');
  if(rlink) rlink.value = p.resumeLink || '';
}

// util: safe set text
function setTextIfExists(selector, text){
  const el = document.querySelector(selector);
  if(el) el.textContent = text || '';
}
function populateList(selector, html){
  const el = document.querySelector(selector);
  if(el) el.innerHTML = html || '';
}
function initialsFromName(name){
  if(!name) return 'JD';
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, s=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

// ---------- EDIT MODAL ----------
// The page HTML must include a modal container with id="editModalBackdrop" (we will add in sample pages below).
function openEditModal(){
  const p = readProfile();
  // populate form inputs
  const form = document.getElementById('profileEditForm');
  if(!form) return;
  form.fullName.value = p.fullName || '';
  form.initials.value = p.initials || initialsFromName(p.fullName);
  form.email.value = p.email || '';
  form.phone.value = p.phone || '';
  form.address.value = p.address || '';
  form.dob.value = p.dob || '';
  form.gender.value = p.gender || '';
  form.nationality.value = p.nationality || '';
  form.father.value = p.father || '';
  form.mother.value = p.mother || '';
  form.objective.value = p.objective || '';
  // education fields (two)
  form.edu1_title.value = (p.education[0] && p.education[0].title) || '';
  form.edu1_inst.value = (p.education[0] && p.education[0].inst) || '';
  form.edu1_year.value = (p.education[0] && p.education[0].year) || '';
  form.edu1_gpa.value = (p.education[0] && p.education[0].gpa) || '';

  form.edu2_title.value = (p.education[1] && p.education[1].title) || '';
  form.edu2_inst.value = (p.education[1] && p.education[1].inst) || '';
  form.edu2_year.value = (p.education[1] && p.education[1].year) || '';
  form.edu2_gpa.value = (p.education[1] && p.education[1].gpa) || '';

  // skills, projects, certs, hobbies, langs as comma-separated
  form.skills.value = (p.skills||[]).join(', ');
  form.projects.value = (p.projects||[]).map(x=>x.title + '::' + x.desc).join('\n'); // each line title::desc
  form.certifications.value = (p.certifications||[]).join(', ');
  form.hobbies.value = (p.hobbies||[]).join(', ');
  form.languages.value = (p.languages||[]).join(', ');
  form.resumeLink.value = p.resumeLink || '';

  // show modal
  document.getElementById('editModalBackdrop').style.display = 'flex';
}

function closeEditModal(){
  document.getElementById('editModalBackdrop').style.display = 'none';
}

// save handler (called when clicking Save)
function saveFromModal(e){
  e.preventDefault();
  const form = document.getElementById('profileEditForm');
  if(!form) return;
  const p = readProfile();
  p.fullName = form.fullName.value.trim() || p.fullName;
  p.initials = form.initials.value.trim() || initialsFromName(p.fullName);
  p.email = form.email.value.trim();
  p.phone = form.phone.value.trim();
  p.address = form.address.value.trim();
  p.dob = form.dob.value.trim();
  p.gender = form.gender.value.trim();
  p.nationality = form.nationality.value.trim();
  p.father = form.father.value.trim();
  p.mother = form.mother.value.trim();
  p.objective = form.objective.value.trim();

  p.education = [
    { title: form.edu1_title.value.trim(), inst: form.edu1_inst.value.trim(), year: form.edu1_year.value.trim(), gpa: form.edu1_gpa.value.trim() },
    { title: form.edu2_title.value.trim(), inst: form.edu2_inst.value.trim(), year: form.edu2_year.value.trim(), gpa: form.edu2_gpa.value.trim() }
  ];

  p.skills = form.skills.value.split(',').map(s=>s.trim()).filter(Boolean);

  // parse projects lines: title::desc
  const projLines = form.projects.value.split('\n').map(s=>s.trim()).filter(Boolean);
  p.projects = projLines.map(line => {
    const parts = line.split('::');
    return { title: parts[0].trim(), desc: (parts[1]||'').trim() };
  });

  p.certifications = form.certifications.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.hobbies = form.hobbies.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.languages = form.languages.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.resumeLink = form.resumeLink.value.trim();

  // persist
  writeProfile(p);
  // update UI live
  populateAll();
  // notify
  showToast('Profile saved');
  closeEditModal();
}

function showToast(msg){
  const t = document.getElementById('globalToast');
  if(!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(()=>{ t.style.display = 'none'; }, 2200);
}

// ---------- Simulated Login / Navigation ----------
function simulateLoginAndGoDashboard(){
  // ensure profile exists
  readProfile();
  // mark logged in
  localStorage.setItem(LOGGED_KEY,'1');
  // navigate
  window.location.href = 'dashboard.html';
}
function logoutToWelcome(){
  // option: keep profile but remove logged flag
  localStorage.removeItem(LOGGED_KEY);
  window.location.href = 'index.html';
}

// ---------- init on DOM ready ----------
document.addEventListener('DOMContentLoaded', ()=>{
  populateAll();

  // connect any open-edit buttons
  const btns = document.querySelectorAll('.open-edit-btn');
  btns.forEach(b=>b.addEventListener('click', openEditModal));

  const saveBtn = document.getElementById('modalSaveBtn');
  if(saveBtn) saveBtn.addEventListener('click', saveFromModal);

  const cancelBtn = document.getElementById('modalCancelBtn');
  if(cancelBtn) cancelBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeEditModal(); });

  // continue with google / simulated login
  const googleBtn = document.getElementById('continueGoogleBtn');
  if(googleBtn) googleBtn.addEventListener('click', (e)=>{ e.preventDefault(); simulateLoginAndGoDashboard(); });

  // simulate logout buttons
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(b=>b.addEventListener('click', (e)=>{ e.preventDefault(); logoutToWelcome(); }));

  // copy resume link (dashboard)
  const copyBtn = document.getElementById('copyResumeLink');
  if(copyBtn){
    copyBtn.addEventListener('click', (e)=>{
      const input = document.getElementById('resumeLinkInput');
      if(!input) return;
      input.select(); input.setSelectionRange(0,99999);
      document.execCommand('copy');
      showToast('Link copied');
    });
  }

  // Save resume link from dashboard input into storage when changed
  const rinput = document.getElementById('resumeLinkInput');
  if(rinput){
    rinput.addEventListener('change', ()=>{
      const p = readProfile(); p.resumeLink = rinput.value.trim(); writeProfile(p); showToast('Resume link updated');
    });
  }
});
