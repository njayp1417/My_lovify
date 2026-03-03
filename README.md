# Couple Game Hub - Nelson ❤️ Nifemi

Premium turn-based game for two. Completely refactored and enhanced.

## What's New

### Core Improvements
- **Persistent Action System** - No turn blocking, create actions anytime
- **Feed-Based Layout** - Pending actions highlighted, completed actions dimmed
- **Enhanced Animations** - Radial spin wheel, smooth transitions, micro-interactions
- **Better State Management** - Async actions, loading states, error handling

### UI Enhancements
- Premium glassmorphism with stronger blur effects
- Pulsing glow on pending actions
- Notification badge in header
- Empty states
- Loading overlays
- Error notifications

### New Components
- `SpinWheel` - Radial spinning animation with anticipation
- `ActionCard` - Enhanced card with glow effects
- `EmptyState` - Elegant empty state component

## Setup

1. **Install:**
```bash
npm install
```

2. **Database is already configured** - Your Supabase credentials are set

3. **Run:**
```bash
npm run dev
```

## How It Works

- **Login** - Select Nelson or Nifemi
- **Create Action** - Tap "Create New Action" button
- **Spin** - Tap the wheel to generate Truth/Dare/Challenge
- **Respond** - Complete pending actions anytime
- **Real-time Sync** - Updates instantly across devices

## Tech Stack

- React + Vite
- Framer Motion (enhanced animations)
- Tailwind CSS (premium styling)
- Zustand (improved state)
- Supabase (realtime + database)
