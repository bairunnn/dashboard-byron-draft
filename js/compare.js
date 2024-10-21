function resetLayout() {
    let contentPanel = document.getElementById('description-panel');
    let mapPanel = document.getElementById('map');
    let resetButton = document.getElementById('reset-button');

    // Reset widths to default when not in compare section
    contentPanel.style.width = "30%";  // Default content panel width
    mapPanel.style.width = "60%";       // Default map panel width
    resetButton.style.display = 'block';

    // Reset map properties to show all layers (adjust as necessary)
    map.setPaintProperty('Sites_v6', 'fill-opacity', 0); // Hide or reset properties
    map.setPaintProperty('MRTLines_20240914', 'line-opacity', 1);
    map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 1);
    map.setPaintProperty('HawkerCentres', 'circle-opacity', 1);
    map.setPaintProperty('HawkerCentres', 'circle-stroke-opacity', 1);
    map.setPaintProperty('PublicLibraries', 'circle-opacity', 1);
    map.setPaintProperty('PublicLibraries', 'circle-stroke-opacity', 1);
    map.setPaintProperty('Parks', 'fill-opacity', 1);
    map.setPaintProperty('ExistingHDBDissolved', 'fill-opacity', 1);
}

function showCompareContent() {
    let contentPanel = document.getElementById('description-panel');
    let mapPanel = document.getElementById('map');
    let resetButton = document.getElementById('reset-button');

    resetButton.style.display = 'none';

    // Set the font size for the entire content panel
    contentPanel.innerHTML = `
        <h3>Compare Sites</h3>
        <div class="compare-buttons">
            <button id="compare-rankings" class="btn btn-primary active" onclick="showRankings()">Compare rankings</button>
            <button id="compare-price" class="btn btn-primary" onclick="showPrices()">Compare resale prices</button>
        </div>
        <p>Compare the rankings for each variable across the different projects.</p>
        <p>Cells shaded in <span style="background-color: #d7d4c3; padding: 2px;">gold</span> represent the higher ranking.</p>
        <table id="comparison-table" class="table">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th>
                        <select id="site1-dropdown" class="form-select mb-3" onchange="updateTable()">
                            <option value="">-- Select Site 1 --</option>
                        </select>
                    </th>
                    <th>
                        <select id="site2-dropdown" class="form-select mb-3" onchange="updateTable()">
                            <option value="">-- Select Site 2 --</option>
                        </select>
                    </th>
                    <th>
                        <select id="site3-dropdown" class="form-select mb-3" onchange="updateTable()">
                            <option value="">-- Select Site 3 --</option>
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle-nature" checked onchange="toggleRow('nature')">
                            <label class="form-check-label" for="toggle-nature">Nature ranking</label>
                        </div>
                    </td>
                    <td id="site1-nature"></td>
                    <td id="site2-nature"></td>
                    <td id="site3-nature"></td>
                </tr>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle-mrt" checked onchange="toggleRow('mrt')">
                            <label class="form-check-label" for="toggle-mrt">MRT ranking</label>
                        </div>
                    </td>
                    <td id="site1-mrt"></td>
                    <td id="site2-mrt"></td>
                    <td id="site3-mrt"></td>
                </tr>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle-cycling" checked onchange="toggleRow('cycling')">
                            <label class="form-check-label" for="toggle-cycling">Cycling ranking</label>
                        </div>
                    </td>
                    <td id="site1-cycling"></td>
                    <td id="site2-cycling"></td>
                    <td id="site3-cycling"></td>
                </tr>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle-hawker" checked onchange="toggleRow('hawker')">
                            <label class="form-check-label" for="toggle-hawker">Hawker ranking</label>
                        </div>
                    </td>
                    <td id="site1-hawker"></td>
                    <td id="site2-hawker"></td>
                    <td id="site3-hawker"></td>
                </tr>
                <tr>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle-library" checked onchange="toggleRow('library')">
                            <label class="form-check-label" for="toggle-library">Library ranking</label>
                        </div>
                    </td>
                    <td id="site1-library"></td>
                    <td id="site2-library"></td>
                    <td id="site3-library"></td>
                </tr>
            </tbody>
        </table>
    `;
    
    // Populate the dropdowns with project names from your site data
    populateDropdowns();

    // Set widths for panels when the compare section is active
    contentPanel.style.width = "90%";  // Content panel takes 90%
    mapPanel.style.width = "0%";       // Map panel is hidden

    // Update map properties for site comparison
    map.setPaintProperty('Sites_v6', 'fill-opacity', 1);
    map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
    map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-stroke-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-stroke-opacity', 0);
    map.setPaintProperty('Parks', 'fill-opacity', 0);
    map.setPaintProperty('ExistingHDBDissolved', 'fill-opacity', 0);
}

function showRankings() {
    // Call showCompareContent to display the rankings
    showCompareContent();
}

function showPrices() {
    const contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Compare Sites</h3>
        <div class="compare-buttons">
            <button id="compare-rankings" class="btn btn-primary" onclick="showRankings()">Compare rankings</button>
            <button id="compare-price" class="btn btn-primary active" onclick="showPrices()">Compare Resale Prices</button>
        </div>
        <p>Compare trends for resale prices from 2017 - 2024</p>
        <div id="town-container" style="display: flex; align-items: center;">
            <div id="town-dropdown" style="margin-right: 20px;">
                <label for="town-select">Select Town:</label>
                <select id="town-select">
                    <option value="" selected disabled>Select a town</option>
                </select>
            </div>
            <div id="selected-towns" style="display: flex; flex-wrap: wrap;"></div> <!-- Display selected towns with cross -->
        </div>
        <div id="line-chart"></div>  <!-- Div for the line chart -->
    `;

    // Load the CSV data and create the line graph
    d3.csv('./assets/layers/price_index.csv').then(data => {
        // Parse the data
        data.forEach(d => {
            d.year = +d.year; // Convert year to number
            d.rebased_psf = +d.rebased_psf; // Convert rebased_psf to number
        });

        // Nest the data by town
        const towns = d3.group(data, d => d.town);
        const townNames = Array.from(towns.keys()).filter(town => town !== "Singapore"); // Exclude "Singapore"

        // Populate the dropdown with town names (excluding "Singapore")
        const townSelect = d3.select("#town-select");
        townNames.forEach(town => {
            townSelect.append("option")
                .attr("value", town)
                .text(town);
        });

        // Set dimensions for the SVG
        const margin = {top: 20, right: 70, bottom: 30, left: 40};  // Increase the right margin
        const width = window.innerWidth * 0.6 - margin.left - margin.right; // 60% of the viewport width
        const height = 400 - margin.top - margin.bottom;


        // Create the SVG element
        const svg = d3.select("#line-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set the scales
        const x = d3.scaleLinear()
            .domain([2017, 2024]) // Set x-axis domain from 2017 to 2024
            .range([0, width]);

        // Set the y-axis scale with a fixed range
        const y = d3.scaleLinear()
            .domain([70, 170]) // Set domain from 70 to 150
            .range([height, 0]);

        // Add the axes
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(8) // 8 ticks for intervals of 1 from 2017 to 2024
                .tickFormat(d => d)); // Remove commas by using the default format

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).ticks(11)); // Use 9 ticks for intervals of 10 (70 to 150)

        // Define a line generator
        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.rebased_psf));

        // Create a tooltip for hover effect
        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.7)")
            .style("color", "#fff")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("visibility", "hidden")
            .style("font-size", "12px");

        // Draw the lines for each town, initially set to default colors
        const townLines = {};
        towns.forEach((townData, townName) => {
            const color = townName === "Singapore" ? "#af3330" : "#c8c8c3"; // Initial color

            const path = svg.append("path")
                .datum(townData)
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", 1.5)
                .attr("d", line)
                .on("mouseover", function() {
                    tooltip.style("visibility", "visible")
                        .text(townName);
                    d3.select(this).attr("stroke-width", 3); // Highlight the line on hover
                })
                .on("mousemove", function(event) {
                    tooltip
                        .style("top", (event.pageY - 20) + "px")
                        .style("left", (event.pageX + 20) + "px");
                })
                .on("mouseout", function() {
                    tooltip.style("visibility", "hidden");
                    d3.select(this).attr("stroke-width", 1.5); // Reset stroke width
                });

            // Store the path for future updates
            townLines[townName] = path;

            // Add a label for Singapore by default
            if (townName === "Singapore") {
                svg.append("text")
                    .datum(townData[townData.length - 1]) // Position text at the last point
                    .attr("x", x(2024) + 5) // Position it slightly to the right of the last year
                    .attr("y", y(townData[townData.length - 1].rebased_psf))
                    .attr("fill", "#af3330")
                    .attr("font-size", "12px")
                    .attr("dy", "1em")
                    .text("Singapore");
            }
        });

        // Function to update town color on selection and label it
        function updateSelectedTowns(selectedTown) {
            const selectedTownsDiv = d3.select("#selected-towns");

            // Display the selected town with a cross to deselect it
            const townEntry = selectedTownsDiv.append("div")
                .attr("class", "selected-town")
                .style("margin-right", "10px")
                .style("padding", "5px 10px")
                .style("background-color", "#f0f0f0")
                .style("border-radius", "5px")
                .style("cursor", "pointer")
                .text(`${selectedTown} ×`)
                .on("click", function() {
                    // Deselect town and remove the entry
                    d3.select(this).remove();
                    townLines[selectedTown].attr("stroke", selectedTown === "Singapore" ? "#af3330" : "#c8c8c3"); // Reset color

                    // Remove the label for the town
                    svg.select(`.label-${selectedTown.replace(/\s+/g, '-')}`).remove();
                });

            // Change the line color for the selected town to #5e5d5b
            townLines[selectedTown].attr("stroke", "#5e5d5b");

            // Add a label at the end of the line
            const townData = towns.get(selectedTown);
            svg.append("text")
                .datum(townData[townData.length - 1]) // Position text at the last point
                .attr("class", `label-${selectedTown.replace(/\s+/g, '-')}`) // Unique class for removal
                .attr("x", x(2024) + 5) // Position it slightly to the right of the last year
                .attr("y", y(townData[townData.length - 1].rebased_psf))
                .attr("fill", "#5e5d5b")
                .attr("font-size", "12px")
                .attr("dy", "1em")
                .text(selectedTown);
        }

        // Event listener for town selection
        townSelect.on("change", function() {
            const selectedTown = d3.select(this).property("value");
            if (selectedTown) {
                updateSelectedTowns(selectedTown);
            }
        });
    });
}

function populateDropdowns() {
    const site1Dropdown = document.getElementById('site1-dropdown');
    const site2Dropdown = document.getElementById('site2-dropdown');
    const site3Dropdown = document.getElementById('site3-dropdown');

    // Assuming `sitesData` is available and contains the project names
    sitesData.features.forEach(site => {
        const option = document.createElement('option');
        option.value = site.properties.Project_Name;
        option.textContent = site.properties.Project_Name;
        site1Dropdown.appendChild(option.cloneNode(true));
        site2Dropdown.appendChild(option.cloneNode(true));
        site3Dropdown.appendChild(option);
    });
}

function updateTable() {
    const site1Dropdown = document.getElementById('site1-dropdown');
    const site2Dropdown = document.getElementById('site2-dropdown');
    const site3Dropdown = document.getElementById('site3-dropdown');
    
    const site1Value = site1Dropdown.value;
    const site2Value = site2Dropdown.value;
    const site3Value = site3Dropdown.value;

    // Find selected sites in the sitesData
    const site1Data = sitesData.features.find(site => site.properties.Project_Name === site1Value);
    const site2Data = sitesData.features.find(site => site.properties.Project_Name === site2Value);
    const site3Data = sitesData.features.find(site => site.properties.Project_Name === site3Value);

    // Populate the table with rankings
    document.getElementById('site1-nature').textContent = site1Data ? site1Data.properties.rank_NParks_KM2 : '';
    document.getElementById('site2-nature').textContent = site2Data ? site2Data.properties.rank_NParks_KM2 : '';
    document.getElementById('site3-nature').textContent = site3Data ? site3Data.properties.rank_NParks_KM2 : '';

    document.getElementById('site1-mrt').textContent = site1Data ? site1Data.properties.rank_NEAR_MRT : '';
    document.getElementById('site2-mrt').textContent = site2Data ? site2Data.properties.rank_NEAR_MRT : '';
    document.getElementById('site3-mrt').textContent = site3Data ? site3Data.properties.rank_NEAR_MRT : '';

    document.getElementById('site1-cycling').textContent = site1Data ? site1Data.properties.rank_CYCLE_M : '';
    document.getElementById('site2-cycling').textContent = site2Data ? site2Data.properties.rank_CYCLE_M : '';
    document.getElementById('site3-cycling').textContent = site3Data ? site3Data.properties.rank_CYCLE_M : '';

    document.getElementById('site1-hawker').textContent = site1Data ? site1Data.properties.rank_NEAR_HAWKER : '';
    document.getElementById('site2-hawker').textContent = site2Data ? site2Data.properties.rank_NEAR_HAWKER : '';
    document.getElementById('site3-hawker').textContent = site3Data ? site3Data.properties.rank_NEAR_HAWKER : '';

    document.getElementById('site1-library').textContent = site1Data ? site1Data.properties.rank_NEAR_LIB : '';
    document.getElementById('site2-library').textContent = site2Data ? site2Data.properties.rank_NEAR_LIB : '';
    document.getElementById('site3-library').textContent = site3Data ? site3Data.properties.rank_NEAR_LIB : '';

    // Call the function to shade the lower-valued cells
    shadeLowerValuedCells();
}

function shadeLowerValuedCells() {
    const rankings = {
        nature: [
            document.getElementById('site1-nature'),
            document.getElementById('site2-nature'),
            document.getElementById('site3-nature'),
        ],
        mrt: [
            document.getElementById('site1-mrt'),
            document.getElementById('site2-mrt'),
            document.getElementById('site3-mrt'),
        ],
        cycling: [
            document.getElementById('site1-cycling'),
            document.getElementById('site2-cycling'),
            document.getElementById('site3-cycling'),
        ],
        hawker: [
            document.getElementById('site1-hawker'),
            document.getElementById('site2-hawker'),
            document.getElementById('site3-hawker'),
        ],
        library: [
            document.getElementById('site1-library'),
            document.getElementById('site2-library'),
            document.getElementById('site3-library'),
        ],
    };

    for (const key in rankings) {
        const cells = rankings[key];
        const values = cells.map(cell => parseFloat(cell.textContent) || Infinity); // Convert to float or Infinity if empty

        // Check if at least two projects are selected
        const selectedCount = values.filter(value => !isNaN(value)).length;
        if (selectedCount >= 2) {
            const minValue = Math.min(...values);
            cells.forEach((cell, index) => {
                if (parseFloat(cell.textContent) === minValue) {
                    cell.style.backgroundColor = '#d7d4c3'; // Shade the cell
                } else {
                    cell.style.backgroundColor = ''; // Reset background for other cells
                }
            });
        } else {
            cells.forEach(cell => {
                cell.style.backgroundColor = ''; // Reset background if less than 2 projects are selected
            });
        }
    }
}

function toggleRow(variable) {
    const checkBox = document.getElementById(`toggle-${variable}`);
    const rows = [
        `site1-${variable}`,
        `site2-${variable}`,
        `site3-${variable}`
    ];

    rows.forEach(rowId => {
        const row = document.getElementById(rowId);
        if (checkBox.checked) {
            row.style.color = '';  // Reset to normal color
        } else {
            row.style.color = '#f8f7f0';  // Set text color to grey
        }
    });
}