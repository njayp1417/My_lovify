# Couple Game Hub - Nelson ❤️ Nifemi

Premium turn-based game for two with Truth or Dare and Would You Rather.

## Setup

### 1. Database Setup

Run these SQL files in your Supabase SQL Editor **in order**:

1. `new_schema.sql` - Creates tables
2. `sample_prompts.sql` - Adds sample prompts (expand to 3000+)

### 2. Environment Variables

Already configured in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3. Run

```bash
npm install
npm run dev
```

## How It Works

1. **Login** - Select Nelson or Nifemi (with profile pictures)
2. **Game Selection** - Choose Truth or Dare OR Would You Rather
3. **Spin** - Random prompt from database (never repeats last)
4. **Respond**:
   - Truth/Would You Rather: Text input
   - Dare: "Done?" button (turns green on click)
5. **Turn switches** automatically after response

## Database Structure

### Tables:
- `prompts` - 3000+ questions (1500 truths, 1500 dares, 1000 would-you-rather)
- `game_state` - Single row that updates constantly (no response history for privacy)

### Privacy:
- Only 1 game state row
- Responses overwrite (not stored permanently)
- No history tracking

## Features

- Profile pictures in header and login
- Turn tracker with visual indicators
- Real-time sync via Supabase
- Mobile-first design
- Premium dark UI
