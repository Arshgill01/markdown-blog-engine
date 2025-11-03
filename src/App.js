import './App.css';
import PostCard from './Components/PostCard';
import PostList from './Components/PostList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SinglePost } from './Components/SinglePost';

import  ThemeContext  from './Context/ThemeContext';
import { useContext } from 'react';

function App() {
  const {theme, setTheme} = useContext(ThemeContext);
  
  console.log('Current theme:', theme); // Debug log
  
  return (
    <div className={theme === 'dark'? 'dark-theme': 'light-theme'}>
      
      <Header/>
      <Routes>
        <Route path="/" element={<PostList></PostList>}></Route>
        <Route path="/post/:slug" element={<SinglePost></SinglePost>}></Route>
      </Routes>
      <Footer/>     
       
    </div>
  );
}

export default App;
