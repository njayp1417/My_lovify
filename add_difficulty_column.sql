-- Add missing column for current prompt difficulty
ALTER TABLE game_state ADD COLUMN IF NOT EXISTS current_prompt_difficulty TEXT;