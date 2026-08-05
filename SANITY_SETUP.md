# Sanity CMS Setup & Deployment Guide

This guide describes how to set up, configure, run, and deploy the private Sanity Studio for **Singapore Textiles & Readymades**. Following these steps will allow the store owner to add, edit, and publish products without changing any website code.

---

## Step 1: Create a Sanity Project

1. Install the Sanity CLI globally on your system (optional) or run it using `npm`:
   ```bash
   npm install -g sanity
   ```
2. Create a free Sanity account or log in at [sanity.io](https://www.sanity.io/).
3. Create a new project:
   ```bash
   sanity init
   ```
   - Name the project: `Singapore Textiles Readymades`
   - Select project configuration: `Default configuration`
   - Dataset name: `production` (default)
4. Copy the **Project ID** from the command output or from your Sanity dashboard.

---

## Step 2: Configure Environment Variables

Create a file named `.env` in your React website root (use `.env.example` as a template):

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-11
VITE_SANITY_USE_CDN=true
```

---

## Step 3: Add CORS Origins in Sanity Dashboard

To allow your website to fetch products, you must whitelist the website domains:

1. Go to your Sanity project dashboard at [manage.sanity.io](https://manage.sanity.io/).
2. Select your project and navigate to the **API** tab.
3. Scroll down to **CORS Origins** and click **Add CORS origin**.
4. Add these origins:
   - For local development: `http://localhost:3000` (Allow credentials: Checked)
   - For live deployment: `https://yourdomain.com` or your hosting URL (Allow credentials: Checked)

---

## Step 4: Run Sanity Studio Locally

1. Go to the `/studio/` folder in this repository.
2. Install Studio-specific dependencies (if running standalone) or run the dev server:
   ```bash
   cd studio
   npm install
   npm run dev
   ```
3. Open `http://localhost:3333` in your browser.
4. Log in using your Sanity developer account.

---

## Step 5: Initialize the Six Categories

In the Sanity Studio interface, go to **Categories** and create exactly these six category documents. Ensure you enter the correct **Category Key** from the dropdown so they connect to the frontend routes automatically:

1. **Men’s Wear**
   - Category Key: `mens`
   - Slug: `mens`
2. **Women’s Wear**
   - Category Key: `womens`
   - Slug: `womens`
3. **Kids & Baby**
   - Category Key: `kids-baby`
   - Slug: `kids-baby`
4. **Group Dresses**
   - Category Key: `group-dresses`
   - Slug: `group-dresses`
5. **Islamic Collection**
   - Category Key: `islamic`
   - Slug: `islamic`
6. **Home Essentials**
   - Category Key: `home-essentials`
   - Slug: `home-essentials`

Upload a beautiful cover image for each category and click **Publish** in the bottom right corner.

---

## Step 6: Upload and Publish Products

1. In the Studio, select **All Products** -> **Create New**.
2. Complete the fields:
   - Product Name
   - Product Code (e.g. `ST-101`)
   - Category Association (reference one of the 6 categories you created)
   - Product Type (e.g. `Formal Shirt`, `Chudithar`, `Hijab`, `Bedsheet`)
   - Upload Product Images (min 1, max 4; add alternative description text to each image)
   - Available/Unavailable Sizes
   - Stock Status (`In Stock`, `Limited Stock`, `Out of Stock`)
3. Click the green **Publish** button. The product will instantly appear in the correct collection page on the customer-facing website!

---

## Step 7: Deploy Sanity Studio

To let the owner manage stock from any phone or computer:

1. Build and host the studio on Sanity’s cloud:
   ```bash
   cd studio
   sanity deploy
   ```
2. Enter a unique subdomain prefix (e.g. `singapore-textiles-readymades`).
3. The owner can now log in at `https://singapore-textiles-readymades.sanity.studio` to upload photos and update stock!

---

## Step 8: Deploy the React Website & Configure SPA Route Fallback

Since this is a Single Page Application (SPA) using React Router for collection pages, you must configure your web hosting provider to rewrite unknown URLs to `index.html`.

### Netlify (`public/_redirects` or `netlify.toml`)
Create a `public/_redirects` file with this content:
```text
/*    /index.html   200
```

### Vercel (`vercel.json`)
Add a `vercel.json` configuration file:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Firebase Hosting (`firebase.json`)
Add rewrites to your hosting configuration:
```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Apache (`.htaccess`)
Add this rewrite rule:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
