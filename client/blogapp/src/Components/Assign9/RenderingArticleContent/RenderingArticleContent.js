import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { NewAxios } from '../NewAxios/NewAxios';
import HoverRating from '../Rating/getLabelText';
import { IoPersonCircle } from "react-icons/io5";
import './RenderingArticleContent.css'
import { FaEdit } from "react-icons/fa";







function RenderingArticleContent() {
    let { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer)
    let { state } = useLocation();
    let [comment, setcomment] = useState('')
    let [follow, setFollow] = useState('')
    let [status, setstatus] = useState(false)
    let { register, handleSubmit } = useForm();
    let navigate = useNavigate();
    async function handledata(data) {
        data.username = currentUser.username;
        // console.log(data);
        const res = await NewAxios.post(`http://localhost:4000/user-api/comment/${state.articleId}`, data);
        // console.log(res);
        if (res.data.message === 'Comment Posted') {
            setcomment(res.data.message)
        }
    }
    function changestatus() {
        setstatus(true);
    }
    async function following(data, username) {
        let obj = { data, username };
        const res = await NewAxios.post("http://localhost:4000/user-api/follow/", obj);
        // console.log(res);
        if (res.data.message === 'Following') {
            setFollow(res.data.message);
        }
        // console.log(data,name);

    }
    async function setSave(modifiedData) {
        // console.log(modifiedData);
        let editedArticle = { ...state, ...modifiedData }
        editedArticle.dateOfModification = new Date();
        delete editedArticle._id;
        const res = await NewAxios.put("http://localhost:4000/author-api/article", editedArticle)
        console.log(res);
        if (res.data.message === 'Article modified') {
            setstatus(false);
            navigate(`/article/${editedArticle.articleId}`, { state: res.data.article })
        }
        // console.log(modifiedData);
    }

    return (
        <div>
            {status === false ? <>
                <div>

                    <div className='d-flex justify-content-between' >
                        <div>
                            <h1>{state.title}</h1>
                            <h4>Genere:<span className='fs-4' >{state.genere}</span></h4>
                        </div>
                        <div>
                            <div className='d-flex' >
                                <p className='fs-5 fw-bolder  ' >Author:<span className='fs-2 fw-light  ' >{state.username}</span> </p>

                            </div>
                            {
                                currentUser.usertype === 'user' ?<>
                                    {
                                        follow === "Following" ? <>
                                        <button className='btn btn-success text-light'>Following</button>
                                    </> : <>
                                        <button className='btn btn-dark  text-light' onClick={() => following(state.articleId, currentUser.username)} >Follow</button>
                                    </>
                                    }
                                    </>:
                                    <>
                                    {" "}
                                    <div className='d-flex'>
                                        <FaEdit className='edit-icon' />
                                        <button onClick={changestatus} className='btn btn-dark  text-light'  >Edit</button>
                                    </div>
                                    {/* <button>Delete</button>  */}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className='d-flex' >
                    <div>
                        <p className='fw-bold fs-5' >DateOfCreation:       <span className='fs-6 fw-semibold  ' >{state.dateOfCreation}</span></p>
                        <p className='fw-bold fs-5' >DateOfModification:       <span className='fs-6 fw-semibold ' >{state.dateOfModification}</span></p>
                    </div>
                </div>
                <div>
                    <p style={{ whiteSpace: 'pre-line' }} >{state.content}</p>
                </div>
                <div>
                    <div>
                        <h2>Comments...</h2>
                    </div>
                    <div>
                        {state.comments.length === 0 ? (
                            <p className='fs-3'>No Comments Yet ...</p>
                        ) : (
                            <div className="comment-container p-2 ">
                                {state.comments.map((com, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='d-flex'>
                                                <IoPersonCircle className='icon' />
                                                <h4>{com.username}</h4>
                                            </div>
                                            <p className='border-1'>{com.comment}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
                <h2>{comment}</h2>
                <div>
                    {
                        currentUser.usertype === 'user' && (
                            <>
                                <form onSubmit={handleSubmit(handledata)} >
                                    <label htmlFor='comment' className='form-label fw-bold ' >Post Comments</label>
                                    <input type='text' className='form-control form-check' {...register("comment")} placeholder='Write comment here ...'  ></input>
                                    <button className='btn btn-success my-2' type='submit'>Post</button>
                                </form>
                                <label className='fw-bold mb-1' >Rating</label>
                                <div>
                                    <HoverRating />
                                </div>



                            </>
                        )
                    }

                </div></> :
                <div className="container mt-5">
                    <h2 className="text-center">Edit Article</h2>
                    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(setSave)} >
                                <div className="mb-3">
                                    <label htmlFor="genre" className="form-label">Genre</label>
                                    <select id="genre" className="form-select" defaultValue={state.genere} {...register("genre")}>
                                        <option value="comedy">Comedy</option>
                                        <option value="action">Action</option>
                                        <option value="romance">Romance</option>
                                        <option value="adventure">Adventure</option>
                                        <option value="animation">Animation</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input id="title" type="text" className="form-control" defaultValue={state.title} {...register("title")} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select id="category" className="form-select" defaultValue={state.category} {...register("category")}>
                                        <option value="story">Story</option>
                                        <option value="poem">Poem</option>
                                        <option value="shortstory">Short-Story</option>
                                        <option value="essay">Essay</option>
                                        <option value="fictional">Fictional-Stories</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <textarea id="content" rows={5} className="form-control" defaultValue={state.content} {...register("content")} />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default RenderingArticleContent
{/* */ }