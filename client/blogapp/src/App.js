import React from 'react'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Rootcomponent from './Components/Assign9/rootcomponent/RootComponent';
import Home from './Components/Assign9/home/Home'
import Signup from './Components/Assign9/signup/Signup';
import Signin from './Components/Assign9/signin/Signin';
import ProfileOfUser from './Components/Assign9/ProfileOfUser/ProfileOfUser';
import AuthorProfile from './Components/Assign9/AuthorProfile/AuthorProfile';
import NewArticle from './Components/Assign9/NewArticle/NewArticle';
import Article from './Components/Assign9/ArticlesReading/Article';
import RenderingArticleContent from './Components/Assign9/RenderingArticleContent/RenderingArticleContent';
import Articles from './Components/Assign9/Articles/Articles';
// import NewArticle from ''; 
//  const NewArticles =lazy(()=>import('./Components/Assign9/NewArticle/NewArticle'))

function App() {
  let routes = createBrowserRouter([
    {
    path: '/',
    element: <Rootcomponent />,
    children: [{
      path: '/',
      element: <Home />
    }, {
      path: '/signup',
      element: <Signup />
    }, {
      path: '/signin',
      element: <Signin />
    },
    {
    path: '/userprofile',
    element:<ProfileOfUser/>
  },
      {
        path:'/articles',
        element:<Articles/>
      },
  
{
  path:'/authorprofile',
  element:<AuthorProfile/>
},
    {
      path:'',
      element:<Article/>
    },

{
  path:'/add-article',
  element:<NewArticle/>
},
{
  path:'/read-article/:authorname',
  element:<Article/>
},
{
  path:'/article/:articleid',
  element:<RenderingArticleContent/>
},{
  path:'/articles',
  element:<Articles/>
}
]
  }])
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App