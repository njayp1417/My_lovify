import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useStore = create((set, get) => ({
  currentUser: null,
  actions: [],
  isLoading: false,
  error: null,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  setActions: (actions) => set({ actions }),
  
  addAction: (action) => set((state) => ({ 
    actions: [action, ...state.actions] 
  })),
  
  updateAction: (id, updates) => set((state) => ({
    actions: state.actions.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Actions
  createAction: async (targetPlayer, type, prompt) => {
    const { currentUser } = get()
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await supabase
        .from('turn_actions')
        .insert({
          from_player: currentUser,
          to_player: targetPlayer,
          type,
          content: prompt,
          status: 'pending'
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      set({ error: error.message })
      return null
    } finally {
      set({ isLoading: false })
    }
  },
  
  completeAction: async (actionId, response) => {
    set({ isLoading: true, error: null })
    
    try {
      const { error } = await supabase
        .from('turn_actions')
        .update({ 
          response, 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', actionId)
      
      if (error) throw error
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  
  // Selectors
  getPendingActions: () => {
    const { actions, currentUser } = get()
    return actions.filter(a => a.to_player === currentUser && a.status === 'pending')
  },
  
  getCompletedActions: () => {
    const { actions, currentUser } = get()
    return actions.filter(a => 
      (a.to_player === currentUser || a.from_player === currentUser) && 
      a.status === 'completed'
    )
  }
}))
