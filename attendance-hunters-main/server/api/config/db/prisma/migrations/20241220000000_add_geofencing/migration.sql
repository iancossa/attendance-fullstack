-- Add geofencing fields to StudentAttendance
ALTER TABLE "StudentAttendance" ADD COLUMN "studentLatitude" DOUBLE PRECISION;
ALTER TABLE "StudentAttendance" ADD COLUMN "studentLongitude" DOUBLE PRECISION;
ALTER TABLE "StudentAttendance" ADD COLUMN "distanceFromClass" DOUBLE PRECISION;
ALTER TABLE "StudentAttendance" ADD COLUMN "locationVerified" BOOLEAN NOT NULL DEFAULT false;

-- Create Class table with geofencing support
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "maxStudents" INTEGER,
    "schedule" TEXT,
    "room" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "geofenceRadius" INTEGER NOT NULL DEFAULT 100,
    "geofenceEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- Create QRSession table for tracking QR sessions with location
CREATE TABLE "QRSession" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "radius" INTEGER NOT NULL DEFAULT 100,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "QRSession_pkey" PRIMARY KEY ("id")
);

-- Create GeofenceSettings table for global configuration
CREATE TABLE "GeofenceSettings" (
    "id" SERIAL NOT NULL,
    "defaultRadius" INTEGER NOT NULL DEFAULT 100,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "allowOverride" BOOLEAN NOT NULL DEFAULT true,
    "accuracyThreshold" DOUBLE PRECISION NOT NULL DEFAULT 50.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeofenceSettings_pkey" PRIMARY KEY ("id")
);

-- Create unique index on Class code
CREATE UNIQUE INDEX "Class_code_key" ON "Class"("code");

-- Insert default geofence settings
INSERT INTO "GeofenceSettings" ("defaultRadius", "enabled", "allowOverride", "accuracyThreshold") 
VALUES (100, true, true, 50.0);