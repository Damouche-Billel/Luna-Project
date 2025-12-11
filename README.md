# Luna-Project

Marketing site for **LUNA**, a short romance film set in London. The project was built by Billel, Joshua, Shuayb, and Dimas to showcase the film’s story, cast, stills, reviews, and provide contact/newsletter funnels.

---

## Features
- Responsive landing page with cast carousel, gallery, blog callouts, and dynamic reviews.
- Contact form that persists submissions to MySQL and provides user feedback.
- Newsletter signup powered by Brevo (Sendinblue) transactional email API.
- Review system (submit + load endpoints) feeding both the dedicated reviews page and the homepage carousel.
- Admin utilities (PHPMailer, approval endpoints) located under `admin/`.

---

## Tech Stack
- **Frontend:** HTML5, CSS3 (`styles.css`, `luna.css`), vanilla JavaScript (`script.js`, `reviews.js`).
- **Backend:** PHP 8+, MySQL 8 (or compatible MariaDB).
- **Email:** Brevo SMTP/API (see `config.php`, `src/api/email-service.php`).
- **Libraries:** PHPMailer (bundled under `phpmailer/`).

---

## Prerequisites
| Dependency | Notes |
|------------|-------|
| PHP 8+     | Ensure `mysqli`, `curl`, and `openssl` extensions are enabled. |
| MySQL 8+ / MariaDB | Create a database named `Luna`. |
| Composer (optional) | For installing/updating PHPMailer if needed. |
| Brevo account | Needed for newsletter confirmation emails. |

---

## Initial Setup
1. **Clone / download** the repository and place it in your web root (e.g., `htdocs/Luna-Project`).
2. **Database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS Luna;

   -- Contact form table
   CREATE TABLE IF NOT EXISTS Contact_Details (
	   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   Firstname VARCHAR(50) NOT NULL,
	   Surname VARCHAR(50) NOT NULL,
	   Email VARCHAR(100) NOT NULL,
	   Message TEXT NOT NULL,
	   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Newsletter table (auto-created by API but safe to run manually)
   CREATE TABLE IF NOT EXISTS NewsletterEmails (
	   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   email VARCHAR(255) NOT NULL UNIQUE,
	   is_active TINYINT(1) DEFAULT 1,
	   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Reviews table
   CREATE TABLE IF NOT EXISTS reviews (
	   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   name VARCHAR(255) NOT NULL,
	   rating TINYINT NOT NULL,
	   message TEXT NOT NULL,
	   approved TINYINT(1) DEFAULT 0,
	   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
3. **Credentials:** update the following files if your MySQL user/password differ:
   - `database.php` (project root) and `src/database.php`
   - `config.php` (Brevo keys + DB fallback)
4. **Brevo:** set `BREVO_API_KEY` and `BREVO_API_PASSWORD` in `config.php`. These are used when the newsletter API calls `sendWelcomeEmail()`.
5. *(Optional)* Run `composer install` inside `phpmailer/` if you need to refresh vendor files.

---

## Running Locally
### Option A – Built-in PHP server
```bash
php -S localhost:8000 -t src
```
Visit `http://localhost:8000/index.html`.

### Option B – Apache/Nginx
Point your virtual host’s document root to the `src/` directory and restart the web server.

---

## Backend Test Checklist
All endpoints live under `src/`.

### 1. Newsletter subscription (`api/newsletter-subscribe.php`)
```bash
curl -X POST http://localhost:8000/api/newsletter-subscribe.php \
	 -H "Content-Type: application/json" \
	 -d '{"email":"tester@example.com"}'
```
Expected:
- JSON `{"success":true,...}`
- Row inserted/updated in `NewsletterEmails`.
- Welcome email (logs visible in `php_error.log` if cURL fails).

### 2. Contact form (`contact-us.php`)
1. Open `http://localhost:8000/contact-us.php`.
2. Submit the form; modal confirmation should display.
3. Verify the record exists in `Contact_Details`.

### 3. Reviews API
- **Load reviews:** `curl http://localhost:8000/load_reviews.php` → returns JSON array of approved reviews.
- **Submit review:** POST (form or API) to `submit_review.php` with fields `name`, `lname`, `email`, `rating`, `message`. Confirm insert into `reviews` table (and PHPMailer email if enabled).

### 4. Email service
If you need to test Brevo independently:
```bash
php src/api/email_service_test.php
```
or call `sendWelcomeEmail('you@example.com');` inside a one-off script after including `email-service.php`.

---

## Deployment Notes (AWS Lightsail / Bitnami)
1. Upload the repository contents to `/opt/bitnami/apache2/htdocs/` (keep `src/` hierarchy).
2. Ensure `index.php` at the root redirects to `/src/index.html` so visiting your domain loads the site.
3. Set file permissions: `sudo chown -R bitnami:daemon /opt/bitnami/apache2/htdocs`.
4. Restart Apache: `sudo /opt/bitnami/ctlscript.sh restart apache`.
5. DNS: point your domain’s A record to the instance IP and optionally add `www` as a CNAME.

---

## Project Structure
```
├── admin/                # Approval/login utilities
├── phpmailer/            # PHPMailer library
├── src/
│   ├── api/              # Newsletter + email services
│   ├── data/, fonts/, images/ etc.
│   ├── load_reviews.php
│   ├── submit_review.php
│   ├── contact-us.php
│   ├── script.js, reviews.js
│   └── styles.css, luna.css
├── database.php          # Root DB helper
├── config.php            # Brevo + DB config
└── README.md
```

---

## Troubleshooting
- **500 Internal Server Error:** check `/opt/bitnami/apache/logs/error_log` (production) or `php_error.log` (local). Common causes: wrong DB password, missing PHP extensions, incorrect include path.
- **No emails from newsletter:** ensure Brevo key is valid and outbound HTTPS (port 443) is allowed. Look at logs generated by `email-service.php`.
- **CORS/JSON parse errors:** confirm headers in `newsletter-subscribe.php` and that requests hit `https://yourdomain/src/api/...`.

---

## Authors
- Billel
- Joshua
- Shuayb
- Dimas
