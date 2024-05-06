import "./Board.css" ; 
import Square from "../../Container/Square/Square" ; 
import React, { useState } from 'react'
import Score from "../Score/Score";




const Board = () => {

  const [history , setHistory] = useState(Array(9).fill(null)) ; 
  const [state,setState] = useState(true) ;
  const [moves , setMoves] = useState(<Score arr={history}/>) ;  


  function handleClick(i)
  {
    if(checkWiner(history)||history[i-1])
    {
      return ; 
    }
    var nextarr = history.slice() ; 
    nextarr[i-1] = state?'X':'O';
    setState((state+1)%2) ;  
    setHistory(nextarr) ; 
    const winer = checkWiner(nextarr) ; 
    if(winer)
    {
      console.log("winer is : "+winer) ; 
      setMoves("Winer is : "+winer) ; 
      return ;  
    }
    setMoves(<Score arr={nextarr}/>) 
  }

  function checkWiner(squares)
  {
    let lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ] ; 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
      return null ; 
    
  }
  return (
    <>
     <div className="board-container">
        <div className="row">
          <Square value={history[0]} clickFunction={()=>handleClick(1)} />
          <Square value={history[1]} clickFunction={()=>handleClick(2)} />
          <Square value={history[2]} clickFunction={()=>handleClick(3)} />
        </div>
        <div className="row">
          <Square value={history[3]} clickFunction={()=>handleClick(4)} />
          <Square value={history[4]} clickFunction={()=>handleClick(5)} />
          <Square value={history[5]} clickFunction={()=>handleClick(6)} />
        </div>
        <div className="row">
          <Square value={history[6]} clickFunction={()=>handleClick(7)} />
          <Square value={history[7]} clickFunction={()=>handleClick(8)} />
          <Square value={history[8]} clickFunction={()=>handleClick(9)} />
        </div>
    </div>
    <div className="status">
      {moves}
    </div>
    </>
  )
}

export default Board
