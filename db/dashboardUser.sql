-- Create user
CREATE ROLE dashboard_user WITH LOGIN ENCRYPTED PASSWORD 'secure_password58584__';

\connect sqlzoo;

-- Privileges
GRANT CONNECT ON DATABASE sqlzoo TO dashboard_user;
GRANT USAGE ON SCHEMA public TO dashboard_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dashboard_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO dashboard_user;