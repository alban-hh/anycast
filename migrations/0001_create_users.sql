-- Create users table for authentication
CREATE TABLE IF NOT EXISTS perdorues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    fjalekalimi_hash TEXT NOT NULL,
    krijuar_ne DATETIME DEFAULT CURRENT_TIMESTAMP,
    perditesuar_ne DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_perdorues_email ON perdorues(email);
