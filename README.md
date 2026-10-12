# Blog Management Dashboard

A responsive frontend admin dashboard and CMS management prototype developed for an internship project at Hewad Future Consultancy.

**Instructor / Project Supervisor:** M Nasim Rasoli

## Project Overview

The Blog Management Dashboard provides an organized interface for managing blog content, users, media, settings, monitoring, and other approved dashboard operations.

The current project is a frontend-only prototype built with:

- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage
- sessionStorage

No backend, API, or database is required for the current prototype.

## User Roles

### Administrator
The Administrator has access to dashboard management features, including CRUD operations and approval-related actions across the available modules.

### Author
The Author is restricted to the Create Post workflow only.

## Demo Login Accounts

### Administrator
- Username: `admin`
- Password: `admin123`
- Role: `Administrator`

### Author
- Username: `author`
- Password: `author123`
- Role: `Author`

> These credentials are for frontend demonstration only and are not production-grade authentication.

## Main Features

The dashboard includes:

1. Dashboard / Overview
2. Posts Management
3. Categories
4. Tags
5. Media Library
6. Comments
7. Authors / Users
8. Pages
9. Appearance
10. Advertisement Management
11. SEO
12. Analytics
13. Notifications
14. Settings
15. System / Logs

Authentication and role-based access are included as a foundation module.

## Additional Features

- Responsive layout for desktop, tablet, and mobile
- Mobile hamburger menu and sidebar overlay
- English (LTR)
- Dari (RTL)
- Pashto (RTL)
- Post search and filtering
- Draft, Published, Scheduled, Pending Approval, Rejected, and Trash post states
- CRUD-style frontend interactions
- Dynamic dashboard statistics
- Browser-storage persistence
- Role-based interface restrictions
- Notifications and system/activity logs
- Theme and appearance settings
- Prototype analytics
- Reusable modal forms

## Project Structure

```text
blog-management-dashboard/
├── dashboard.html
├── dashboard.css
├── dashboard.js
└── README.md
```

## How to Run the Project

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Open `dashboard.html` in a browser.

Recommended:

- Install the **Live Server** extension in VS Code.
- Right-click `dashboard.html`.
- Select **Open with Live Server**.

## Browser Storage

The project uses browser storage for demonstration purposes:

- `localStorage` stores prototype application data.
- `sessionStorage` stores temporary login/session information.

Do not use this frontend-only approach for real passwords or sensitive production data.

## Responsive Design

The interface is designed to work on:

- Desktop
- Laptop
- Tablet
- Mobile

On smaller screens, the sidebar changes to a mobile navigation menu.

## Language Support

The interface supports:

- English — LTR
- Dari — RTL
- Pashto — RTL

The page direction and interface alignment change according to the selected language.

## Project Scope

This project is an administration dashboard prototype.

Public-facing Home, About, or Blog pages are not part of the current approved scope unless assigned separately.

Secure production authentication, authorization, shared databases, live server logs, and real analytics require backend integration.

## Deployment

The project can be deployed as a static frontend using platforms such as:

- Netlify
- GitHub Pages

## Project Credits

**Prepared by:** Marwa Naikkhwah  
**Instructor / Project Supervisor:** M Nasim Rasoli  
**Company:** Hewad Future Consultancy  
**Project:** Internship Project  
**Date:** October 2026
