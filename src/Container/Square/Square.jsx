import React from 'react'
import './Square.css' ; 

const Square = ({value,clickFunction}) => {
  return (
    <div>
      <button className='buttons' onClick={clickFunction}>{value}</button>
    </div>
  )
}

export default Square
