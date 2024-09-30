mapboxgl.accessToken = 'pk.eyJ1IjoiYnlyb25ubiIsImEiOiJjbTB2NG9qajYxOTE1Mmtwd3Q1aDd5cjM2In0.K6SRujI45VvXnG1vfcwbwA';
var map = new mapboxgl.Map({
    container: 'map', // ID of the div where the map will be placed
    style: 'mapbox://styles/byronnn/cm15ugzyg00dg01pc3ucid3od', // Mapbox style
    center: [103.809038, 1.353424], // Initial position [lng, lat]
    zoom: 10
});

/* const layerIds = {
    explore: ["Sites_v6"],§
    nature: ["Sites_v6", "Parks"],
    transport: ["Sites_v6", "MRTLines_20240914", "MRTStations_20240914_v1", "AllCyclingPathPCN"],
    amenities: ["Sites_v6", "HawkerCentres", "PublicLibraries", "ExistingHDBDissolved"],
    compare: ["Sites_v6"],
};

function setLayerOpacity(selectedLayers) {
    // Iterate through all layers to set opacity
    Object.keys(layerIds).forEach((key) => {
        const layers = layerIds[key];
        layers.forEach((layerId) => {
            const opacity = selectedLayers.includes(layerId) ? 1 : 0; // 1 for visible, 0 for hidden
            map.setPaintProperty(layerId, 'fill-opacity', opacity); // For fill layers
            map.setPaintProperty(layerId, 'line-opacity', opacity); // For line layers
            map.setPaintProperty(layerId, 'circle-opacity', opacity); // For circle layers
        });
    });
} */

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