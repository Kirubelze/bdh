/**
 * Google Apps Script to handle booking form submissions.
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Add header row in the first row with these exact names:
 *    full_name, phone, email, address, service_residential, service_deep, service_office, service_move, service_construction, service_custom, message, submitted_at
 * 3. Go to Extensions > Apps Script.
 * 4. Paste this code, replacing any existing code.
 * 5. Save (Ctrl+S).
 * 6. Click "Deploy" > "New deployment".
 * 7. Select type "Web app".
 * 8. Set "Description" to "Booking API".
 * 9. Set "Execute as" to "Me".
 * 10. Set "Who has access" to "Anyone".
 * 11. Click "Deploy".
 * 12. Copy the "Web app URL" and paste it into your index.html file where indicated.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Parse the request body
    const data = JSON.parse(e.postData.contents);
    
    // Map data to row based on headers
    const newRow = headers.map(header => {
      // Handle boolean values for checkboxes
      if (typeof data[header] === 'boolean') {
        return data[header] ? 'TRUE' : 'FALSE';
      }
      return data[header] || '';
    });
    
    // Append the new row
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS request for CORS
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .append('Access-Control-Allow-Origin: *\n')
    .append('Access-Control-Allow-Methods: POST, GET, OPTIONS\n')
    .append('Access-Control-Allow-Headers: Content-Type\n');
}
