const mapConfig = {
    explore: {
        center: [103.809038, 1.353424], // Default Singapore center
        zoom: 11,
        layers: [
            { layer: "Sites_v6", opacity: 1 },
            { layer: "MRTLines_20240914", opacity: 0 },
            { layer: "MRTStations_20240914_v1", opacity: 0 },
            { layer: "HawkerCentres", opacity: 0 },
            { layer: "PublicLibraries", opacity: 0 },
            { layer: "Parks", opacity: 1 },
            { layer: "ExistingHDBDissolved", opacity: 0 },
            { layer: "AllCyclingPathPCN", opacity: 0 }
        ]
    },
    nature: {
        center: [103.809038, 1.353424], 
        zoom: 12,
        layers: [
            { layer: "Sites_v6", opacity: 1 },
            { layer: "Parks", opacity: 1 },
            { layer: "AllCyclingPathPCN", opacity: 1 }
        ]
    },
    transport: {
        center: [103.809038, 1.353424], 
        zoom: 13,
        layers: [
            { layer: "MRTLines_20240914", opacity: 1 },
            { layer: "MRTStations_20240914_v1", opacity: 1 },
            { layer: "AllCyclingPathPCN", opacity: 1 }
        ]
    },
    // Add similar blocks for 'amenities' and 'compare'
};