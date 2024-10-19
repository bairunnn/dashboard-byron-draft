function showNatureContent() {
    let contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Nature Metrics</h3>
        <p>View the nature-related data and metrics for the selected sites.</p>
        <label for="project-dropdown" style="margin-bottom: 10px; display: block;">Select a Project:</label>
        <select id="project-dropdown" class="form-select mb-3">
            <option value="">-- Select a Project --</option>
        </select>
    `;

    const projectDropdown = document.getElementById('project-dropdown');

    if (sitesData && sitesData.features) {
        sitesData.features.forEach(feature => {
            const projectName = feature.properties.Project_Name;
            const option = document.createElement('option');
            option.value = projectName;
            option.textContent = projectName;
            projectDropdown.appendChild(option);
        });
    }

    // Event listener for project selection
    projectDropdown.addEventListener('change', function() {
        const selectedProjectName = this.value;

        if (selectedProjectName && projectCoordinates[selectedProjectName]) {
            const coordinates = projectCoordinates[selectedProjectName];
            
            // Assuming `map` is the mapbox instance from map.js
            map.flyTo({
                center: coordinates,
                zoom: 15,
                essential: true // this ensures smooth zooming experience
            });
        } else {
            map.flyTo({
                center: [103.809038, 1.353424],
                zoom: 10,
                essential: true // this ensures smooth zooming experience
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