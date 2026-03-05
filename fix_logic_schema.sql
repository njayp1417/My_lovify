-- Add field to track who asked the question
ALTER TABLE game_state ADD COLUMN IF NOT EXISTS asked_by TEXT;