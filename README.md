# LUNA Film Website – Academic Project README

## Introduction - See on Github Project Description
We developed the **LUNA Film website** as part of a university project exploring digital media, web design, film promotion, and interactive storytelling. The website functions as the official online platform for **LUNA**, a short romance film set in London.

Our aim was to create a visually compelling and technically functional website that communicates the film’s themes of connection, artistry, and emotion, while demonstrating skills in development, design, SEO, and collaborative teamwork.

---

## Project Aims & Objectives

### Aims
- Build a professional multi-page promotional website for *LUNA*.  
- Create an immersive story-driven web flim experience through visuals and UI design.  
- Showcase our skills in web development, branding, database integration, and UX.  
- Apply SEO and digital marketing strategy.  
- Work effectively as a team with clear task distribution.

### Objectives
- Develop a fully responsive, accessible website.  
- Present the film’s story narrative, cast, crew, gallery, and production details.  
- Implement interactive features (carousels, FAQ accordion, review system, newsletter).  
- Maintain consistent branding and strong visual identity.  
- Use structured metadata (Schema.org) to enhance SEO.  
- Ensure intuitive navigation and user-friendly design.

---

## Target Audience
The website is designed for:

- Film viewers and fans of short romance films  
- Festival programmers  
- Creative industry professionals  
- Visual storytellers, photographers, directors  
- Social media audiences following LUNA  

The design appeals to both general audiences and industry-level visitors.

---

## Team Roles & Contributions

### Josh
- Contact Page  
- Cast & Crew Page  
- Project Proposal  
- Website Wireframes 

### Shuayb
- Digital Marketing Plan  
- SEO Management  
- Gallery Page  
- FAQ Page  
- Code Assitance for making the entire Contact Us PHP Database and helping Cast and Crew Page CSS Files for Josh function as intended
- Task Management (Monday.com)

### Dimas
- Reviews Page  
- Blog Page  
- Database design & PHP integration for reviews  

### Bilal
-	Week 8 presentation and the final presentation for the project.
-	Slides for the film students so we could join our work together for the final presentation.
-	Set up the GitHub main branch and organised the project structure and merged the teams’ branches into the main.
-	Built the nav bar and footer, which is the base layout for the website, asked everyone in the team to make their own branches, so our work stayed organised.
-	Home page and the Story page of the website.
-	SEO implementation and newsletter backend with SMTP and popup feature.
-	User personas document.
-	Branding and visual identity document. 
-	Created first prototype of the website to show the film students. They liked it, and we used that design.
-	General code assistance for team members.
---

## Website Structure & Page Features

### Home Page (`index.html`)
- Full-screen animated greeting section  
- Theme introduction: *Connection • Distance • Reflection*  
- Cast & Crew carousel  
- Gallery preview grid  
- Reviews carousel with quotes  
- Newsletter subscription (inline + popup)  
- Blog promotional section  
- Extensive SEO metadata (Open Graph, Twitter Cards, JSON-LD)

### Story Page
- Cinematic hero header  
- Interactive envelope sections:  
  - **Storyline Letter** (handwritten effect)  
  - **Trailer Video** (embedded via YouTube)  
- Director’s Statement  
- JSON-LD structured data (Movie, CreativeWork, Breadcrumbs)

### Cast & Crew Page
- Complete list of cast & crew with roles  
- Headshots for actors and key crew  
- Linked with homepage carousel  

### Gallery Page
- Two full slideshow systems:  
  - **Behind-the-scenes photos**  
  - **Film stills**  
- Dot navigation + next/prev controls  
- Poster section  
- Mobile-friendly layout  

### FAQ Page
- Accordion-style collapsible Q&A  
- Covers film production themes and behind-the-scenes info  
- Structured data: **FAQPage JSON-LD**

### Reviews Page
- Review submission form (name, rating, message)  
- PHP backend (`submit_review.php`)  
- MySQL database integration  
- Dynamic review loading via `reviews.js`  
- User feedback success message  

### Blog Page
- Behind-the-scenes posts  
- Production notes  
- Supports long-form SEO content  

### Contact Page
- Contact form for enquiries and collaborations  
- Backend validation with PHP  
- Simple and accessible layout  

---

## Technical Development

### Technologies Used
- **HTML5**  
- **CSS3**  
- **JavaScript**  
- **PHP**  
- **MySQL / phpMyAdmin**  
- **Font Awesome**  
- **Google Fonts**  

### JavaScript Features
- Responsive navigation menu  
- Carousels and slideshows  
- Story envelope animations  
- Newsletter popup behaviour  
- FAQ accordion  
- Review form validation & dynamic loading  

### SEO and Marketing Implementation for Website
- Page-specific meta descriptions  
- Open Graph metadata  
- Twitter Card metadata  
- JSON-LD structured data for:
  - Movie  
  - Organization  
  - Story (CreativeWork)  
  - FAQPage  
  - Website  
- Alt text on images & ARIA labels for accessibility  
- Social media integration (Instagram, Facebook) 
 - Review submission system for engagement  
- Newsletter subscription for ongoing communication  
- Structured metadata to support search engine ranking  

---

## Conclusion
The LUNA Film website demonstrates our combined efforts in design, development, storytelling, and digital strategy.

As a team, we created a complete multi-page promotional platform that:
- Communicates the film’s narrative and artistic vision as accurately as possible
- Encouraged the audience interaction  with a user-friendly design
- Supports marketing goals  
- Implements industry-standard SEO  
- Delivers an immersive and cohesive user experience  

This project reflects our skills in web technologies, creative media, and collaborative project management.

---

## How to Run the Project Locally

### Live Site
- Production URL: https://luna-film.com/
- Hosted on AWS (LAMP stack: Linux, Apache, MySQL, PHP)

### Prerequisites
- PHP 8.x (built-in server is fine for local dev)
- MySQL 5.7+ (or MariaDB equivalent)
- Composer (only if you want to manage PHPMailer via Composer instead of the bundled copy)

### 1) Clone and install (optional)
```bash
git clone https://github.com/Damouche-Billel/Luna-Project.git
cd Luna-Project
# If you prefer vendor-managed PHPMailer (optional):
# composer install --working-dir=phpmailer
```

### 2) Configure environment
- Update database/SMTP settings in `config.php` (DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, Brevo/SMTP keys).
- For security, avoid committing real credentials; use local-only values or environment injection if you deploy.

### 3) Prepare the database
You can let the contact/review scripts create tables on first run, or explicitly run the helpers:
```bash
# From repo root
php src/create_database.php   # creates the 'Luna' database if missing
php src/createtable.php       # creates required tables for reviews
```

### 4) Run the site locally
Use PHP’s built-in server from the `src` directory (where the HTML/PHP live):
```bash
cd src
php -S localhost:8000
```
Then open http://localhost:8000/index.html

### 5) Email / newsletter
- Outbound email/newsletter uses Brevo SMTP settings from `config.php`.
- If you don’t need email in local dev, you can leave credentials blank or use a dummy SMTP sandbox.

### 6) Troubleshooting
- If you see a blank/black screen, ensure `styles.css` is loading (check network tab) and `luna.css` is not overriding backgrounds.
- If forms fail to submit, verify MySQL is running and credentials in `config.php` match your local DB.
- For CORS issues when hosting assets elsewhere, serve everything from the same origin during local dev.
