// Import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Convert data to table format
function buildTable(data) {
    
    // Clear the existing data from table
    tbody.html("");

    // loop through each object in data and append row and cells for each value in the row
    data.forEach((dataRow) => {
        // append a row to the table body
        let row = tbody.append("tr");

        // loop through each field in the dataRow and add each value as table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}


function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    
    // Check entry for the date 
    if (date) {
        // Filter to only keep row with datetime value matching the entered date
        filteredData = filteredData.filter(row => row.datetime === date);
    }
    // Rebuilding table with filtered data
    buildTable(filteredData);
}

// Button with id="filter-btn" will execute handleClick 
d3.select("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);