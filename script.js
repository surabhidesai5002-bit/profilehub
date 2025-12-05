/* script.js - updated default profile to Surabhi Desai */

const STORAGE_KEY = 'profileData_v1';
const LOGGED_KEY = 'profileLoggedIn';

const defaultProfile = {
  fullName: "Surabhi Desai",
  initials: "SD",
  email: "surabhidesai5002@gmail.com",
  phone: "9019408159",
  address: "Bengaluru, Karnataka, India",
  dob: "05-12-2005",
  gender: "Female",
  nationality: "Indian",
  father: "Gopal Rao Desai",
  mother: "Sumitra Desai",
  objective: "Aspiring Computer Science student with strong interest in Machine Learning and Web Development. Seeking opportunities to build impactful solutions and deepen practical skills.",
  education: [
    { title: "B.E. Computer Science & Engineering", inst: "Sapthagiri College of Engineering", year: "2023 - 2027", gpa: "9.15/10" },
    { title: "12th PCMB", inst: "Vidya Soudha PU College", year: "2023", gpa: "95.5%" }
  ],
  skills: ["Python","SQL","C","C++","Java","Scikit-learn","Pandas","NumPy","Matplotlib","TensorFlow","PyTorch","Git","Jupyter Notebook","VS Code"],
  projects: [
    { title: "Company Culture Matcher Platform", desc: "AI-powered culture compatibility platform with scoring algorithms and recommendation engine." },
    { title: "Machine Learning Predictive Model", desc: "Built classification and regression models with feature engineering and evaluation." },
    { title: "Data Analysis Project", desc: "Large dataset analysis with SQL queries and visual reports." }
  ],
  certifications: ["Machine Learning","Data Structures & Algorithms","DBMS","TensorFlow","PyTorch"],
  hobbies: ["Drawing","Watching Movies and Series"],
  languages: ["Kannada","English","Hindi","Tamil"],
  resumeLink: "https://github.com/surabhidesai5002-bit"
};

// helpers (same as before)
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

function writeProfile(obj){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function populateAll(){
  const p = readProfile();
  setTextIfExists('#hdrName', p.fullName);
  setTextIfExists('#hdrInitial', p.initials || initialsFromName(p.fullName));
  setTextIfExists('#dashName', p.fullName ? `Welcome back, ${p.fullName}!` : '');
  setTextIfExists('#dashMeta', `${p.email} · ${p.phone}`);
  setTextIfExists('#dashPhone', p.phone);
  setTextIfExists('#dashDob', p.dob);
  setTextIfExists('#dashGender', p.gender);
  setTextIfExists('#dashNationality', p.nationality);

  setTextIfExists('#resName', p.fullName);
  setTextIfExists('#resContact', `${p.email} · ${p.phone} · ${p.address}`);
  setTextIfExists('#resObjective', p.objective);

  populateList('#resEducation', p.education.map(e => `<div style="background:#f8fffb;padding:12px;border-radius:8px;margin-bottom:8px"><strong>${escapeHtml(e.title)}</strong><br>${escapeHtml(e.inst)} · ${escapeHtml(e.year)} · ${escapeHtml(e.gpa)}</div>`).join(''));
  populateList('#resSkills', p.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join(' '));
  populateList('#resProjects', p.projects.map(pr => `<div style="background:#f1fbff;padding:10px;border-radius:8px;margin-bottom:8px"><strong>${escapeHtml(pr.title)}</strong><br>${escapeHtml(pr.desc)}</div>`).join(''));
  populateList('#resCerts', p.certifications.map(c=>`<div style="background:#fff5f7;padding:10px;border-radius:8px;margin-bottom:8px">${escapeHtml(c)}</div>`).join(''));
  populateList('#resHobbies', p.hobbies.map(h=>`<span class="tag">${escapeHtml(h)}</span>`).join(' '));

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
  populateList('#bioEdu', p.education.map(e=>`<div style="background:#f6fffb;padding:12px;border-radius:8px;margin-bottom:10px"><strong>${escapeHtml(e.title)}</strong><br>${escapeHtml(e.inst)} · ${escapeHtml(e.year)} · ${escapeHtml(e.gpa)}</div>`).join(''));
  populateList('#bioSkills', p.skills.map(s=>`<span class="tag">${escapeHtml(s)}</span>`).join(' '));
  populateList('#bioHobbies', p.hobbies.map(h=>`<span class="tag">${escapeHtml(h)}</span>`).join(' '));

  const rlink = document.querySelector('#resumeLinkInput');
  if(rlink) rlink.value = p.resumeLink || '';
}

function setTextIfExists(selector, text){
  const el = document.querySelector(selector);
  if(el) el.textContent = text || '';
}
function populateList(selector, html){
  const el = document.querySelector(selector);
  if(el) el.innerHTML = html || '';
}
function initialsFromName(name){
  if(!name) return 'SD';
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, s=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

// Edit modal handlers
function openEditModal(){
  const p = readProfile();
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

  form.edu1_title.value = (p.education[0] && p.education[0].title) || '';
  form.edu1_inst.value = (p.education[0] && p.education[0].inst) || '';
  form.edu1_year.value = (p.education[0] && p.education[0].year) || '';
  form.edu1_gpa.value = (p.education[0] && p.education[0].gpa) || '';

  form.edu2_title.value = (p.education[1] && p.education[1].title) || '';
  form.edu2_inst.value = (p.education[1] && p.education[1].inst) || '';
  form.edu2_year.value = (p.education[1] && p.education[1].year) || '';
  form.edu2_gpa.value = (p.education[1] && p.education[1].gpa) || '';

  form.skills.value = (p.skills||[]).join(', ');
  form.projects.value = (p.projects||[]).map(x=>x.title + '::' + x.desc).join('\n');
  form.certifications.value = (p.certifications||[]).join(', ');
  form.hobbies.value = (p.hobbies||[]).join(', ');
  form.languages.value = (p.languages||[]).join(', ');
  form.resumeLink.value = p.resumeLink || '';

  document.getElementById('editModalBackdrop').style.display = 'flex';
}

function closeEditModal(){
  document.getElementById('editModalBackdrop').style.display = 'none';
}

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

  const projLines = form.projects.value.split('\n').map(s=>s.trim()).filter(Boolean);
  p.projects = projLines.map(line => {
    const parts = line.split('::');
    return { title: parts[0].trim(), desc: (parts[1]||'').trim() };
  });

  p.certifications = form.certifications.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.hobbies = form.hobbies.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.languages = form.languages.value.split(',').map(s=>s.trim()).filter(Boolean);
  p.resumeLink = form.resumeLink.value.trim();

  writeProfile(p);
  populateAll();
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

function simulateLoginAndGoDashboard(){
  readProfile();
  localStorage.setItem(LOGGED_KEY,'1');
  window.location.href = 'dashboard.html';
}
function logoutToWelcome(){
  localStorage.removeItem(LOGGED_KEY);
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', ()=>{
  populateAll();

  const btns = document.querySelectorAll('.open-edit-btn');
  btns.forEach(b=>b.addEventListener('click', openEditModal));

  const saveBtn = document.getElementById('modalSaveBtn');
  if(saveBtn) saveBtn.addEventListener('click', saveFromModal);

  const cancelBtn = document.getElementById('modalCancelBtn');
  if(cancelBtn) cancelBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeEditModal(); });

  const googleBtn = document.getElementById('continueGoogleBtn');
  if(googleBtn) googleBtn.addEventListener('click', (e)=>{ e.preventDefault(); simulateLoginAndGoDashboard(); });

  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(b=>b.addEventListener('click', (e)=>{ e.preventDefault(); logoutToWelcome(); }));

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

  const rinput = document.getElementById('resumeLinkInput');
  if(rinput){
    rinput.addEventListener('change', ()=>{
      const p = readProfile(); p.resumeLink = rinput.value.trim(); writeProfile(p); showToast('Resume link updated');
    });
  }
});
