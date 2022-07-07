import SearchIcon from '@mui/icons-material/Search';
import {BasicUserCard} from './BasicUserCard'
import { useState,useEffect } from 'react';
import './Search.css'
import { useCallback } from 'react';
export const Search=()=>{
    const [data,setData]=useState([])
    const [page, setPage] = useState(1)
    const [dataname,setname]=useState("")
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        let event={target:{value:""}}
           handleChange(event)
    },[])
    const debounce=(fun)=>{
        let id;
        return function(...args){
            
            const context=this
            
            if(id)clearTimeout(id)
            
            id=setTimeout(()=>{
                id=null
              
                fun.apply(context,args)
            },1000)
        }
    }
   
   const handleChange=async(event,page)=>{
       
        try {
            let name=event.target.value
            setPage(1)
            if(name!=""){
            let res=await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
            let data=await res.json()
            setData(data.results)
            }
            else{
                let res=await fetch(`https://rickandmortyapi.com/api/character/1,10,15,16,2`)
            let data=await res.json()
            setData(data)
            
            }
            setname(name)
           
        } 
        catch (error) {
            console.log(error)
        }
   }

   const scrollData=async()=>{
      try {
        if(dataname!=""){
           let  res=await fetch(`https://rickandmortyapi.com/api/character/?name=${dataname}&page=${page}`)
           let data=await res.json()
          
           setData((prev)=>{
            return [...prev,...data.results]
           })
          
        }
        setTimeout(()=>{setloading(false)},500)
      } 
      catch (error) {
        console.log(error)
      }
   }
const final=useCallback(debounce(handleChange))
const InfiniteScroll=(event)=>{
     if(Math.ceil(event.target.scrollTop+event.target.clientHeight)===event.target.scrollHeight){
           setloading(true)
           setPage(page+1)
           scrollData()
     }
}
    
    return (
        <div>
        <div className='SearchDiv'>
            <SearchIcon sx={{marginTop:1.6,color:"aqua"}}/>
            <input onChange={final} type="text" placeholder='Search for a contact'/>
        </div >
        <p>{loading?"loading...":null}</p>
        <div onScroll={(event)=>InfiniteScroll(event)} className='ScrollDiv'>
           <BasicUserCard data={data} page={page}/>
          
           </div>
        </div>
    )
}