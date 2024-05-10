import React, { useEffect, useState } from 'react' ; 
import "./App.css" ; 


const App = ({headers,data}) => {

    const [dataset , setDataset] = useState(data) ; 
    const [prevData , setPreData] = useState(data) ; 
    const [sorting , setSorting] = useState({
      sortingData : null ,
      column : null , 
      descending : false 
    }) ; 

    const [editData , setEditData] = useState({
      row : null , 
      column : null 
    })

    const [search , setSearch] = useState(true) ; 
    const [searchContent , setSearchContent] = useState(
      {
        content : Array(data[0].length)
      }
    )

    useEffect(()=>{
      setSearch(false) ; 
    },[]) ; 

    const defautlDataSet = clone(data) ; 


    function clone(value)
    {
      return JSON.parse(JSON.stringify(value)) ; 
    }


function ClickHandler(event)
{
  const sortingData =  clone(dataset) ; 
  // window.alert(sortingData.length) ;  

  for (let i = 0 ; i < sortingData.length ; ++i)
  {
    for(let j = i+1 ; j < sortingData.length; ++j)
    {
      if(!sorting.descending&&sortingData[i][event.target.cellIndex] > sortingData[j][event.target.cellIndex])
      {
        // console.log(j) ; 
        const data = sortingData[i] ; 
        sortingData[i] = sortingData[j] ; 
        sortingData[j] = data ; 
      }
      else if(sorting.descending&&sortingData[i][event.target.cellIndex] < sortingData[j][event.target.cellIndex])
      {
        // console.log(j) ; 
        const data = sortingData[i] ; 
        sortingData[i] = sortingData[j] ; 
        sortingData[j] = data ; 
      }
    }
  }
  setDataset(sortingData) ; 
}

function changingOrder()
{
  if(sorting.descending)
  {
    setSorting(
      {
        descending : false 
      }
    )

  }
  else{
    setSorting({
      descending : true 
    })
  }
}

function inputChanged(event)
{
  const data = clone(dataset);
  data[editData.row][editData.column] = event.target.value ; 
  setDataset(data) ; 
  setPreData(data) ; 
}

function setToDefault()
{
  setDataset(defautlDataSet) ; 
}

function inputListener(event)
{
  event.preventDefault(); 
  console.log("column is : "+event.target.cellIndex) ; 
  console.log("row is : "+event.target.parentNode.dataset.row); 
  event.preventDefault() ; 
    setEditData({
      row : event.target.parentNode.dataset.row ,
      column : event.target.cellIndex 
    })
}

function searchChanged(event)
{
  let contents = clone(searchContent.content) ; 
  contents[event.target.parentNode.cellIndex] = event.target.value ; 
  console.log(contents) ; 
  setSearchContent({
    content : contents 
  }) ; 
  let tempdata = []
  for(let i = 0 ; i < prevData.length ; ++i)
  {
    let check = true ; 
    for(let j = 0 ; j < contents.length ; ++j)
    {
      if(contents[j]==null)
      {
        continue ; 
      }
      else if(prevData[i][j].toLowerCase().indexOf(contents[j])==-1)
      {
        console.log("prev data is : "+prevData[i][j]) ; 
        console.log(contents[j]) ; 
        console.log("false statement : "+j) ; 
        check= false ; 
        break ; 
      }
    }
    if(check)
    {
      tempdata.push(prevData[i]) ; 
    }
  }
  setDataset(tempdata) ; 
}

function searchControl()
{
  if(search){
    setSearch(false) ; 
  }
  else{
    setSearch(true) ; 
  }
}


  return (

    <div className='table-container'>
      <table className='table'>
      <thead onClick={(event)=>ClickHandler(event)}>
        <tr>
          {
            headers.map((d,index)=>{
              return <th key={index}>{d}</th>
            })
          }
        </tr>
      </thead>
      <tbody onDoubleClick={(event)=>inputListener(event)}>
      { 
      search?<tr>
            {
              prevData[0].map((_,index)=>{
                return <td className='search-data-field' data-idx={index} key={index}><input key={index}  onChange={(event)=>searchChanged(event)} className='input-holder'></input></td>
              })
            }
          </tr>:null}
      {
        dataset? 
          dataset.map((v,rowindex)=>{
              return <tr key={rowindex} data-row={rowindex}>
                {
                  v.map((value,colindex)=>{
                    if(editData.row==rowindex && editData.column==colindex)
                    {
                      return <td className='search-data-field' key={colindex}>
                        <input onChange={(event)=>inputChanged(event)} className='input-holder' value={value}/>
                      </td>
                    }
                    else return <td onClick={()=>{
                    setEditData({
                      row : null , 
                      column : null
                    })
                    }}  key={colindex}>
                      {value}
                    </td>
                  })
                }
              </tr>
          })
        :null
      }
      </tbody>
    </table>
    <div className='button-holder'>
      <button className='button-type-1 button-ascending-descending' onClick={()=>changingOrder()}>{
        sorting.descending?'Ascending':'Descending' 
        }</button>
      
      <button className='button-type-1  set-default' onClick={()=>setToDefault()}>
        Set To Default
      </button>

      <button onClick={()=>searchControl()} className='button-type-1 search-enable'>{search?'Search Disable':'Search Enable'}</button>
    </div>
    </div>
  )
}

export default App
