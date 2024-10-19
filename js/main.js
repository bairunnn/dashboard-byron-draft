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

// Get the modal and close button
// Get modal and close button elements
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the icon, open the modal with transition
document.getElementById('siteIcon').addEventListener('click', function() {
    modal.style.display = "block"; // Set display to block
    setTimeout(() => { // Delay adding the class to allow the display change
        modal.classList.add('show'); // Add show class to fade in
    }, 10); // Small timeout to trigger the transition
});

// When the user clicks on <span> (x), close the modal with transition
span.onclick = function() {
    modal.classList.remove('show'); // Remove show class to fade out
    modal.classList.add('hide'); // Add hide class for scale down effect
    setTimeout(() => { // Wait for transition to finish before hiding
        modal.style.display = "none";
        modal.classList.remove('hide'); // Reset hide class
    }, 300); // Match this duration with the CSS transition duration
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show'); // Remove show class to fade out
        modal.classList.add('hide'); // Add hide class for scale down effect
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove('hide'); // Reset hide class
        }, 300); 
    }
}