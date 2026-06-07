# Portfolio Backend API

Clean Express + MongoDB API for managing a portfolio website from any frontend.

## Setup

```bash
npm install
copy .env.example .env
npm run seed
npm run dev
```

Update `.env` before running:

- `MONGODB_URI`
- `ADMIN_API_KEY`
- `CORS_ORIGINS`
- `ADMIN_EMAIL`
- SMTP settings for contact form emails

Every API request must include:

```http
x-admin-api-key: your-admin-api-key
```

## Admin Frontend

After starting the server, open:

```http
http://localhost:5000/admin
```

Paste your `ADMIN_API_KEY` into the top-right field and save it. The dashboard can create, update, and delete About, Skills, Projects, Experience, Contact, and Contact Messages.

## Portfolio Endpoints

```http
GET    /api/v1/health
GET    /api/v1/portfolio
GET    /api/v1/portfolio/about
GET    /api/v1/portfolio/skills
GET    /api/v1/portfolio/projects
GET    /api/v1/portfolio/projects/:idOrSlug
GET    /api/v1/portfolio/experiences
GET    /api/v1/portfolio/experiences/:id
GET    /api/v1/portfolio/contact
POST   /api/v1/portfolio/contact/messages
```

Contact form body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "subject": "Project inquiry",
  "message": "I want to discuss a website project."
}
```

## Admin Endpoints

```http
GET    /api/v1/admin/menu

POST   /api/v1/portfolio/about
PUT    /api/v1/portfolio/about
DELETE /api/v1/portfolio/about
POST   /api/v1/portfolio/about/profile-picture

POST   /api/v1/portfolio/skills/categories
GET    /api/v1/portfolio/skills/categories/:id
PUT    /api/v1/portfolio/skills/categories/:id
DELETE /api/v1/portfolio/skills/categories/:id

POST   /api/v1/portfolio/projects
PUT    /api/v1/portfolio/projects/:id
DELETE /api/v1/portfolio/projects/:id

POST   /api/v1/portfolio/experiences
PUT    /api/v1/portfolio/experiences/:id
DELETE /api/v1/portfolio/experiences/:id

POST   /api/v1/portfolio/contact
PUT    /api/v1/portfolio/contact
DELETE /api/v1/portfolio/contact
GET    /api/v1/portfolio/contact/messages
GET    /api/v1/portfolio/contact/messages/:id
PATCH  /api/v1/portfolio/contact/messages/:id/status
DELETE /api/v1/portfolio/contact/messages/:id
```

Profile picture upload uses `multipart/form-data` with the field name `profile_pic`.
