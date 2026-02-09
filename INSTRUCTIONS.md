# How to Connect Your Booking Form to Google Sheets

Since I cannot access your Google Account, you need to perform these one-time setup steps.

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new sheet.
2. **Important:** In the first row (Row 1), create these exact headers:
   - Cell A1: `full_name`
   - Cell B1: `phone`
   - Cell C1: `email`
   - Cell D1: `address`
   - Cell E1: `service_residential`
   - Cell F1: `service_deep`
   - Cell G1: `service_office`
   - Cell H1: `service_move`
   - Cell I1: `service_construction`
   - Cell J1: `service_custom`
   - Cell K1: `message`
   - Cell L1: `submitted_at`

## Step 2: Add the Backend Script
1. In your Google Sheet, click on **Extensions** > **Apps Script** in the top menu.
2. Delete any code currently in the `Code.gs` file.
3. Open the file `google_apps_script.js` from this project folder.
4. Copy **all** the code from `google_apps_script.js` and paste it into the Apps Script editor.
5. Save the project (File > Save or Ctrl+S). Name it "Booking Backend" if asked.

## Step 3: Deploy as Web App
1. Click the blue **Deploy** button at the top right, then select **New deployment**.
2. Click the entries so they match this **EXACTLY**:
   - **Select type**: Web app
   - **Description**: Booking Backend
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
3. Click **Deploy**.
4. You might be asked to "Authorize access". Click "Review permissions", choose your account, and if you see a warning "Google hasn't verified this app", click **Advanced** -> **Go to (Project Name) (unsafe)** -> **Allow**. (This is safe because it's your own code).
5. Copy the **Web app URL** (it ends in `/exec`).

## Step 4: Connect the Frontend
1. Open `index.html` in your editor.
2. Look for line ~590 where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual Web App URL from Step 3.
   Example:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file.

## Step 5: Test
1. Open `index.html` in your browser.
2. Fill out the form and submit.
3. Check your Google Sheet to see the new row appear!
