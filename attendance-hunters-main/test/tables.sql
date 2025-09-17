-- roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

-- users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL REFERENCES roles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- classes table
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  faculty_id INT REFERENCES users(id)
);

-- sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  class_id INT NOT NULL REFERENCES classes(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL
);

-- qr_codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES sessions(id),
  code_value TEXT NOT NULL,
  valid_from TIMESTAMPTZ NOT NULL,
  valid_to TIMESTAMPTZ NOT NULL
);

-- geofences table (using PostGIS geometry type)
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS geofences (
  id SERIAL PRIMARY KEY,
  class_id INT NOT NULL REFERENCES classes(id),
  polygon GEOMETRY(POLYGON, 4326) NOT NULL
);

-- attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES sessions(id),
  user_id INT NOT NULL REFERENCES users(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent')),
  UNIQUE (session_id, user_id)
);

-- location_logs table
CREATE TABLE IF NOT EXISTS location_logs (
  id SERIAL PRIMARY KEY,
  attendance_id INT NOT NULL REFERENCES attendance(id),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  action_type VARCHAR(100) NOT NULL,
  details TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);