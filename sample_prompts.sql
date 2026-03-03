-- Sample Truth or Dare prompts (expand to 1500 each)

-- TRUTHS (Baby level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'truth', 'What is your biggest fear?', 'baby'),
('truth-or-dare', 'truth', 'Have you ever lied to me?', 'baby'),
('truth-or-dare', 'truth', 'What is your most embarrassing moment?', 'baby'),
('truth-or-dare', 'truth', 'Who was your first crush?', 'baby'),
('truth-or-dare', 'truth', 'What is something you have never told anyone?', 'baby');

-- TRUTHS (Medium level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'truth', 'What is your biggest insecurity?', 'medium'),
('truth-or-dare', 'truth', 'Have you ever cheated on a test?', 'medium'),
('truth-or-dare', 'truth', 'What is the most trouble you have been in?', 'medium'),
('truth-or-dare', 'truth', 'What is your biggest regret?', 'medium'),
('truth-or-dare', 'truth', 'What is something you wish you could change about yourself?', 'medium');

-- TRUTHS (Wild level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'truth', 'What is your wildest fantasy?', 'wild'),
('truth-or-dare', 'truth', 'Have you ever had feelings for someone else while in a relationship?', 'wild'),
('truth-or-dare', 'truth', 'What is the most illegal thing you have done?', 'wild'),
('truth-or-dare', 'truth', 'What is your deepest secret?', 'wild'),
('truth-or-dare', 'truth', 'What is something you are ashamed of?', 'wild');

-- TRUTHS (Drunk level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'truth', 'What is the craziest thing you have done while drunk?', 'drunk'),
('truth-or-dare', 'truth', 'Have you ever hooked up with someone you regret?', 'drunk'),
('truth-or-dare', 'truth', 'What is your most embarrassing drunk story?', 'drunk'),
('truth-or-dare', 'truth', 'What is the worst decision you made while intoxicated?', 'drunk'),
('truth-or-dare', 'truth', 'Have you ever blacked out? What happened?', 'drunk');

-- DARES (Baby level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'dare', 'Do 20 pushups', 'baby'),
('truth-or-dare', 'dare', 'Sing your favorite song out loud', 'baby'),
('truth-or-dare', 'dare', 'Dance for 1 minute', 'baby'),
('truth-or-dare', 'dare', 'Tell me three things you love about me', 'baby'),
('truth-or-dare', 'dare', 'Send me a cute selfie', 'baby');

-- DARES (Medium level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'dare', 'Post an embarrassing photo on social media', 'medium'),
('truth-or-dare', 'dare', 'Call someone and sing to them', 'medium'),
('truth-or-dare', 'dare', 'Do your best impression of me', 'medium'),
('truth-or-dare', 'dare', 'Let me go through your phone for 2 minutes', 'medium'),
('truth-or-dare', 'dare', 'Share your most embarrassing photo with me', 'medium');

-- DARES (Wild level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'dare', 'Send me a spicy photo', 'wild'),
('truth-or-dare', 'dare', 'Tell me your wildest fantasy in detail', 'wild'),
('truth-or-dare', 'dare', 'Do something that scares you', 'wild'),
('truth-or-dare', 'dare', 'Share your location and let me surprise you', 'wild'),
('truth-or-dare', 'dare', 'Delete your most recent text conversation', 'wild');

-- DARES (Drunk level)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('truth-or-dare', 'dare', 'Take a shot and send me a video', 'drunk'),
('truth-or-dare', 'dare', 'Call your ex and tell them you miss them', 'drunk'),
('truth-or-dare', 'dare', 'Post a drunk story on social media', 'drunk'),
('truth-or-dare', 'dare', 'Send a risky text to someone', 'drunk'),
('truth-or-dare', 'dare', 'Do something you will regret tomorrow', 'drunk');

-- WOULD YOU RATHER (Sample - expand to 1000)
INSERT INTO prompts (game_type, prompt_type, content, difficulty) VALUES
('would-you-rather', NULL, 'Would you rather lose all your memories or never be able to make new ones?', 'medium'),
('would-you-rather', NULL, 'Would you rather be able to read minds or see the future?', 'medium'),
('would-you-rather', NULL, 'Would you rather have unlimited money or unlimited time?', 'medium'),
('would-you-rather', NULL, 'Would you rather know when you will die or how you will die?', 'medium'),
('would-you-rather', NULL, 'Would you rather be famous or be the best friend of someone famous?', 'medium'),
('would-you-rather', NULL, 'Would you rather live without music or without movies?', 'baby'),
('would-you-rather', NULL, 'Would you rather be too hot or too cold?', 'baby'),
('would-you-rather', NULL, 'Would you rather have a rewind button or a pause button for your life?', 'medium'),
('would-you-rather', NULL, 'Would you rather lose your phone or your wallet?', 'baby'),
('would-you-rather', NULL, 'Would you rather be stuck on a broken ski lift or in a broken elevator?', 'baby');
