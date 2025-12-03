# Habit Streak Mini-Game

A playful, gamified habit-tracking application where users earn points and maintain streaks for completing daily habits. Built with Next.js, TypeScript, and Tailwind CSS v4.

## Live Demo

[View Demo](https://your-vercel-deployment-url.vercel.app)

## Features

### Core Functionality
- **Habit Selection** - Choose from 5 predefined habits (Drink Water, Read 10 min, Exercise, Meditate, Sleep 8 hours)
- **Daily Check-in** - Simple one-tap button to mark habits complete
- **Points System** - Earn +10 points per completion
- **Streak Tracking** - Build consecutive day streaks (resets on missed days)
- **Persistence** - All progress saved to localStorage

### Gamification Elements
- **Animated Avatar** - Character reacts to your progress:
  - Happy expression after check-ins
  - Sad expression when streak breaks
  - Grows larger as streak increases
  - Changes color as you level up
- **Leveling System** - Level up every 100 points with celebration modal
- **Visual Micro-rewards** - Sparkle effects, confetti bursts, progress animations
- **Audio Feedback** - Pleasant sound effects for interactions

### Dashboard
- **Stats Display** - Current points, streak count, and level with progress bar
- **History View** - 14-day calendar visualization and recent activity log

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Storage**: localStorage (no backend required)
- **Audio**: Web Audio API

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/habit-streak-game.git

# Navigate to project directory
cd habit-streak-game

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── globals.css      # Tailwind v4 config and custom styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── habit-game.tsx       # Main game logic and state
│   ├── habit-selector.tsx   # Habit selection cards
│   ├── game-avatar.tsx      # Animated character component
│   ├── stats-display.tsx    # Points, streak, level display
│   ├── check-in-button.tsx  # Daily check-in with animations
│   ├── sparkle-effect.tsx   # Particle effects
│   └── history-view.tsx     # Activity history and calendar
└── lib/
    └── sounds.ts            # Audio utility functions
\`\`\`

## Design Decisions

1. **Mobile-First Approach** - Designed for thumb-friendly interactions on mobile devices
2. **Emotional Reinforcement** - The avatar creates an emotional connection, making users feel accountable
3. **Immediate Feedback** - Every action has visual/audio feedback to reinforce positive behavior
4. **Simple State Management** - Used React useState + localStorage to keep things lightweight
5. **Cheerful Color Palette** - Bright, energetic colors (amber, emerald, rose) to evoke positivity

## What I'd Do With More Time

### Features
- **Multiple Active Habits** - Track several habits simultaneously with individual streaks
- **Weekly/Monthly Goals** - Set targets like "Exercise 5x this week"
- **Achievement Badges** - Unlock badges for milestones (7-day streak, 100 points, etc.)
- **Habit Categories** - Group habits by type (Health, Learning, Mindfulness)
- **Streak Freeze** - Allow users to "freeze" a day without breaking streak (limited uses)
- **Social Features** - Share progress, compete with friends on leaderboards

### Technical Improvements
- **Backend Integration** - Add Supabase for user accounts and cloud sync
- **Push Notifications** - Daily reminders to complete habits
- **PWA Support** - Make installable as a mobile app with offline support
- **Data Visualization** - Charts showing progress over weeks/months
- **Accessibility Audit** - Full WCAG compliance, screen reader optimization
- **Unit Tests** - Add Jest/Vitest tests for game logic
- **Haptic Feedback** - Vibration on mobile for check-ins

### Polish
- **More Avatar States** - Sleeping, celebrating, exercising animations
- **Customizable Themes** - Let users pick color schemes
- **Onboarding Flow** - Tutorial for first-time users
- **Sound Toggle** - Settings to disable audio
- **Export Data** - Download habit history as CSV

## License

MIT
