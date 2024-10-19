function showContent(section, button) {
    if (section === 'explore') {
        showExploreContent();
    } else if (section === 'nature') {
        showNatureContent();
    } else if (section === 'transport') {
        showTransportContent();
    } else if (section === 'amenities') {
        showAmenitiesContent();
    } else if (section === 'compare') {
        showCompareContent();
    }
    
    map.flyTo({
        center: [103.809038, 1.353424],
        zoom: 10,
        essential: true // ensures smooth zooming experience
    });

    const buttons = document.querySelectorAll('.sidebar .nav button');
    buttons.forEach(btn => {
        btn.classList.remove('btn-dark');
        btn.classList.add('btn-secondary');
    });
    button.classList.remove('btn-secondary');
    button.classList.add('btn-dark');
}

let sitesData = null; // Global variable to hold GeoJSON data

// Function to load GeoJSON data
async function loadGeoJsonData() {
    const response = await fetch('assets/layers/Sites_v6.geojson');
    if (response.ok) {
        sitesData = await response.json();
        console.log('Sites data loaded:', sitesData);
    } else {
        console.error('Failed to load GeoJSON data:', response.statusText);
    }
}

// Call the function to load GeoJSON data
loadGeoJsonData();