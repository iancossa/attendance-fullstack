const GeofenceSettings = require('../models/GeofenceSettings');
const ClassLocation = require('../models/ClassLocation');

class GeofencingService {
  // Calculate distance between two points using Haversine formula
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  static toRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  // Validate if student is within geofence
  static async validateLocation(studentLat, studentLon, classId, sessionLat = null, sessionLon = null, sessionRadius = null) {
    const settings = await GeofenceSettings.getSettings();
    if (!settings?.enabled) return { valid: true, distance: 0 };

    let targetLat = sessionLat;
    let targetLon = sessionLon;
    let radius = sessionRadius || settings.default_radius;

    // If no session location, use class location
    if (!targetLat || !targetLon) {
      const classLocations = await ClassLocation.findByClassId(classId);
      if (classLocations.length > 0) {
        const location = classLocations[0];
        targetLat = location.latitude;
        targetLon = location.longitude;
        radius = location.radius;
      }
    }

    if (!targetLat || !targetLon) {
      return { valid: false, distance: null, error: 'No location configured' };
    }

    const distance = this.calculateDistance(studentLat, studentLon, targetLat, targetLon);
    const valid = distance <= radius;

    return { valid, distance, radius };
  }

  // Get geofencing status for a class
  static async getClassGeofenceStatus(classId) {
    const settings = await GeofenceSettings.getSettings();
    const locations = await ClassLocation.findByClassId(classId);
    
    return {
      enabled: settings?.enabled || false,
      locations: locations.length,
      defaultRadius: settings?.default_radius || 100
    };
  }
}

module.exports = GeofencingService;