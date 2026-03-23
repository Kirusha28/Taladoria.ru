import React, { useEffect, useState } from 'react'
import './FlappyOwlContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import { useSelector } from 'react-redux'
import Tree from '../../../components/Tree/Tree'
import { mainApi } from '../../../store/services/mainApi'
import FlappyOwl from '../../../components/FlappyOwl/FlappyOwl'
import { useParams } from 'react-router-dom'

// src/data/achievementsData.js


const FlappyOwlContent = () => {
  const user = useSelector(state => state.accountData);
  const params = useParams()?.roomId || 'hall-1'

  return (
    <section className='TreeOwlContent'>
      {/* <header className='TreeOwlContent__header'>
        <FilterBtn />
        
      </header> */}
      <main className='TreeOwlContent__main'>
        <FlappyOwl roomId={params.roomId} />
      </main>
    </section>
  )
}

export default FlappyOwlContent