function showAmenitiesContent() {
    let contentPanel = document.getElementById('description-panel');
    contentPanel.innerHTML = `
        <h3>Amenities</h3>
        <p>Discover the available amenities around the sites, including shops, restaurants, etc.</p>
    `;
    map.setPaintProperty('Sites_v6', 'fill-opacity', 1);
    map.setPaintProperty('MRTLines_20240914', 'line-opacity', 0);
    map.setPaintProperty('MRTStations_20240914_v1', 'text-opacity', 0);
    map.setPaintProperty('HawkerCentres', 'circle-opacity', 1);
    map.setPaintProperty('HawkerCentres', 'circle-stroke-opacity', 1);
    map.setPaintProperty('PublicLibraries', 'circle-opacity', 1);
    map.setPaintProperty('PublicLibraries', 'circle-stroke-opacity', 1);
    map.setPaintProperty('Parks', 'fill-opacity', 0);
    map.setPaintProperty('ExistingHDBDissolved', 'fill-opacity', 0);
}