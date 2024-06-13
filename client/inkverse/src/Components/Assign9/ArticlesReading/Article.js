import React, { useEffect, useState } from 'react';
import { NewAxios } from '../NewAxios/NewAxios';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import './Article.css';

function Article() {
  const [articlelist, setArticles] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);

  async function getData() {
    try {
      const res = await NewAxios.get(`http://localhost:4000/author-api/articles/${currentUser.username}`);
      setArticles(res.data.payload);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  function readArticleByArticleId(article) {
    navigate(`/article/${article.articleId}`, { state: article });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container containerArticlecss mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {articlelist.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
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
  );
}

export default Article;