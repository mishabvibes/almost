// src/app/(admin)/donations/all/exportFunctions.tsx

/**
 * Convert JSON data to CSV format
 */
export const jsonToCSV = (data: Donation[]): string => {
  if (data.length === 0) return '';

  // Get headers from the first object
  const headers = Object.keys(data[0]) as (keyof Donation)[];

  // Create CSV header row
  const csvRows = [headers.join(',')];

  // Create CSV data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]?.toString() || '';
      // Escape commas and quotes in values
      return `"${value.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

/**
 * Export data as CSV file
 */
export const exportToCSV = (data: Donation[], fileName: string = 'donations-export'): void => {
  // Clean up data before export
  const cleanData: Donation[] = data.map((item) => ({
    id: item.id,
    donor: item.donor, // Fixed donor_name issue
    amount: item.amount.replace('₹', ''),
    type: item.type,
    status: item.status,
    date: item.date,
    email: item.email,
    phone: item.phone,
  }));

  const csv = jsonToCSV(cleanData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

/**
 * Print-friendly export (creates a new window optimized for printing to PDF)
 */
export const printToPDF = (data: Donation[], title: string = 'Donations Report'): void => {
  // Clean data for printing
  const cleanData = data.map((item) => ({
    id: item.id,
    donor: item.donor,
    amount: item.amount,
    type: item.type,
    status: item.status,
    date: new Date(item.date).toLocaleDateString(),
  }));

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print this report');
    return;
  }

  // Generate table HTML
  const tableRows = cleanData
    .map(
      (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.donor}</td>
        <td>${item.amount}</td>
        <td>${item.type}</td>
        <td>${item.status}</td>
        <td>${item.date}</td>
      </tr>
    `
    )
    .join('');

  // Add document HTML with styling
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
          }
          h1 {
            color: #2e7d32;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .timestamp {
            color: #666;
            font-size: 12px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background-color: #f5f5f5;
            padding: 10px;
            text-align: left;
            font-weight: bold;
            border-bottom: 2px solid #ddd;
          }
          td {
            padding: 8px 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          @media print {
            body {
              padding: 0;
              color: black;
            }
            h1 {
              color: black;
            }
            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="timestamp">Generated on: ${new Date().toLocaleString()}</div>
        <div class="print-button">
          <button onclick="window.print();return false;" style="padding: 8px 16px; background: #2e7d32; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 20px;">
            Print / Save as PDF
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
};

/**
 * Handle export based on selected type
 */
export const handleExport = (data: Donation[], exportType: 'csv' | 'pdf'): void => {
  if (exportType === 'csv') {
    exportToCSV(data);
  } else {
    printToPDF(data);
  }
};

// Define the Donation type
interface Donation {
  id: string;
  donor: string;
  amount: string;
  type: string;
  status: string;
  date: string;
  email: string;
  phone: string;
}
