const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class GeofenceSettings {
  static async getSettings() {
    return await prisma.geofence_settings.findFirst();
  }

  static async updateSettings(data) {
    const existing = await this.getSettings();
    if (existing) {
      return await prisma.geofence_settings.update({
        where: { id: existing.id },
        data: { ...data, updated_at: new Date() }
      });
    }
    return await prisma.geofence_settings.create({ data });
  }

  static async isEnabled() {
    const settings = await this.getSettings();
    return settings?.enabled || false;
  }

  static async getDefaultRadius() {
    const settings = await this.getSettings();
    return settings?.default_radius || 100;
  }
}

module.exports = GeofenceSettings;