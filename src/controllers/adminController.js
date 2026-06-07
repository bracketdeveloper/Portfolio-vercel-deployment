import { sendResponse } from '../utils/sendResponse.js';

const menu = [
  {
    section: 'About Section',
    view: '/api/v1/portfolio/about',
    edit: '/api/v1/portfolio/about',
    subsections: [
      { name: 'Stats', fields: ['experienceYears', 'projectsBuilt', 'happyClients'], edit: '/api/v1/portfolio/about' },
      { name: 'Core Stack', fields: ['coreStack'], edit: '/api/v1/portfolio/about' },
      { name: 'Profile Picture', fields: ['profile_pic'], edit: '/api/v1/portfolio/about/profile-picture' },
      { name: 'Description', fields: ['description'], edit: '/api/v1/portfolio/about' },
    ],
  },
  {
    section: 'Skills Section',
    view: '/api/v1/portfolio/skills',
    edit: '/api/v1/portfolio/skills/categories/:id',
    subsections: [
      { name: 'Skill Tabs', edit: '/api/v1/portfolio/skills/categories' },
      { name: 'Skills By Category', edit: '/api/v1/portfolio/skills/categories/:id' },
    ],
  },
  {
    section: 'Project Section',
    view: '/api/v1/portfolio/projects',
    edit: '/api/v1/portfolio/projects/:id',
    subsections: [
      { name: 'Project Details', edit: '/api/v1/portfolio/projects/:id' },
      { name: 'Links', edit: '/api/v1/portfolio/projects/:id' },
      { name: 'Case Study', edit: '/api/v1/portfolio/projects/:id' },
    ],
  },
  {
    section: 'Experience Section',
    view: '/api/v1/portfolio/experiences',
    edit: '/api/v1/portfolio/experiences/:id',
    subsections: [
      { name: 'Role Details', edit: '/api/v1/portfolio/experiences/:id' },
      { name: 'Bullets', edit: '/api/v1/portfolio/experiences/:id' },
      { name: 'Tech Stack', edit: '/api/v1/portfolio/experiences/:id' },
    ],
  },
  {
    section: 'Contact Section',
    view: '/api/v1/portfolio/contact',
    edit: '/api/v1/portfolio/contact',
    subsections: [
      { name: 'Contact Info', edit: '/api/v1/portfolio/contact' },
      { name: 'Contact Messages', view: '/api/v1/portfolio/contact/messages', edit: '/api/v1/portfolio/contact/messages/:id/status' },
    ],
  },
];

export const getAdminMenu = (_req, res) => {
  sendResponse(res, 200, 'Admin menu fetched', menu);
};
