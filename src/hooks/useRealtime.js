import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useStore } from '../store/gameStore'

export const useRealtime = () => {
  const { setGameState } = useStore()

  useEffect(() => {
    const channel = supabase
      .channel('game_state')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_state'
      }, (payload) => {
        setGameState(payload.new)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [setGameState])
}
