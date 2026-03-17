import React, { useState } from 'react'
import './TreeOwlContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import { useSelector } from 'react-redux'
import Tree from '../../../components/Tree/Tree'

// src/data/achievementsData.js


const TreeOwlContent = () => {
  const user = useSelector(state => state.accountData);
  

  return (
    <section className='TreeOwlContent'>
      <header className='TreeOwlContent__header'>
        <FilterBtn />
        
      </header>
      <main className='TreeOwlContent__main'>
        <Tree />
      </main>
    </section>
  )
}

export default TreeOwlContent