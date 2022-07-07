import {useState} from "react"
import "./BasicUserCard.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircleIcon from '@mui/icons-material/Circle';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const BasicUserCard=({data})=>{
    const [open, setOpen] = useState(false);
    const [modalData,setModalData]=useState({})
    const handleClose = () => setOpen(false);
  
     return (
         <div className="BasicCardMainDiv">
            {data? data.map((ele,index)=>{
                return (<div onClick={()=>{
                    
                     setModalData(ele)
                     setOpen(true)
                  }}className="BasicCardDiv"  >
                    <div className="ImageDiv">
                         <img src={ele.image}/>
                         <p>{ele.name}</p>
                     </div>
                     <p className="SecondInfo"><CircleIcon sx={{fontSize:10,color:ele.id%2===0?'red':'blue'}}/> {ele.status}-{ele.species}</p>
                </div>)
            }):null}
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <div className="ModalHead">
                <img src={modalData.image}/>
                <div className="InfoDiv">  
                    <p>{modalData.name}</p>
                    <p><CircleIcon sx={{fontSize:10,color:modalData.id%2===0?'red':'blue'}}/> {modalData.status}-{modalData.species}</p>
                </div>
          
            </div>
        
          
           <div className="CharInfo">
            <div>
                <div>
                   <p >Gender</p>
                   <p className="gInfo">{modalData.gender}</p>
                </div>
                <div>
                   <p>Species</p>
                   <p className="gInfo">{modalData.species}</p>
                </div>
            </div>
            <div>
            <div>
                   <p>Location</p>
                   <p className="gInfo">{modalData.location?modalData.location.name:null}</p>
                </div>
                <div>
                   <p>Origin</p>
                   <p className="gInfo">{modalData.origin?modalData.origin.name:null}</p>
                </div>
            </div>
           </div>
          
        </Box>
      </Modal>
         </div>
     )
}