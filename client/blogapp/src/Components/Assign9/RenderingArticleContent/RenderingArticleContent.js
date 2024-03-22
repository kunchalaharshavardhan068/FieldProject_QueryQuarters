import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { NewAxios } from '../NewAxios/NewAxios';
import HoverRating from '../Rating/getLabelText';








function RenderingArticleContent() {
    let {currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    let {state} = useLocation();
    let [comment,setcomment] = useState('')
    let [follow,setFollow] = useState('')
    let [status,setstatus] = useState(false)
    let {register,handleSubmit} = useForm();
    let navigate = useNavigate();
   async function handledata(data){
        data.username = currentUser.username;
        // console.log(data);
        const res = await NewAxios.post(`http://localhost:4000/user-api/comment/${state.articleId}`,data);
        // console.log(res);
        if(res.data.message === 'Comment Posted'){
            setcomment(res.data.message)
        }
    }
  function  changestatus()
    {
        setstatus(true);
    }
   async function following(data,username){
    let obj = {data,username};
    const res = await NewAxios.post("http://localhost:4000/user-api/follow/",obj);
    // console.log(res);
    if(res.data.message==='Following') {
        setFollow(res.data.message);
    }
    // console.log(data,name);

    }
   async function setSave(modifiedData){
        // console.log(modifiedData);
        let editedArticle = {...state,...modifiedData}
        editedArticle.dateOfModification= new Date();
        delete editedArticle._id;
        const res = await NewAxios.put("http://localhost:4000/author-api/article",editedArticle)
        console.log(res);
        if(res.data.message==='Article modified')
        {
            setstatus(false);
            navigate(`/article/${editedArticle.articleId}`,{state:res.data.article})
        }
        // console.log(modifiedData);
    }

  return (
    <div>
        {status===false ?<>
            <div>
        <h1>{state.title}</h1>
        <div>
        {
            currentUser.usertype==='author' &&(
                <>
                {" "}
                <button onClick={changestatus} >Edit</button>
                <button>Delete</button> 
                </>
            )
        }
        </div>
        </div>
        <div>
            <p>DateOfCreation:{state.dateOfCreation}</p>
            <p>DateOfModification:{state.dateOfModification}</p>
        </div>
        <div>
            <p style={{whiteSpace:'pre-line'}} >{state.content}</p>
        </div>
        <div>
            {state.comments.length===0 ?(
                <p className='fs-3' >No Comments Yet ...</p>
            ):(
                state.comments.map((com)=>{
                    return(
                        <div>
                            <h2>{com.username}</h2>
                            <p>{com.comment}</p>
                        </div>
                    );
                })
            )}
        </div>
        <h2>{comment}</h2>
        <div>
            {
                 currentUser.usertype==='user' &&(
                    <>
                    <form onSubmit={handleSubmit(handledata)} >
                    <label htmlFor='comment' className='form-label ' >Comments</label>
                    <input type='text' className='form-control form-check' {...register("comment")} placeholder='Write comment here ...'  ></input>
                    <button className='btn btn-success' type='submit'>Post</button>
                    </form>
                    <label>Rating</label>
                    <div>
                        <HoverRating/>
                    </div>
                    
                    <h2>{follow}</h2>
                    <button  className='btn btn-dark text-light' onClick={()=>following(state.articleId,currentUser.username)} >Follow</button>
                    
                    </>
                )
            }

        </div></>:
        <center>
        <form onSubmit={handleSubmit(setSave)} >
          <label htmlFor='title' className='form-label'  >Title</label>
          <input id='title' type='text' defaultValue={state.title} className='form-check form-control ' {...register("title")} ></input>
          <label htmlFor='category' className='form-label'  >Category</label>
          <select id='category' className='form-select ' defaultValue={state.category}  {...register("category")} >
          <option value="programming" >Programming </option>
          <option value="AI&ML" >AI&ML </option>
          <option value="database" >DataBase </option>
          </select>
          <label htmlFor='content' className='form-label'  >Content</label>
          <textarea id='content' rows={10} className='form-check form-control ' defaultValue={state.content}  {...register("content")} ></textarea>
          <button type='submit' className='btn btn-success ' >Save</button>

        </form>
        </center>

        }
    </div>
  )
}

export default RenderingArticleContent
{/* */}