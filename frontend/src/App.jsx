import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Admin from '../components/Admin';
import Alayout from '../components/Alayout';
import Aprofile from '../pages/Aprofile';
import Auser from '../pages/Auser';
import Candidate from '../pages/Candidate';
import CandidateList from '../pages/CandidateList';

function App() {
 

  return (
    <Router>

    <Routes>
       <Route path="/" element={<Login/>}/>  
       <Route path="/signup" element={<Signup/>}/>  
    </Routes>
<Layout>
   <Routes>
       <Route path='/home' element={<Home/>}/>
       <Route path='/candidates' element={<CandidateList/>}/>

   </Routes>
   </Layout>

   <Alayout>
   <Routes>
       <Route path='/admin' element={<Admin/>}/>
       <Route path='/admin/profile' element={<Aprofile/>}/>
       <Route path='/admin/users' element={<Auser/>}/>
       <Route path='/admin/candidates' element={<Candidate/>}/>
   </Routes>
   </Alayout>
   
    </Router>
   
   
  );
}

export default App
