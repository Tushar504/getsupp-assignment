import SearchIcon from '@mui/icons-material/Search';
import {BasicUserCard} from './BasicUserCard'
import { useState,useEffect } from 'react';
import './Search.css'
import { useCallback } from 'react';
export const Search=()=>{
    const [data,setData]=useState([])
    const [page, setPage] = useState(1)
    const [dataname,setname]=useState("")
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
                console.log(context)
                fun.apply(context,args)
            },1000)
        }
    }
   
   const handleChange=async(event,page)=>{
       
        try {
            let name=event.target.value
            if(name!=""){
            let res=await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
            let data=await res.json()
            setData(data.results)
            }
            else{
                let res=await fetch(`https://rickandmortyapi.com/api/character/1,10,15,16,2`)
            let data=await res.json()
            setData(data)
            setPage(1)
            }
            setname(name)
        } 
        catch (error) {
            console.log(error)
        }
   }
const final=useCallback(debounce(handleChange))
const InfiniteScroll=(e)=>{
   
    console.log(e)
}
    
    return (
        <div>
        <div className='SearchDiv'>
            <SearchIcon sx={{marginTop:1.6,color:"aqua"}}/>
            <input onChange={final} type="text" placeholder='Search for a contact'/>
        </div >
        <div onScroll={(e)=>InfiniteScroll(e)} className='ScrollDiv'>
           <BasicUserCard data={data}/>
           </div>
        </div>
    )
}