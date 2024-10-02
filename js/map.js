mapboxgl.accessToken = 'pk.eyJ1IjoiYnlyb25ubiIsImEiOiJjbTB2NG9qajYxOTE1Mmtwd3Q1aDd5cjM2In0.K6SRujI45VvXnG1vfcwbwA';
var map = new mapboxgl.Map({
    container: 'map', // ID of the div where the map will be placed
    style: 'mapbox://styles/byronnn/cm15ugzyg00dg01pc3ucid3od', // Mapbox style
    center: [103.809038, 1.353424], // Initial position [lng, lat]
    zoom: 10
});

const layerIds = {
    explore: ["Sites_v6"],
    nature: ["Sites_v6", "Parks"],
    transport: ["Sites_v6", "MRTLines_20240914", "MRTStations_20240914_v1", "AllCyclingPathPCN"],
    amenities: ["Sites_v6", "HawkerCentres", "PublicLibraries", "ExistingHDBDissolved"],
    compare: ["Sites_v6"],
};

// Initialize all layers with opacity set to 0
map.on('load', function() {
    // 1. Sites_v6 (fill)
    map.addLayer({
        id: "Sites_v6",
        type: "fill",
        source: {
            type: "geojson",
            data: "assets/layers/Sites_v6.geojson"
        },
        paint: {
            "fill-color": "#ffa600",
            "fill-opacity": 1
        }
    });

    // 2. MRTLines_20240914 (line)
    map.addLayer({
        id: "MRTLines_20240914",
        type: "line",
        source: {
            type: "geojson",
            data: "assets/layers/MRTLines_20240914.geojson"
        },
        paint: {
            "line-color": ["get", "colour"],
            "line-width": 2,
            "line-opacity": 0
        }
    });

    // 3. MRTStations_20240914_v1 (circle)
    map.addLayer({
        id: "MRTStations_20240914_v1",
        type: "symbol",
        source: {
            type: "geojson",
            data: "assets/layers/MRTStations_20240914_v1.geojson"
        },
        layout: {
            "text-field": ["get", "name"], // Display the name of the MRT station
            "text-font": ["Barlow Bold"], 
            "text-size": 16,
            "text-offset": [0, 0],
            "text-anchor": "top", // Anchor the text to the top of the symbol
        },
        paint: {
            "text-color": "#000000", // Text color
            "text-halo-color": "#ffffff", // White halo around text for readability
            "text-halo-width": 2, // Halo width for better contrast
            "text-opacity": 1,
        }
    });

    // 4. HawkerCentres (circle)
    map.addLayer({
        id: "HawkerCentres",
        type: "circle",
        source: {
            type: "geojson",
            data: "assets/layers/HawkerCentres.geojson"
        },
        paint: {
            "circle-color": "#d50a78",  // Replace with the desired color
            "circle-radius": 5,  // Adjust as needed
            "circle-stroke-color": "#d50a78",
            "circle-stroke-width": 1,
            "circle-opacity": 1,
            "circle-stroke-opacity": 1
        }
    });

    // 5. PublicLibraries (circle)
    map.addLayer({
        id: "PublicLibraries",
        type: "circle",
        source: {
            type: "geojson",
            data: "assets/layers/PublicLibraries.geojson"
        },
        paint: {
            "circle-color": "#0088cd",  // Replace with the desired color
            "circle-radius": 5,  // Adjust as needed
            "circle-stroke-color": "#0088cd",
            "circle-stroke-width": 1,
            "circle-opacity": 1,
            "circle-stroke-opacity": 1
        }
    });

    // 6. Parks (fill)
    map.addLayer({
        id: "Parks",
        type: "fill",
        source: {
            type: "geojson",
            data: "assets/layers/Parks.geojson"
        },
        paint: {
            "fill-color": "#00c600",  // Replace with the desired color
            "fill-opacity": 1
        }
    });

    // 7. ExistingHDBDissolved (fill)
    map.addLayer({
        id: "ExistingHDBDissolved",
        type: "fill",
        source: {
            type: "geojson",
            data: "assets/layers/ExistingHDBDissolved.geojson"
        },
        paint: {
            "fill-color": "#b20300",  // Replace with the desired color
            "fill-opacity": 1
        }
    });

    // 8. AllCyclingPathPCN (line)
    map.addLayer({
        id: "AllCyclingPathPCN",
        type: "line",
        source: {
            type: "geojson",
            data: "assets/layers/AllCyclingPathPCN.geojson"
        },
        paint: {
            "line-color": "#3038f9",  // Replace with the desired color
            "line-width": 2,
            "line-opacity": 1}
    });
});


// Function to handle content change and layer visibility
function showContent(section, button) {
    let contentPanel = document.getElementById('description-panel');

    // Clear existing content
    contentPanel.innerHTML = '';

    // Set content based on the selected section
    if (section === 'explore') {
        contentPanel.innerHTML = `
            <h3>Explore Sites</h3>
            <p>Here you can explore various sites available in the system.</p>
        `;
    } else if (section === 'nature') {
        contentPanel.innerHTML = `
            <h3>Nature Metrics</h3>
            <p>View the nature-related data and metrics for the selected sites.</p>
        `;
    } else if (section === 'transport') {
        contentPanel.innerHTML = `
            <h3>Transport Metrics</h3>
            <p>Access transport metrics such as transit stops, routes, and more.</p>
        `;
    } else if (section === 'amenities') {
        contentPanel.innerHTML = `
            <h3>Amenities</h3>
            <p>Discover the available amenities around the sites, including shops, restaurants, etc.</p>
        `;
    } else if (section === 'compare') {
        contentPanel.innerHTML = `
            <h3>Compare Sites</h3>
            <p>Compare different sites based on the available data metrics.</p>
        `;
    }

    // Get all buttons in the sidebar to reset their state
    const buttons = document.querySelectorAll('.sidebar .nav button');

    // Loop through all buttons to reset their state
    buttons.forEach(btn => {
        btn.classList.remove('btn-dark');      // Remove dark class
        btn.classList.add('btn-secondary');     // Add secondary class
    });

    // Set the clicked button to active
    button.classList.remove('btn-secondary'); // Remove secondary class
    button.classList.add('btn-dark');         // Add dark class
}