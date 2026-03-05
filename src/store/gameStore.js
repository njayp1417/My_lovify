import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { notifyTurnChange, notifyAnswer } from '../utils/notifications'

export const useStore = create((set, get) => ({
  currentUser: null,
  selectedGame: null,
  gameState: null,
  challenges: [],
  isLoading: false,
  error: null,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedGame: (game) => set({ selectedGame: game }),
  setGameState: (gameState) => set({ gameState }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Reset to game selection
  resetToGameSelection: () => set({ selectedGame: null }),
  
  // Initialize game
  initGame: async (gameType) => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('game_state')
        .update({ 
          current_game: gameType,
          current_prompt_id: null,
          current_prompt_text: null,
          last_response: null
        })
        .eq('id', 1)
        .select()
        .single()
      
      if (error) throw error
      set({ gameState: data, selectedGame: gameType })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  
  // Spin for new prompt
  spin: async () => {
    const { selectedGame, currentUser } = get()
    set({ isLoading: true, error: null })
    
    try {
      // Get random prompt (excluding last used)
      const { data: prompts, error: fetchError } = await supabase
        .from('prompts')
        .select('*')
        .eq('game_type', selectedGame)
        .neq('id', get().gameState?.last_used_prompt_id || '00000000-0000-0000-0000-000000000000')
      
      if (fetchError) throw fetchError
      if (!prompts || prompts.length === 0) throw new Error('No prompts available')
      
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
      
      // Other player answers the question
      const otherPlayer = currentUser === 'Nelson' ? 'Nifemi' : 'Nelson'
      
      const { data, error: updateError } = await supabase
        .from('game_state')
        .update({
          current_prompt_id: randomPrompt.id,
          current_prompt_text: randomPrompt.content,
          current_prompt_type: randomPrompt.prompt_type || 'would-you-rather',
          current_prompt_difficulty: randomPrompt.difficulty,
          current_turn: otherPlayer, // Other player answers
          asked_by: currentUser, // Track who asked
          last_used_prompt_id: randomPrompt.id,
          last_response: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)
        .select()
        .single()
      
      if (updateError) throw updateError
      set({ gameState: data })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  
  // Submit response (switches turn back to asker)
  submitResponse: async (response) => {
    const { gameState } = get()
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await supabase
        .from('game_state')
        .update({
          last_response: response,
          current_turn: gameState.asked_by, // Switch back to person who asked
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)
        .select()
        .single()
      
      if (error) throw error
      set({ gameState: data })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  // Clear round (asker clicks OK)
  clearRound: async () => {
    const { gameState } = get()
    const otherPlayer = gameState.asked_by === 'Nelson' ? 'Nifemi' : 'Nelson'
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await supabase
        .from('game_state')
        .update({
          current_prompt_id: null,
          current_prompt_text: null,
          current_prompt_type: null,
          current_prompt_difficulty: null,
          last_response: null,
          asked_by: null,
          current_turn: otherPlayer, // Switch to other player
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)
        .select()
        .single()
      
      if (error) throw error
      set({ gameState: data })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  
  // Load game state
  loadGameState: async () => {
    try {
      const { data, error } = await supabase
        .from('game_state')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (error) throw error
      set({ gameState: data, selectedGame: data.current_game })
    } catch (error) {
      set({ error: error.message })
    }
  },

  // Add custom prompt
  addCustomPrompt: async (prompt) => {
    set({ isLoading: true, error: null })
    try {
      const { error } = await supabase
        .from('prompts')
        .insert([prompt])
      
      if (error) throw error
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  // Load challenges
  loadChallenges: async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      set({ challenges: data || [] })
    } catch (error) {
      set({ error: error.message })
    }
  },

  // Update challenge progress
  updateChallengeProgress: async () => {
    const { challenges } = get()
    const activeChallenge = challenges.find(c => !c.completed)
    
    if (activeChallenge) {
      const newCount = activeChallenge.current_count + 1
      const completed = newCount >= activeChallenge.goal_count
      
      await supabase
        .from('challenges')
        .update({ 
          current_count: newCount,
          completed 
        })
        .eq('id', activeChallenge.id)
      
      get().loadChallenges()
    }
  }
}))
