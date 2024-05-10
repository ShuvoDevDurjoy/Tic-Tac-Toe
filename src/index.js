import React from 'react' ; 
import ReactDOM from 'react-dom' ; 
import App from './App' ; 
import "./index.css"


const headers = ['Name',"Address","Age"] ; 

const data =[
  [
    'Shuvo' , 'Dhaka' , '21'
  ],
  [
    'Tonmoy' , 'Chattogram' , '22'
  ],
  [
    'Pranto' , 'Chattogram' , '20'
  ],
  [
    'Nafis Muktasid Arpon' , 'Rajshahi' , '21'
  ],
  [
    'Wasif Haider' , 'Jashore' , '21'
  ]
]
ReactDOM.render(<App headers={headers} data={data}></App> , document.getElementById('root') ) ; 