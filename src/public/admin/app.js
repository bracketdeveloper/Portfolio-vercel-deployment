const API_BASE = '/api/v1';
const state = {
  portfolio: null,
  adminMenu: [],
  projects: [],
  experiences: [],
  skillCategories: [],
  messages: [],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const splitList = (value) => value
  .split(/\n/)
  .map((item) => item.trim())
  .filter(Boolean);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const showNotice = (message, isError = false) => {
  const notice = $('#notice');
  notice.textContent = message;
  notice.hidden = false;
  notice.classList.toggle('error', isError);
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => {
    notice.hidden = true;
  }, 4500);
};

const handleAction = (handler) => async (event) => {
  try {
    await handler(event);
  } catch (error) {
    showNotice(error.message || 'Action failed', true);
  }
};

const getAdminKey = () => localStorage.getItem('portfolioAdminKey') || '';

const request = async (path, options = {}) => {
  const headers = { ...(options.headers || {}) };
  const adminKey = getAdminKey();

  if (adminKey) headers['x-admin-api-key'] = adminKey;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body instanceof FormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    const errorMsg = payload.message || 'Request failed';
    if (response.status === 401) {
      throw new Error('Admin API key is missing or invalid. Please enter and save your admin key above.');
    }
    throw new Error(errorMsg);
  }

  return payload.data;
};

const setFormValues = (form, values) => {
  Object.entries(values).forEach(([key, value]) => {
    const input = form.elements[key];
    if (!input) return;
    if (input.type === 'checkbox') input.checked = Boolean(value);
    else input.value = Array.isArray(value) ? value.join('\n') : value ?? '';
  });
};

const clearForm = (form) => {
  form.reset();
  const id = form.elements.id;
  if (id) id.value = '';
};

const renderOverview = async () => {
  $('#statProjects').textContent = state.portfolio?.projects?.length || 0;
  $('#statSkills').textContent = state.portfolio?.skills?.skillTabs?.length || 0;
  $('#statExperience').textContent = state.portfolio?.experience?.length || 0;
  $('#statMessages').textContent = state.messages.length || 0;
  $('#portfolioPreview').textContent = JSON.stringify(state.portfolio, null, 2);

  $('#adminMenu').innerHTML = state.adminMenu.map((section) => `
    <div class="link-card">
      <strong>${escapeHtml(section.section)}</strong>
      ${renderApiLink('View', section.view)}
      ${renderApiLink('Edit', section.edit)}
      ${(section.subsections || []).map((item) => renderApiLink(item.name, item.view || item.edit)).join('')}
    </div>
  `).join('');

  $$('.copy-link').forEach((button) => {
    button.addEventListener('click', handleAction(async () => {
      const url = `${window.location.origin}${button.dataset.path}`;
      await navigator.clipboard.writeText(url);
      showNotice('API link copied');
    }));
  });
};

const renderApiLink = (label, path) => {
  if (!path) return '';
  const href = `${window.location.origin}${path}`;
  return `
    <div class="api-link-row">
      <span>${escapeHtml(label)}</span>
      <a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(path)}</a>
      <button class="btn small copy-link" type="button" data-path="${escapeHtml(path)}">Copy</button>
    </div>
  `;
};

const renderAbout = () => {
  const about = state.portfolio?.about;
  if (!about) return;
  setFormValues($('#aboutForm'), {
    experienceYears: about.experienceYears,
    projectsBuilt: about.projectsBuilt,
    happyClients: about.happyClients,
    coreStack: about.coreStack || 0,
    description: about.description,
  });
  const preview = $('#profilePreview');
  if (about.profilePic) {
    preview.src = about.profilePic;
    preview.style.display = 'block';
  }
};

const addSkillRow = (skill = { name: '', level: 80 }) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input name="skillName" placeholder="Skill name" value="${escapeHtml(skill.name || '')}" />
    <input name="skillLevel" type="number" min="0" max="100" value="${skill.level ?? 80}" />
    <button class="remove-row" type="button">x</button>
  `;
  row.querySelector('button').addEventListener('click', () => row.remove());
  $('#skillRows').appendChild(row);
};

const selectSkillCategory = (category = null) => {
  const form = $('#skillForm');
  clearForm(form);
  $('#skillRows').innerHTML = '';
  $('#deleteSkillCategory').disabled = !category;

  if (!category) {
    setFormValues(form, { sortOrder: state.skillCategories.length + 1 });
    addSkillRow();
    return;
  }

  setFormValues(form, {
    id: category._id,
    tabId: category.tabId,
    name: category.name,
    sortOrder: category.sortOrder,
  });
  category.skills.forEach(addSkillRow);
  $$('#skillList .item').forEach((button) => button.classList.toggle('active', button.dataset.id === category._id));
};

const renderSkills = () => {
  $('#skillList').innerHTML = state.skillCategories.map((category) => `
    <button class="item" type="button" data-id="${category._id}">
      <strong>${escapeHtml(category.name)}</strong>
      <span>${escapeHtml(category.tabId)} - ${category.skills.length} skills</span>
    </button>
  `).join('');
  $$('#skillList .item').forEach((button) => {
    button.addEventListener('click', () => selectSkillCategory(state.skillCategories.find((item) => item._id === button.dataset.id)));
  });
  selectSkillCategory(state.skillCategories[0] || null);
};

const selectProject = (project = null) => {
  const form = $('#projectForm');
  clearForm(form);
  $('#deleteProject').disabled = !project;

  if (!project) {
    setFormValues(form, { sortOrder: state.projects.length + 1, isFeatured: true });
    return;
  }

  setFormValues(form, {
    id: project._id,
    title: project.title,
    category: project.category,
    description: project.description,
    tech: project.tech || [],
    github: project.links?.github || '',
    demo: project.links?.demo || '',
    challenge: project.caseStudy?.challenge || '',
    solution: project.caseStudy?.solution || '',
    metrics: project.caseStudy?.metrics || '',
    sortOrder: project.sortOrder,
    isFeatured: project.isFeatured,
  });
  $$('#projectList .item').forEach((button) => button.classList.toggle('active', button.dataset.id === project._id));
};

const renderProjects = () => {
  $('#projectList').innerHTML = state.projects.map((project) => `
    <button class="item" type="button" data-id="${project._id}">
      <strong>${escapeHtml(project.title)}</strong>
      <span>${escapeHtml(project.category)} - ${project.tech.length} tech</span>
    </button>
  `).join('');
  $$('#projectList .item').forEach((button) => {
    button.addEventListener('click', () => selectProject(state.projects.find((item) => item._id === button.dataset.id)));
  });
  selectProject(state.projects[0] || null);
};

const selectExperience = (experience = null) => {
  const form = $('#experienceForm');
  clearForm(form);
  $('#deleteExperience').disabled = !experience;

  if (!experience) {
    setFormValues(form, { sortOrder: state.experiences.length + 1 });
    return;
  }

  setFormValues(form, {
    id: experience._id,
    role: experience.role,
    company: experience.company,
    location: experience.location,
    period: experience.period,
    bullets: experience.bullets || [],
    tech: experience.tech || [],
    sortOrder: experience.sortOrder,
  });
  $$('#experienceList .item').forEach((button) => button.classList.toggle('active', button.dataset.id === experience._id));
};

const renderExperience = () => {
  $('#experienceList').innerHTML = state.experiences.map((experience) => `
    <button class="item" type="button" data-id="${experience._id}">
      <strong>${escapeHtml(experience.role)}</strong>
      <span>${escapeHtml(experience.company)} - ${escapeHtml(experience.period)}</span>
    </button>
  `).join('');
  $$('#experienceList .item').forEach((button) => {
    button.addEventListener('click', () => selectExperience(state.experiences.find((item) => item._id === button.dataset.id)));
  });
  selectExperience(state.experiences[0] || null);
};

const renderContact = () => {
  const contact = state.portfolio?.contact;
  if (contact) setFormValues($('#contactForm'), contact);
};

const renderMessages = () => {
  $('#messageList').innerHTML = state.messages.length ? state.messages.map((message) => `
    <article class="message">
      <strong>${escapeHtml(message.fullName)} - ${escapeHtml(message.subject)}</strong>
      <span>${escapeHtml(message.email)} - ${new Date(message.createdAt).toLocaleString()} - ${escapeHtml(message.status)}</span>
      <p>${escapeHtml(message.message)}</p>
      <div class="message-actions">
        <button class="btn small" data-status="read" data-id="${message._id}" type="button">Mark Read</button>
        <button class="btn small" data-status="archived" data-id="${message._id}" type="button">Archive</button>
        <button class="btn small danger" data-delete="${message._id}" type="button">Delete</button>
      </div>
    </article>
  `).join('') : '<p>No messages yet.</p>';

  $$('[data-status]').forEach((button) => {
    button.addEventListener('click', handleAction(async () => {
      await request(`/portfolio/contact/messages/${button.dataset.id}/status`, {
        method: 'PATCH',
        body: { status: button.dataset.status },
      });
      await loadMessages();
      showNotice('Message status updated');
    }));
  });

  $$('[data-delete]').forEach((button) => {
    button.addEventListener('click', handleAction(async () => {
      if (!confirm('Delete this message?')) return;
      await request(`/portfolio/contact/messages/${button.dataset.delete}`, { method: 'DELETE' });
      await loadMessages();
      showNotice('Message deleted');
    }));
  });
};

const loadPortfolio = async () => {
  state.portfolio = await request('/portfolio');
  state.projects = state.portfolio.projects || [];
  state.experiences = state.portfolio.experience || [];
  state.skillCategories = state.portfolio.skills?.skillTabs?.map((tab) => ({
    ...tab,
    _id: null,
    tabId: tab.id,
    skills: state.portfolio.skills.skillsByCategory[tab.id] || [],
  })) || [];
  state.skillCategories = await request('/portfolio/skills').then((data) => data.categories || []);
};

const loadMessages = async () => {
  try {
    state.messages = await request('/portfolio/contact/messages');
  } catch {
    state.messages = [];
  }
  renderMessages();
  $('#statMessages').textContent = state.messages.length;
};

const loadAdminMenu = async () => {
  try {
    state.adminMenu = await request('/admin/menu');
  } catch {
    state.adminMenu = [];
  }
};

const renderAll = async () => {
  renderOverview();
  renderAbout();
  renderSkills();
  renderProjects();
  renderExperience();
  renderContact();
  renderMessages();
};

const refreshAll = async () => {
  await loadPortfolio();
  await loadAdminMenu();
  await loadMessages();
  await renderAll();
};

const wireNavigation = () => {
  $$('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      $$('.nav-item').forEach((item) => item.classList.toggle('active', item === button));
      $$('.panel').forEach((panel) => panel.classList.toggle('active-panel', panel.id === section));
      $('#pageTitle').textContent = button.textContent;
      $('#pageHint').textContent = section === 'overview'
        ? 'Manage all portfolio content from one place.'
        : `Create, update, and delete ${button.textContent.toLowerCase()} content.`;
    });
  });
};

const wireForms = () => {
  $('#saveKey').addEventListener('click', handleAction(async () => {
    localStorage.setItem('portfolioAdminKey', $('#adminKey').value.trim());
    await refreshAll();
    showNotice('Admin key saved and verified');
  }));

  $('#aboutForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    await request('/portfolio/about', {
      method: 'PUT',
      body: {
        experienceYears: Number(form.experienceYears.value),
        projectsBuilt: Number(form.projectsBuilt.value),
        happyClients: Number(form.happyClients.value),
        coreStack: Number(form.coreStack.value),
        description: form.description.value,
      },
    });
    await refreshAll();
    showNotice('About section saved');
  }));

  $('#profileForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get('profile_pic')?.name) return showNotice('Choose an image first', true);
    await request('/portfolio/about/profile-picture', { method: 'POST', body: formData });
    await refreshAll();
    showNotice('Profile picture uploaded');
  }));

  $('#newSkillCategory').addEventListener('click', () => selectSkillCategory(null));
  $('#addSkillRow').addEventListener('click', () => addSkillRow());
  $('#skillForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const skills = $$('#skillRows .row').map((row) => ({
      name: row.querySelector('[name="skillName"]').value.trim(),
      level: Number(row.querySelector('[name="skillLevel"]').value),
    })).filter((skill) => skill.name);
    const body = {
      tabId: form.tabId.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      name: form.name.value,
      sortOrder: Number(form.sortOrder.value || 0),
      skills,
    };
    const id = form.id.value;
    await request(id ? `/portfolio/skills/categories/${id}` : '/portfolio/skills/categories', {
      method: id ? 'PUT' : 'POST',
      body,
    });
    await refreshAll();
    showNotice('Skill category saved');
  }));
  $('#deleteSkillCategory').addEventListener('click', handleAction(async () => {
    const id = $('#skillForm').elements.id.value;
    if (!id || !confirm('Delete this skill category?')) return;
    await request(`/portfolio/skills/categories/${id}`, { method: 'DELETE' });
    await refreshAll();
    showNotice('Skill category deleted');
  }));

  $('#newProject').addEventListener('click', () => selectProject(null));
  $('#projectForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      tech: splitList(form.tech.value),
      links: { github: form.github.value, demo: form.demo.value },
      caseStudy: {
        challenge: form.challenge.value,
        solution: form.solution.value,
        metrics: form.metrics.value,
      },
      sortOrder: Number(form.sortOrder.value || 0),
      isFeatured: form.isFeatured.checked,
    };
    const id = form.id.value;
    await request(id ? `/portfolio/projects/${id}` : '/portfolio/projects', { method: id ? 'PUT' : 'POST', body });
    await refreshAll();
    showNotice('Project saved');
  }));
  $('#deleteProject').addEventListener('click', handleAction(async () => {
    const id = $('#projectForm').elements.id.value;
    if (!id || !confirm('Delete this project?')) return;
    await request(`/portfolio/projects/${id}`, { method: 'DELETE' });
    await refreshAll();
    showNotice('Project deleted');
  }));

  $('#newExperience').addEventListener('click', () => selectExperience(null));
  $('#experienceForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = {
      role: form.role.value,
      company: form.company.value,
      location: form.location.value,
      period: form.period.value,
      bullets: splitList(form.bullets.value),
      tech: splitList(form.tech.value),
      sortOrder: Number(form.sortOrder.value || 0),
    };
    const id = form.id.value;
    await request(id ? `/portfolio/experiences/${id}` : '/portfolio/experiences', { method: id ? 'PUT' : 'POST', body });
    await refreshAll();
    showNotice('Experience saved');
  }));
  $('#deleteExperience').addEventListener('click', handleAction(async () => {
    const id = $('#experienceForm').elements.id.value;
    if (!id || !confirm('Delete this experience item?')) return;
    await request(`/portfolio/experiences/${id}`, { method: 'DELETE' });
    await refreshAll();
    showNotice('Experience deleted');
  }));

  $('#contactForm').addEventListener('submit', handleAction(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    await request('/portfolio/contact', {
      method: 'PUT',
      body: {
        email: form.email.value,
        location: form.location.value,
        github: form.github.value,
        linkedin: form.linkedin.value,
      },
    });
    await refreshAll();
    showNotice('Contact info saved');
  }));

  $('#refreshMessages').addEventListener('click', handleAction(loadMessages));
};

const init = async () => {
  $('#adminKey').value = getAdminKey();
  wireNavigation();
  wireForms();

  // Auto-save admin key if provided via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const adminKeyParam = urlParams.get('admin_key');
  if (adminKeyParam && !getAdminKey()) {
    localStorage.setItem('portfolioAdminKey', adminKeyParam);
    $('#adminKey').value = adminKeyParam;
    showNotice('Admin key auto-saved from URL');
  }

  try {
    await refreshAll();
    showNotice('Dashboard loaded');
  } catch (error) {
    showNotice(error.message, true);
  }
};

init();
