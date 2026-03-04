-- Add is_custom column to prompts table
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS is_custom BOOLEAN DEFAULT FALSE;

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  goal_count INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  challenge_type TEXT NOT NULL, -- 'weekly', 'monthly'
  game_type TEXT, -- 'truth-or-dare', 'would-you-rather', null for any
  difficulty TEXT, -- 'baby', 'medium', 'wild', 'drunk', null for any
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial weekly challenge
INSERT INTO challenges (title, description, goal_count, challenge_type, game_type)
VALUES ('Weekly Warriors', 'Complete 10 prompts this week', 10, 'weekly', NULL);

-- Add notification preferences to game_state
ALTER TABLE game_state ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT TRUE;
