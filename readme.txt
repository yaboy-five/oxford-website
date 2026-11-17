OXFORD DENTAL CENTRE WEBSITE
============================

OVERVIEW
--------
This folder contains the Oxford Dental Centre website and its prototype admin
portal. It is a React application built with Vite, TypeScript, and Tailwind CSS.

The public website includes treatment information, fees, clinic details,
appointment requests, and contact information.

The admin portal includes:
- Appointment scheduling and appointment records
- Pending appointment request approval
- Dentist profile management
- Treatment details and fee management
- Clinic contact, opening hour, and social media settings


RUNNING THE PROJECT
-------------------
Requirements:
- Node.js
- pnpm

Install dependencies:
  pnpm install

Start the development server:
  pnpm dev

Create a production build:
  pnpm build

Preview the production build:
  pnpm preview

Format the source code:
  pnpm format


ADMIN PORTAL
------------
Use the "Staff admin login" link at the top-right of the public website.

Demo login:
  Email: admin@oxforddentalcentre.co.uk
  Password: Admin123

The signup option creates an additional admin account for the current browser
session only.


APPOINTMENT WORKFLOW
--------------------
Appointment requests submitted through the public website first appear under
"Pending requests" in the admin portal.

Pending requests do not appear in the appointment list or scheduling calendar
until an administrator accepts them using "Add appointment" or
"Add emergency".


IMPORTANT DATA NOTE
-------------------
This is a front-end prototype. Appointments, admin accounts, dentist profiles,
treatments, clinic settings, and other edits are held in application memory.
Changes are not stored in a database and will reset when the page is refreshed
or the application restarts.


PROJECT STRUCTURE
-----------------
src/App.tsx          Public website and appointment request form
src/AdminPanel.tsx   Admin login, portal, and management screens
src/index.css        Global styles and shared component classes
src/assets/          Clinic and associate logo assets
src/main.tsx         React application entry point
public/              Static public files
