import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import config from './config/config'
import './App.css'
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
      dispatch(login({userData}));
      }else{
        dispatch(logout())
      }
        })
    .finally(()=>{setLoading(false)})
  },[])
   
//^ this is called CONDITIONAL RENDERING
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header/>
    <main>
    TODO: {/* <Outlet/> */}
    </main>
    <Footer/>
    </div>
    </div>
  ):null;
}

export default App
