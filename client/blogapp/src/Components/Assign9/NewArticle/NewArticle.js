import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function NewArticle() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);
  const token = localStorage.getItem('token');
  const [err, setErr] = useState('');
  const newaxios = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  async function handleArticle(article) {
    article.dateOfCreation = new Date().toLocaleDateString();
    article.dateOfModification = new Date().toLocaleDateString();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    article.articleLength = article.content.length;

    try {
      const res = await newaxios.post('http://localhost:4000/author-api/article', article);
      if (res.data.message === 'Article Added') {
        navigate(`/read-article/${currentUser.username}`);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Write an Article</h2>
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleArticle)} >
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <select id="genre" className="form-select" {...register("genere")}>
                <option value="comedy">Comedy</option>
                <option value="action">Action</option>
                <option value="romance">Romance</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input id="title" type="text" className="form-control" {...register("title")} />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select id="category" className="form-select" {...register("category")}>
              <option value="story">Story</option>
                  <option value="poem">Poem</option>
                  <option value="shortstory">Short-Story</option>
                  <option value="essay">Essay</option>
                  <option value="fictional">Fictional-Stories</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea id="content" rows={5} className="form-control" {...register("content")} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;