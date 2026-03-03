import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useStore } from '../store/gameStore'

export const useRealtime = (username) => {
  const { setActions, addAction, updateAction } = useStore()

  useEffect(() => {
    if (!username) return

    const loadActions = async () => {
      const { data } = await supabase
        .from('turn_actions')
        .select('*')
        .or(`from_player.eq.${username},to_player.eq.${username}`)
        .order('created_at', { ascending: false })
      
      if (data) setActions(data)
    }

    loadActions()

    const channel = supabase
      .channel('actions')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'turn_actions'
      }, (payload) => {
        if (payload.new.from_player === username || payload.new.to_player === username) {
          addAction(payload.new)
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'turn_actions'
      }, (payload) => {
        if (payload.new.from_player === username || payload.new.to_player === username) {
          updateAction(payload.new.id, payload.new)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [username, setActions, addAction, updateAction])
}
