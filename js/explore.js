const projectCoordinates = {
    "Ang Mo Kio": [103.84515494925807, 1.3749890228765957],
    "Bedok 1": [103.94608866823155, 1.3142854046882988],
    "Bedok 2": [103.94623958879255, 1.3160236296175223],
    "Bedok 3": [103.91262169426813, 1.3228167899235626],
    "Bukit Batok": [103.73684050482362, 1.3549231649923992],
    "Geylang": [103.88026946399526, 1.3274615720494429],
    "Jurong West": [103.72633447850544, 1.3269696626372136],
    "Kallang Whampoa 1": [103.85789935268545, 1.3230457714217692],
    "Kallang Whampoa 2": [103.86413883505325, 1.3054341769958007],
    "Kallang Whampoa 3": [103.87295369391586, 1.317987651613951],
    "Pasir Ris 1": [103.94922500668866, 1.3769121070832524],
    "Pasir Ris 2": [103.95054451955161, 1.377151401249985],
    "Sengkang 1": [103.87919606616396, 1.3943307856805016],
    "Sengkang 2": [103.87612903093439, 1.4009138100721623],
    "Woodlands": [103.77255516423922, 1.4355446479153366]
};

function showExploreContent() {    
    const contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Explore Sites</h3>
        <p>Select a project to view its details.</p>
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="toggleMRT" />
        <label class="form-check-label" for="toggleMRT">Show MRT/LRT?</label>
        </div>
        <label for="project-dropdown" style="margin-bottom: 10px; display: block;">Select a Project:</label>
        <select id="project-dropdown" class="form-select mb-3">
            <option value="">-- Select a Project --</option>
        </select>
        <div id="project-details" class="mt-3"></div>
    `;
    const toggleMRT = document.getElementById('toggleMRT');

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
                const { Units, NEAR_HAWKER, NEAR_MRT, NParks_KM2, NEAR_LIB, CYCLE_M, MATURE_KM2 } = selectedFeature.properties;
    
                // Display the selected project's details in a Bootstrap table
                projectDetailsDiv.innerHTML = `
                <h5>${selectedProjectName}</h5>
                <table class="table table-bordered table-striped project-details-table">
                    <tbody>
                        <tr>
                            <td><strong>Units launched</strong></td>
                            <td>${Units}</td>
                        </tr>
                        <tr>
                            <td><strong>Distance to nearest Hawker Centre</strong></td>
                            <td>${NEAR_HAWKER.toFixed(2)} m</td>
                        </tr>
                        <tr>
                            <td><strong>Distance to nearest MRT</strong></td>
                            <td>${NEAR_MRT.toFixed(2)} m</td>
                        </tr>
                        <tr>
                            <td><strong>Area of parkland within 1KM buffer of site</strong></td>
                            <td>${NParks_KM2.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>Distance to nearest library</strong></td>
                            <td>${NEAR_LIB.toFixed(2)} m</td>
                        </tr>
                        <tr>
                            <td><strong>Length of cycling paths within 1KM buffer of site</strong></td>
                            <td>${CYCLE_M.toFixed(2)} m</td>
                        </tr>
                        <tr>
                            <td><strong>Area of mature housing estates within 1KM buffer of site</strong></td>
                            <td>${MATURE_KM2.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            `;
            }
        } else {
            projectDetailsDiv.innerHTML = ''; // Clear details if no project is selected
        }

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

    toggleMRT.addEventListener('change', function() {
        if (this.checked) {
            // Show MRT/LRT layers
            map.setPaintProperty('MRTLines_20240914', 'line-opacity', 1);
            map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 1);
        } else {
            // Hide MRT/LRT layers
            map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
            map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
        }
    });

    // Add event listener to the Locate Me button
    document.getElementById('locate-button').addEventListener('click', function() {
        getUserLocation();
    });
}

const toggleMrtButton = document.getElementById('toggle-mrt');
let mrtVisible = false; // Track the visibility state

toggleMrtButton.addEventListener('click', function() {
    mrtVisible = !mrtVisible; // Toggle the state

    if (mrtVisible) {
        // Show MRT/LRT layers
        map.setPaintProperty('MRTLines_20240914', 'line-opacity', 1);
        map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 1);
        toggleMrtButton.textContent = 'Hide MRT/LRT?'; // Change button text
    } else {
        // Hide MRT/LRT layers
        map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
        map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
        toggleMrtButton.textContent = 'Show MRT/LRT?'; // Change button text
    }
});

// Code from class
// function getUserLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const { latitude, longitude } = position.coords;

//             // Zoom to the user's location on the map
//             map.flyTo({
//                 center: [longitude, latitude],
//                 zoom: 14, // Adjust the zoom level as needed
//                 essential: true // This animation is essential for accessibility
//             });
//         }, () => {
//             alert('Unable to retrieve your location. Please check your location settings.');
//         });
//     } else {
//         alert('Geolocation is not supported by this browser.');
//     }
// }

