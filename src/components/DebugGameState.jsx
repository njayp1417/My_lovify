import { useStore } from '../store/gameStore'

export default function DebugGameState() {
  const { gameState, currentUser } = useStore()
  
  if (!gameState) return <div>No game state</div>
  
  const askedByMe = gameState?.asked_by === currentUser
  const hasResponse = gameState?.last_response
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <h4>Debug Info:</h4>
      <p>Current User: {currentUser}</p>
      <p>Asked By: {gameState.asked_by || 'null'}</p>
      <p>Asked By Me: {askedByMe ? 'true' : 'false'}</p>
      <p>Has Response: {hasResponse ? 'true' : 'false'}</p>
      <p>Should Show OK: {(askedByMe && hasResponse) ? 'YES' : 'NO'}</p>
      <p>Current Turn: {gameState.current_turn}</p>
      <p>Last Response: {gameState.last_response || 'null'}</p>
    </div>
  )
}