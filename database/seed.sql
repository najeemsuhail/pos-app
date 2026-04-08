-- Seed data for initial setup

-- Users
INSERT INTO users (name, role, password) VALUES 
('admin', 'Admin', '$2a$10$Ly/mreRX5QSCwI7fALzuSuXIqpw51y0RbaaW5qvMjvOSHPVnGS4AW'),
('staff1', 'Staff', '$2a$10$Ly/mreRX5QSCwI7fALzuSuXIqpw51y0RbaaW5qvMjvOSHPVnGS4AW');

-- Categories
INSERT INTO categories (name) VALUES 
('Starters'),
('Main Course'),
('Drinks');

-- Menu Items
INSERT INTO menu_items (name, price, category_id, is_available) VALUES 
('Samosa', 50, 1, true),
('Paneer Tikka', 150, 1, true),
('Butter Chicken', 300, 2, true),
('Biryani', 250, 2, true),
('Mango Lassi', 80, 3, true),
('Cold Coffee', 120, 3, true);
