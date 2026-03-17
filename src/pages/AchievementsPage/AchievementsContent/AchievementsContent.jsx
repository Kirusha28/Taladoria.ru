import React, { useState } from 'react'
import './AchievementsContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import AchievementCard from '../../../components/Cards/AchievementCard/AchievementCard'
import { useSelector } from 'react-redux'
import Switch from '../../../components/Switch/Switch'

const AchievementsContent = () => {
  const user = useSelector(state => state.accountData);
  const [cardMode, setCardMode] = useState('full');

  return (
    <section className='AchievementsContent'>
      <header className='AchievementsContent__header'>
        <FilterBtn />
        <Switch
          checked={cardMode === 'minimal'}
          onChange={() => setCardMode(cardMode === 'minimal' ? 'full' : 'minimal')}
          size="medium"
          checkedColor="#FF720D"
          uncheckedColor="#e5e7eb"
          thumbColor="#ffffff"
          borderColor="#d1d5db"
        />
      </header>
      <main className='AchievementsContent__main'>
        {user?.achievements?.map((achievement, index) => <AchievementCard 
          card={achievement} 
          key={index}
          mode={cardMode}
        />)}
      </main>
    </section>
  )
}

export default AchievementsContent