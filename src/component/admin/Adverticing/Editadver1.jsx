
import React, { useState ,useEffect} from 'react'
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom';
import axios from "axios"
 import FileBase64 from 'react-file-base64';
import { errorToast, successToast } from "../../toast";

function Editadver1() {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [percentage,setPercentage] = useState('');
    const [rate,setRate] = useState('');
    const [offerRate,setOfferRate] = useState('');
    const [image,setImage] = useState('');

    const { state } = useLocation();
    const { id } = useParams();
    console.log(state);


    const navigate = useNavigate();


    const addBanner = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3000/api/banner/${id}`,{image:image,title:title,description:description,percentage:percentage,rate:rate,offerRate:offerRate},{headers:{
              'Authorization':`Bearer ${localStorage.getItem("adminToken")} `
            }})
            
            navigate('/admin/bannerview')
            successToast("Products edit Succesfully");
          } catch (error) {
            errorToast(error.message);
          }
    }

     
    useEffect(() => {
        setImage(state?.image);
        setTitle(state?.title);
        setDescription(state?.description);
        setPercentage(state?.percentage);
        setRate(state?.rate);
        setOfferRate(state?.offerRate);
      }, []);



  return (
    <>
    <div className="mb-10">
        <form action="" onSubmit={addBanner}>
            <p className='text-base sm:text-lg mt-3 p-3 text-center'>Edit Banner 1</p>
            
            <div className="flex flex-col w-[200px] gap-3 m-auto mt-3">
                <div className="flex flex-col gap-3">

                    <div className="flex flex-col justify-center items-center sm:ml-0 ml-2 ">
                      <img src={image} alt="loading..." className='bg-slate-100 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-lg m-2' />
                      <FileBase64 onDone={ (res)=>setImage(res.base64)} />  
                    </div>
                    <input type="text" placeholder='heading' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} className='outline outline-1 text-xs sm:text-base   px-2' />
                    <input type="text" placeholder='description' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} className='outline outline-1 text-xs sm:text-base  px-2' />
                    <input type="text" placeholder='offer percentage' name='offer' value={percentage} onChange={(e)=>setPercentage(e.target.value)}className='outline outline-1 text-xs sm:text-base  px-2' />
                    <input type="text" placeholder='rate' name='rate' value={rate} onChange={(e)=>setRate(e.target.value)} className='outline outline-1 text-xs sm:text-base rounded px-2' />
                    <input type="text" placeholder='offer_rate' name='offer_rate' value={offerRate} onChange={(e)=>setOfferRate(e.target.value)} className='outline outline-1 text-xs sm:text-base px-2' />
                </div>
                  <input type="submit" value="Upload"  className='text-green-900 border-green-900 border text-xs sm:text-base hover:bg-green-900 hover:text-white'/> 
            </div>
        </form>
    </div>
    </>
  )
}

export default Editadver1
