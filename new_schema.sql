-- Drop old tables
DROP TABLE IF EXISTS turn_actions CASCADE;
DROP TABLE IF EXISTS custom_prompts CASCADE;
DROP TABLE IF EXISTS game_sessions CASCADE;
DROP TABLE IF EXISTS room_players CASCADE;
DROP TABLE IF EXISTS game_rooms CASCADE;

-- Prompts database (3000+ questions)
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_type VARCHAR(20) NOT NULL, -- 'truth-or-dare' or 'would-you-rather'
  prompt_type VARCHAR(20), -- 'truth' or 'dare' (null for would-you-rather)
  content TEXT NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'medium', -- 'baby', 'medium', 'wild', 'drunk'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Single game state row (updates constantly)
CREATE TABLE game_state (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_game VARCHAR(20), -- 'truth-or-dare' or 'would-you-rather'
  current_turn VARCHAR(50), -- 'Nelson' or 'Nifemi'
  current_prompt_id UUID REFERENCES prompts(id),
  current_prompt_text TEXT,
  current_prompt_type VARCHAR(20), -- 'truth', 'dare', 'would-you-rather'
  last_response TEXT, -- overwrites each time
  last_used_prompt_id UUID, -- to avoid repeating
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial game state
INSERT INTO game_state (id, current_turn) VALUES (1, 'Nelson');

-- Indexes
CREATE INDEX idx_prompts_game_type ON prompts(game_type);
CREATE INDEX idx_prompts_type ON prompts(prompt_type);
CREATE INDEX idx_prompts_difficulty ON prompts(difficulty);

-- Enable RLS
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow all operations on prompts" ON prompts FOR ALL USING (true);
CREATE POLICY "Allow all operations on game_state" ON game_state FOR ALL USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE game_state;
