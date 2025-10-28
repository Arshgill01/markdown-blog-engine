import './App.css';
import PostCard from './Components/PostCard';
import PostList from './Components/PostList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SinglePost } from './Components/SinglePost';
function App() {
  return (
    <div>
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
