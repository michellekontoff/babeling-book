import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import PostPage from './components/PostPage';
import PostCreateForm from './components/PostCreateForm';
import PostsLatest from './components/PostsLatest';
import SearchResults from './components/Search/SearchResults';
import Wrapper from './components/Wrapper'

import "../src/fontawesome/css/all.css"

function App() {
   const [loaded, setLoaded] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         await dispatch(authenticate());
         setLoaded(true);
      })();
   }, [dispatch]);

   if (!loaded) {
      return null;
   }

   return (
      <BrowserRouter>
         <Wrapper>
            <NavBar />
            <Switch>
               <ProtectedRoute path='/users/:userId' exact={true}>
                  <Profile />
               </ProtectedRoute>
               <ProtectedRoute path='/posts/new' exact={true}>
                  <PostCreateForm />
               </ProtectedRoute>
               <ProtectedRoute path='/posts/latest' exact={true}>
                  <PostsLatest />
               </ProtectedRoute>
               <ProtectedRoute path={`/posts/:postId(\\d+)`} exact={true}>
                  <PostPage />
               </ProtectedRoute>
               <ProtectedRoute path={`/search`} exact={false}>
                  <SearchResults />
               </ProtectedRoute>
               <Route path='/' exact={true}>
                  <Homepage />
               </Route>
               <Route>
                  <h1 id='not-found'>
                     <p>404</p>
                     <p>The page you requested could not be found.</p>
                  </h1>
               </Route>
            </Switch>
         </Wrapper>
      </BrowserRouter>
   );
}

export default App;
