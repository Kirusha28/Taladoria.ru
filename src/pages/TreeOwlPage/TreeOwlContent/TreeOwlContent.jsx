import React, { useEffect, useState } from 'react'
import './TreeOwlContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import { useSelector } from 'react-redux'
import Tree from '../../../components/Tree/Tree'
import { mainApi } from '../../../store/services/mainApi'

// src/data/achievementsData.js


const TreeOwlContent = () => {
  const user = useSelector(state => state.accountData);
  const {data: treeData={}, isLoadingTree} = mainApi.useGetTreeDataQuery();

  useEffect(() => {
    console.log(treeData)
  }, [treeData])

  return (
    <section className='TreeOwlContent'>
      {/* <header className='TreeOwlContent__header'>
        <FilterBtn />
        
      </header> */}
      <main className='TreeOwlContent__main'>
        {isLoadingTree ? <div>Загрузка...</div> : <Tree data={treeData?.treeData}/>}
      </main>
    </section>
  )
}

export default TreeOwlContent