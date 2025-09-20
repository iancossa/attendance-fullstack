// Geofencing utilities for attendance validation

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in meters
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

/**
 * Validate if student is within geofence radius
 * @param {number} sessionLat - Session latitude
 * @param {number} sessionLon - Session longitude
 * @param {number} studentLat - Student latitude
 * @param {number} studentLon - Student longitude
 * @param {number} radius - Allowed radius in meters (default: 100)
 * @returns {object} Validation result
 */
function validateGeofence(sessionLat, sessionLon, studentLat, studentLon, radius = 100) {
    const distance = calculateDistance(sessionLat, sessionLon, studentLat, studentLon);
    return {
        isValid: distance <= radius,
        distance: Math.round(distance),
        allowedRadius: radius
    };
}

module.exports = {
    calculateDistance,
    validateGeofence
};