import React from 'react'
import './TreeOwlPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import TreeOwlContent from './TreeOwlContent/TreeOwlContent'

const TreeOwlPage = () => {
  return (
    <>
      <MainHeader />
      <main className='TreeOwlPage__content'>
        <SideBar />
        <TreeOwlContent />
      </main>
    </>
  )
}

export default TreeOwlPage