import { useEffect } from 'react'
import { useStore } from './store/gameStore'
import { useRealtime } from './hooks/useRealtime'
import Login from './components/Login'
import GameSelection from './components/GameSelection'
import GamePlay from './components/GamePlay'

export default function App() {
  const { currentUser, setCurrentUser, selectedGame, initGame, loadGameState } = useStore()
  
  useRealtime()

  useEffect(() => {
    if (currentUser) {
      loadGameState()
    }
  }, [currentUser, loadGameState])

  const handleLogin = (username) => {
    setCurrentUser(username)
  }

  const handleSelectGame = async (gameType) => {
    await initGame(gameType)
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  if (!selectedGame) {
    return <GameSelection onSelectGame={handleSelectGame} />
  }

  return <GamePlay />
}
