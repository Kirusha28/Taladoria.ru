import React from 'react'
import './FilterBtn.scss'

import { ReactComponent as FilterIcon} from '../../../assets/svg/filterIcon.svg'

const FilterBtn = () => {
  return (
    <button className='FilterBtn'>
      Фильтры
      <FilterIcon width={20} height={20}/>
    </button>
  )
}

export default FilterBtn