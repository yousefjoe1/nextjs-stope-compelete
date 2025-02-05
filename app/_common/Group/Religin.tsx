import React from 'react'
import PlayersChat from './PlayersChat'

const Religin = ({group}:{group: string}) => {
  return (
    <div>
      <PlayersChat groupId={group} />
    </div>
  )
}

export default Religin