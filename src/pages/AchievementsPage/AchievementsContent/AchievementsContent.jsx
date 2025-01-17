import React from 'react'
import './AchievementsContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import achievementsList from '../../../constants/achievementsList'
import AchievementCard from '../../../components/Cards/AchievementCard/AchievementCard'
import AchievementCardN from '../../../components/Cards/AchievementCard/AchievementCard'

const AchievementsContent = () => {
  return (
    <section className='AchievementsContent'>
      <header className='AchievementsContent__headeer'>
        <FilterBtn />
      </header>
      <main className='AchievementsContent__main'>
        {achievementsList.map((achievement, index) => <AchievementCard card={achievement} key={index}/>)}
      </main>
    </section>
  )
}

export default AchievementsContent