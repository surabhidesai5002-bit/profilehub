/* FINAL script.js - Always load Surabhi's profile, no login system */

const STORAGE_KEY = 'profileData_v1';

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

// ---------- PROFILE LOAD/SAVE ----------
function readProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
    return JSON.parse(JSON.stringify(defaultProfile));
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultProfile));
  }
}

function writeProfile(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function setTextIfExists(sel, value) {
  const el = document.querySelector(sel);
  if (el) el.textContent = value || "";
}

function populateList(sel, html) {
  const el = document.querySelector(sel);
  if (el) el.innerHTML = html || "";
}

// ---------- POPULATE ALL PAGES ----------
function populateAll() {
  const p = readProfile();

  // header & dashboard
  setTextIfExists('#hdrInitial', p.initials);
  setTextIfExists('#dashName', `Welcome, ${p.fullName}!`);
  setTextIfExists('#dashMeta', `${p.email} · ${p.phone}`);
  setTextIfExists('#dashPhone', p.phone);
  setTextIfExists('#dashDob', p.dob);
  setTextIfExists('#dashGender', p.gender);
  setTextIfExists('#dashNationality', p.nationality);

  // resume
  setTextIfExists('#resName', p.fullName);
  setTextIfExists('#resContact', `${p.email} · ${p.phone} · ${p.address}`);
  setTextIfExists('#resObjective', p.objective);

  populateList('#resEducation', p.education.map(e =>
    `<div class="resume-card"><strong>${e.title}</strong><br>${e.inst} · ${e.year} · ${e.gpa}</div>`
  ).join(''));

  populateList('#resSkills', p.skills.map(s => `<span class="tag">${s}</span>`).join(" "));
  populateList('#resProjects', p.projects.map(pr =>
    `<div class="resume-card"><strong>${pr.title}</strong><br>${pr.desc}</div>`
  ).join(" "));
  populateList('#resCerts', p.certifications.map(c =>
    `<div class="resume-card">${c}</div>`
  ).join(""));
  populateList('#resHobbies', p.hobbies.map(h => `<span class="tag">${h}</span>`).join(" "));

  // biodata
  setTextIfExists('#bioFullName', p.fullName);
  setTextIfExists('#bioDob', p.dob);
  setTextIfExists('#bioGender', p.gender);
  setTextIfExists('#bioNationality', p.nationality);
  setTextIfExists('#bioFather', p.father);
  setTextIfExists('#bioMother', p.mother);
  setTextIfExists('#bioEmail', p.email);
  setTextIfExists('#bioPhone', p.phone);
  setTextIfExists('#bioAddress', p.address);
  setTextIfExists('#bioName', p.fullName);
  setTextIfExists('#bioFullNameSign', p.fullName);

  populateList('#bioLanguages', p.languages.map(l => `<span class="tag">${l}</span>`).join(" "));
  populateList('#bioEdu', p.education.map(e =>
    `<div class="resume-card"><strong>${e.title}</strong><br>${e.inst} · ${e.year} · ${e.gpa}</div>`
  ).join(""));
  populateList('#bioSkills', p.skills.map(s => `<span class="tag">${s}</span>`).join(" "));
  populateList('#bioHobbies', p.hobbies.map(h => `<span class="tag">${h}</span>`).join(" "));

  const rlink = document.querySelector('#resumeLinkInput');
  if (rlink) rlink.value = p.resumeLink;
}

// ---------- EDIT MODAL ----------
function openEditModal() {
  const p = readProfile();
  const f = document.getElementById('profileEditForm');
  if (!f) return;

  f.fullName.value = p.fullName;
  f.initials.value = p.initials;
  f.email.value = p.email;
  f.phone.value = p.phone;
  f.address.value = p.address;
  f.dob.value = p.dob;
  f.gender.value = p.gender;
  f.nationality.value = p.nationality;
  f.father.value = p.father;
  f.mother.value = p.mother;
  f.objective.value = p.objective;

  f.edu1_title.value = p.education[0].title;
  f.edu1_inst.value = p.education[0].inst;
  f.edu1_year.value = p.education[0].year;
  f.edu1_gpa.value = p.education[0].gpa;

  f.edu2_title.value = p.education[1].title;
  f.edu2_inst.value = p.education[1].inst;
  f.edu2_year.value = p.education[1].year;
  f.edu2_gpa.value = p.education[1].gpa;

  f.skills.value = p.skills.join(', ');
  f.projects.value = p.projects.map(pr => `${pr.title}::${pr.desc}`).join('\n');
  f.certifications.value = p.certifications.join(', ');
  f.hobbies.value = p.hobbies.join(', ');
  f.languages.value = p.languages.join(', ');
  f.resumeLink.value = p.resumeLink;

  document.getElementById('editModalBackdrop').style.display = 'flex';
}

function closeEditModal() {
  document.getElementById('editModalBackdrop').style.display = 'none';
}

function saveFromModal(e) {
  e.preventDefault();
  const f = document.getElementById('profileEditForm');
  const p = readProfile();

  p.fullName = f.fullName.value;
  p.initials = f.initials.value;
  p.email = f.email.value;
  p.phone = f.phone.value;
  p.address = f.address.value;
  p.dob = f.dob.value;
  p.gender = f.gender.value;
  p.nationality = f.nationality.value;
  p.father = f.father.value;
  p.mother = f.mother.value;
  p.objective = f.objective.value;

  p.education = [
    { title: f.edu1_title.value, inst: f.edu1_inst.value, year: f.edu1_year.value, gpa: f.edu1_gpa.value },
    { title: f.edu2_title.value, inst: f.edu2_inst.value, year: f.edu2_year.value, gpa: f.edu2_gpa.value }
  ];

  p.skills = f.skills.value.split(',').map(x => x.trim()).filter(Boolean);

  p.projects = f.projects.value.split('\n').map(line => {
    const [title, desc] = line.split('::');
    return { title: title.trim(), desc: (desc || '').trim() };
  });

  p.certifications = f.certifications.value.split(',').map(x => x.trim());
  p.hobbies = f.hobbies.value.split(',').map(x => x.trim());
  p.languages = f.languages.value.split(',').map(x => x.trim());
  p.resumeLink = f.resumeLink.value.trim();

  writeProfile(p);
  populateAll();
  closeEditModal();
  showToast('Profile updated');
}

// ---------- UTIL ----------
function showToast(msg) {
  const t = document.getElementById('globalToast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 2200);
}

// ---------- NAVIGATION ----------
function enterProfile() {
  window.location.href = "dashboard.html";
}

function logoutToWelcome() {
  window.location.href = "index.html";
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  populateAll();

  const editBtns = document.querySelectorAll('.open-edit-btn');
  editBtns.forEach(btn => btn.addEventListener('click', openEditModal));

  const saveBtn = document.getElementById('modalSaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveFromModal);

  const cancelBtn = document.getElementById('modalCancelBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', (e) => { e.preventDefault(); closeEditModal(); });

  const enterBtn = document.getElementById('continueGoogleBtn');
  if (enterBtn) enterBtn.addEventListener('click', (e) => { e.preventDefault(); enterProfile(); });

  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); logoutToWelcome(); }));
});
