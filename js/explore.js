function showExploreContent() {
    const contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Explore Sites</h3>
        <p>Select a project to view its details.</p>
        <label for="project-dropdown">Select a Project:</label>
        <select id="project-dropdown" class="form-select mb-3">
            <option value="">-- Select a Project --</option>
        </select>
        <div id="project-details" class="mt-3"></div>
        <button id="locate-button" class="btn btn-primary">Locate Me</button>
    `;

    // Populate the dropdown with project names from the loaded GeoJSON data
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
        const projectDetailsDiv = document.getElementById('project-details');
        
        if (selectedProjectName) {
            const selectedFeature = sitesData.features.find(feature => feature.properties.Project_Name === selectedProjectName);
            if (selectedFeature) {
                const { OBJECTID, Units, NEAR_HAWKER, NEAR_MRT, NParks_KM2, NEAR_LIB, CYCLE_M, MATURE_KM2 } = selectedFeature.properties;
                
                // Display the selected project's details
                projectDetailsDiv.innerHTML = `
                <h5>${selectedProjectName}</h5>
                <p><strong>Units:</strong> ${Units}</p>
                <p><strong>Distance to nearest Hawker Centre:</strong> ${NEAR_HAWKER.toFixed(2)} m</p>
                <p><strong>Distance to nearest MRT:</strong> ${NEAR_MRT.toFixed(2)} m</p>
                <p><strong>NParks (KM²):</strong> ${NParks_KM2.toFixed(2)}</p>
                <p><strong>Distance to nearest library:</strong> ${NEAR_LIB.toFixed(2)} m</p>
                <p><strong>Length of cycling paths:</strong> ${CYCLE_M.toFixed(2)} m</p>
                <p><strong>Mature Area (KM²):</strong> ${MATURE_KM2.toFixed(2)}</p>
                `;
            }
        } else {
            projectDetailsDiv.innerHTML = ''; // Clear details if no project is selected
        }
    });

    // Set the map layer visibility for exploring sites
    map.setPaintProperty('Sites_v6', 'fill-opacity', 1);
    map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
    map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-stroke-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-opacity', 0);
    map.setPaintProperty('PublicLibraries', 'circle-stroke-opacity', 0);
    map.setPaintProperty('Parks', 'fill-opacity', 0);
    map.setPaintProperty('ExistingHDBDissolved', 'fill-opacity', 0);

    // Add event listener to the Locate Me button
    document.getElementById('locate-button').addEventListener('click', function() {
        getUserLocation();
    });
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Zoom to the user's location on the map
            map.flyTo({
                center: [longitude, latitude],
                zoom: 14, // Adjust the zoom level as needed
                essential: true // This animation is essential for accessibility
            });
        }, () => {
            alert('Unable to retrieve your location. Please check your location settings.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}