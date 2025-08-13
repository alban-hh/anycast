-- Create posts table
CREATE TABLE IF NOT EXISTS postime (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pershkrimi TEXT NOT NULL,
    perdorues_id INTEGER NOT NULL,
    krijuar_ne DATETIME DEFAULT CURRENT_TIMESTAMP,
    perditesuar_ne DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (perdorues_id) REFERENCES perdorues(id) ON DELETE CASCADE
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_postime_perdorues_id ON postime(perdorues_id);

-- Create index on created date for ordering
CREATE INDEX IF NOT EXISTS idx_postime_krijuar_ne ON postime(krijuar_ne DESC);
