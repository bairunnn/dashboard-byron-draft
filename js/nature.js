function showNatureContent() {
    let contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Nature Metrics</h3>
        <p>View the nature-related data and metrics for the selected sites.</p>
        <label for="project-dropdown" style="margin-bottom: 10px; display: block;">Select a Project:</label>
        <select id="project-dropdown" class="form-select mb-3">
            <option value="">-- Select a Project --</option>
        </select>
        <div id="bar-chart"></div>
        <p id="ranking" style="margin-top: 20px;"></p>
    `;

    const projectDropdown = document.getElementById('project-dropdown');
    const rankingParagraph = document.getElementById('ranking');

    // Sort data based on NParks_KM2 in descending order
    let sortedData = sitesData.features.sort((a, b) => b.properties.NParks_KM2 - a.properties.NParks_KM2);

    if (sortedData) {
        sortedData.forEach(feature => {
            const projectName = feature.properties.Project_Name;
            const option = document.createElement('option');
            option.value = projectName;
            option.textContent = projectName;
            projectDropdown.appendChild(option);
        });
    }

    // Create the bar chart using D3
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 120 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(sortedData, d => d.properties.NParks_KM2)]);

    const y = d3.scaleBand()
        .range([0, height])
        .domain(sortedData.map(d => d.properties.Project_Name))
        .padding(0.1);

    // Axes
    chart.append("g")
        .call(d3.axisLeft(y));

    chart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Create a tooltip div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // Bars
    const bars = chart.selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.properties.Project_Name))
        .attr("width", d => x(d.properties.NParks_KM2))
        .attr("height", y.bandwidth())
        .attr("fill", "#28c600") // Default color
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`${d.properties.Project_Name}<br>Area of surrounding parkland: ${d.properties.NParks_KM2.toFixed(2)} KM²`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Dropdown listener
    projectDropdown.addEventListener('change', function () {
        const selectedProjectName = this.value;

        // Update bar colors based on selected project
        bars.attr("fill", d => {
            if (selectedProjectName === "") {
                rankingParagraph.textContent = ""; // Clear ranking if no project selected
                return "#28c600"; // All green if no project is selected
            }
            const isSelected = d.properties.Project_Name === selectedProjectName;
            if (isSelected) {
                // Update ranking
                const rank = sortedData.findIndex(feature => feature.properties.Project_Name === selectedProjectName) + 1;
                rankingParagraph.textContent = `Ranking: #${rank} out of ${sortedData.length} projects`;
                return "#28c600"; // Highlight selected project
            } else {
                return "#e1e0dc"; // Other projects grey
            }
        });

        if (selectedProjectName && projectCoordinates[selectedProjectName]) {
            const coordinates = projectCoordinates[selectedProjectName];
            map.flyTo({
                center: coordinates,
                zoom: 15,
                essential: true
            });
        } else {
            map.flyTo({
                center: [103.809038, 1.353424],
                zoom: 10,
                essential: true
            });
        }
    });

    map.setPaintProperty('Sites_v6', 'fill-opacity', 1);
    map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
    map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-stroke-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-stroke-opacity', 0);
    map.setPaintProperty('Parks', 'fill-opacity', 1);
    map.setPaintProperty('ExistingHDBDissolved', 'fill-opacity', 0);
}