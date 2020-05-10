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

// Keep track of all filters
var filterCategories = ["datetime", "city", "state", "country", "shape"];


function handleClick() {
    // Refresh the filteredData
    let filteredData = tableData;
    
    // Store the value entered for each filter category
    let filterValues = [
        d3.select("#datetime").property("value"),
        d3.select("#city").property("value"),
        d3.select("#state").property("value"),
        d3.select("#country").property("value"),
        d3.select("#shape").property("value")
    ];

    function updateFilters(category) {
        // Return value for selected category
        let i = filterCategories.indexOf(category);
        filterValue = filterValues[i];

        // If a filter value was entered then apply filter to filteredData
        if (filterValue) {
            filteredData = filteredData.filter(row => row[category] === filterValue);
        };
    };

    // Apply filters
    filterCategories.forEach(category => updateFilters(category));

    // Rebuilding table with filtered data
    buildTable(filteredData);
}

// Button with id="filter-btn" will execute handleClick 
d3.select("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);