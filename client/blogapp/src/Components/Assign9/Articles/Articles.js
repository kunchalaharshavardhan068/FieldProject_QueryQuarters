import React, { useEffect, useState } from 'react'
import { NewAxios } from '../NewAxios/NewAxios';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function Articles() {
    let [articlelist,setarticles] = useState([]);
    let navigate = useNavigate();
    let {currentUser} = useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    async function  getdata() {
        const res = await NewAxios.get("http://localhost:4000/user-api/articles")
        setarticles(res.data.payload)
    }
   function readArticleByArticleId (article){
    navigate(`/article/${article.articleId}`,{state:article})
   }
    console.log(articlelist);
    useEffect(()=>{ getdata()},[])
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {articlelist.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4"  onClick={()=>readArticleByArticleId(article)} >
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Articles