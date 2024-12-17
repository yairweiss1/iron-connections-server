const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Read Excel file
const workbook = XLSX.readFile('contacts.xlsx');
const sheet_name_list = workbook.SheetNames;
const contacts = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

app.get('/search', (req, res) => {
  const searchTerm = req.query.searchText.toLowerCase();
  const result = contacts.filter(contact => 
    Object.values(contact).some(field => 
      String(field).toLowerCase().includes(searchTerm)
    )
  );
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
