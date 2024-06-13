import React, { useEffect, useState } from 'react';
import { NewAxios } from '../NewAxios/NewAxios';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Articles.css';
import { useForm } from 'react-hook-form';

function Articles() {
  const {register,handleSubmit}= useForm();
  const [articleList, setArticles] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userAuthoruserAuthorLoginReducer);
async  function handleGenere(obj){
  console.log(obj);
  if(obj.genere==='All'){
    const res = await NewAxios.get('http://localhost:4000/user-api/articles');
    setArticles(res.data.payload);
  }
  else{
    const res = await NewAxios.post("http://localhost:4000/user-api/articlesbygenere",obj);
    setArticles(res.data.payload);
  }
  }

  async function getData() {
    const res = await NewAxios.get('http://localhost:4000/user-api/articles');
    setArticles(res.data.payload);
  }

  function readArticleByArticleId(article) {
    navigate(`/article/${article.articleId}`, { state: article });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='mt-3' >
      <div>
        <form onSubmit={handleSubmit(handleGenere)} >
        <div className='d-flex' >
        <div className='d-flex' >
        <div><label htmlFor="genre" className="form-label w-25 my-1 fw-bold fs-5">Genre: </label></div>
        <div className='mx-1' >
        <select id="genre" className="form-select" {...register("genere")}>
                <option value="All" defaultValue="All" >All</option>
                <option value="comedy">Comedy</option>
                <option value="action">Action</option>
                <option value="romance">Romance</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
              </select>
        </div>
        </div>
        <div>
        <button type='submit' className='btn btn-success' >Search</button>
        </div>
        </div>
        </form>
      </div>
    <div className="container mt-5">
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {articleList.map((article) => (
        <div className="col" key={article.articleId}>
          <div className="card rounded-3  h-100">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.content.substring(0, 80)}...</p>
              <button className="btn btn-primary" onClick={() => readArticleByArticleId(article)}>Read More</button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated on {article.dateOfModification}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Outlet />
  </div>
    </div>
  );
}

export default Articles;