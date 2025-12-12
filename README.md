# LUNA Film Website – Academic Project README

**Live Website:** [luna-film.com](https://luna-film.com)  
**GitHub Repository:** [https://github.com/Damouche-Billel/Luna-Project.git](https://github.com/Damouche-Billel/Luna-Project.git)

## Introduction
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
-	Set up the GitHub main branch and organised the project structure.
-	Built the nav bar and footer, which is the base layout for the website, asked everyone in the team to make their own branches, so our work stayed organised.
-	Home page
- Story page
- Merged all branches to the main
-	SEO implementation and newsletter backend with SMTP and popup feature.
-	User personas document.
-	Branding and visual identity document.
- Domain & Hosting
-	Created first prototype of the website to show the film students. They liked it, and we used that design.
-	Code assistance & bug fixing for team members.
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

## How to Run the Project

### Live Site
- **URL:** [https://luna-film.com/](https://luna-film.com/)
- **Hosting:** Cloud Server (LAMP stack: Linux, Apache, MySQL, PHP)

### Prerequisites
- **PHP 8.x** (with `php-curl` enabled for email services)
- **MySQL 5.7+** or **MariaDB**
- **Apache Web Server** (recommended) or PHP built-in server for testing

### 1. Clone the Repository
```bash
git clone https://github.com/Damouche-Billel/Luna-Project.git
cd Luna-Project
```

### 2. Configuration
1. Open `config.php` in the root directory.
2. Update the **Database Configuration**:
   ```php
   define('DB_HOST', '127.0.0.1');
   define('DB_NAME', 'Luna');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', 'your_password');
   ```
3. Update the **Brevo API Configuration** (for emails):
   ```php
   define('BREVO_API_KEY', 'your_brevo_api_key');
   ```

### 3. Database Setup
Initialize the database and tables using the setup script:
```bash
# From the project root
php src/setup_tables.php
```
*Alternatively, you can access `http://localhost/Luna-Project/src/setup_tables.php` in your browser.*

### 4. Run Locally
You can use PHP's built-in server for testing:
```bash
cd src
php -S localhost:8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### 5. Troubleshooting
- **Email Issues:** Ensure `php-curl` is installed and enabled. Check `config.php` for correct API keys.
- **Database Connection:** Ensure MySQL is running and credentials in `config.php` are correct.
- **Styles Not Loading:** Check that `styles.css` and `luna.css` paths are correct relative to the HTML files.
- If forms fail to submit, verify MySQL is running and credentials in `config.php` match your local DB.
- For CORS issues when hosting assets elsewhere, serve everything from the same origin during local dev.
