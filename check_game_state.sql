-- Check if asked_by column exists and current game state
SELECT * FROM game_state WHERE id = 1;

-- Also check table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'game_state';