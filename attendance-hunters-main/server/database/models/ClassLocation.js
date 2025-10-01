const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ClassLocation {
  static async create(data) {
    return await prisma.class_locations.create({
      data: { ...data, created_at: new Date(), updated_at: new Date() }
    });
  }

  static async findByClassId(classId) {
    return await prisma.class_locations.findMany({
      where: { class_id: classId, is_active: true }
    });
  }

  static async findById(id) {
    return await prisma.class_locations.findUnique({
      where: { id }
    });
  }

  static async update(id, data) {
    return await prisma.class_locations.update({
      where: { id },
      data: { ...data, updated_at: new Date() }
    });
  }

  static async delete(id) {
    return await prisma.class_locations.update({
      where: { id },
      data: { is_active: false, updated_at: new Date() }
    });
  }
}

module.exports = ClassLocation;