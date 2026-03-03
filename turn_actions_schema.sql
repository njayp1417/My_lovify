-- Add turn_actions table for the spin game
CREATE TABLE turn_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_player VARCHAR(50) NOT NULL,
  to_player VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'truth', 'dare', 'challenge'
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed'
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE turn_actions ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on turn_actions" ON turn_actions FOR ALL USING (true);

-- Create index
CREATE INDEX idx_turn_actions_to_player ON turn_actions(to_player, status);
CREATE INDEX idx_turn_actions_created ON turn_actions(created_at DESC);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE turn_actions;
