import React from 'react'

function Score({arr})
{
  return (
      <ol start={0}>
      {
        arr.map((value,index)=>{
          return <li key={index}>{value?value:"nothing"}</li> ; 
        })
      }
      </ol>
  );
}

export default Score
