function showCompareContent() {
    let contentPanel = document.getElementById('description-panel');
    let mapPanel = document.getElementById('map');
    
    // Update the content panel with comparison info
    contentPanel.innerHTML = `
        <h3>Compare Sites</h3>
        <p>Compare different sites based on the available data metrics.</p>
    `;
    
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

function resetLayout() {
    let contentPanel = document.getElementById('description-panel');
    let mapPanel = document.getElementById('map');
    
    // Reset widths to default when not in compare section
    contentPanel.style.width = "30%";  // Default content panel width
    mapPanel.style.width = "60%";       // Default map panel width

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