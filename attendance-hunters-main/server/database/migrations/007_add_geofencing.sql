-- Add geofencing support to existing tables
ALTER TABLE attendance_records ADD COLUMN student_latitude DOUBLE PRECISION;
ALTER TABLE attendance_records ADD COLUMN student_longitude DOUBLE PRECISION;
ALTER TABLE attendance_records ADD COLUMN distance_from_class DOUBLE PRECISION;
ALTER TABLE attendance_records ADD COLUMN location_verified BOOLEAN DEFAULT false;

ALTER TABLE attendance_sessions ADD COLUMN latitude DOUBLE PRECISION;
ALTER TABLE attendance_sessions ADD COLUMN longitude DOUBLE PRECISION;
ALTER TABLE attendance_sessions ADD COLUMN geofence_radius INTEGER DEFAULT 100;

ALTER TABLE classes ADD COLUMN latitude DOUBLE PRECISION;
ALTER TABLE classes ADD COLUMN longitude DOUBLE PRECISION;
ALTER TABLE classes ADD COLUMN geofence_radius INTEGER DEFAULT 100;
ALTER TABLE classes ADD COLUMN geofence_enabled BOOLEAN DEFAULT true;

-- Create geofence_settings table
CREATE TABLE geofence_settings (
    id SERIAL PRIMARY KEY,
    default_radius INTEGER NOT NULL DEFAULT 100,
    enabled BOOLEAN NOT NULL DEFAULT true,
    allow_override BOOLEAN NOT NULL DEFAULT true,
    accuracy_threshold DOUBLE PRECISION NOT NULL DEFAULT 50.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create class_locations table for multiple locations per class
CREATE TABLE class_locations (
    id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    radius INTEGER NOT NULL DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default geofence settings
INSERT INTO geofence_settings (default_radius, enabled, allow_override, accuracy_threshold) 
VALUES (100, true, true, 50.0);

-- Create indexes for performance
CREATE INDEX idx_attendance_records_location ON attendance_records(student_latitude, student_longitude);
CREATE INDEX idx_classes_location ON classes(latitude, longitude);
CREATE INDEX idx_class_locations_class_id ON class_locations(class_id);
CREATE INDEX idx_class_locations_location ON class_locations(latitude, longitude);