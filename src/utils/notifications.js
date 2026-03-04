export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon.jpeg',
      badge: '/icon.jpeg',
      ...options
    })
  }
}

export const notifyTurnChange = (playerName) => {
  sendNotification('Your Turn!', {
    body: `${playerName} just answered. Spin the wheel!`,
    tag: 'turn-change'
  })
}

export const notifyAnswer = () => {
  sendNotification('New Answer!', {
    body: 'Your partner just responded',
    tag: 'new-answer'
  })
}
