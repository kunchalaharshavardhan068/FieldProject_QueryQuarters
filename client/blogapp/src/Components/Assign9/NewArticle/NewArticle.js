import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function NewArticle() {
  let navigate = useNavigate();
  let {register,handleSubmit,formState:{errors}} = useForm();
  let {currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let token = localStorage.getItem('token')
  let [err,setErr] = useState('');
  let newaxios = axios.create({
    headers:{Authorization:`Bearer ${token}`}
  })

  async function handlearticle(article)
  {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    article.articleLength = article.length;
    // console.log(article);
   const res = await newaxios.post('http://localhost:4000/author-api/article',article)
   if(res.data.message==='Article Added') 
   {
    // console.log(res);
    navigate(`/read-article/${currentUser.username}`)
   }
   else {
      setErr(res.data.message);
   }  
  }
  return (
    <div className='container' >
      <center>Write an Article</center>
        <div className='card' >
            <div className='header'>
              <center>
              <form onSubmit={handleSubmit(handlearticle)} >
                <label htmlFor='genere' >Genere</label>
                <select id='genere' className='form-select' {...register("genere")} >
                  <option value="comedy" >Comedy</option>
                  <option value="action" >Action</option>
                  <option value="romance" >Romance</option>
                  <option value="adventure" >Adventure</option>
                  <option value="animation" >Animation</option>
                </select>
                <label htmlFor='title' className='form-label'  >Title</label>
                <input id='title' type='text' className='form-check form-control ' {...register("title")} ></input>
                <label htmlFor='category' className='form-label'  >Category</label>
                <select id='category' className='form-select '  {...register("category")} >
                <option value="programming" >Programming </option>
                <option value="AI&ML" >AI&ML </option>
                <option value="database" >DataBase </option>
                </select>
                <label htmlFor='content' className='form-label'  >Content</label>
                <textarea id='content' rows={10} className='form-check form-control '  {...register("content")} ></textarea>
                <button type='submit' className='btn btn-success ' >Submit</button>

              </form>
              </center>

              
            </div>
        </div>
    </div>
  )
}

export default NewArticle