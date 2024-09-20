
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer';
import Article from './components/Article';
import Users from './components/Users';
import ErrorPage from './components/ErrorPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <div className='app'>
    <Header/>
     <Routes>
        <Route path="/" element={  <Home />} />
        <Route path="/articles/" element={<Home />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/users" element={<Users/>}/>
        <Route path="*" element={<ErrorPage errorMsg={"404 Not Found Invalid URL"}/>} />

      </Routes> 
     </div>
     <Footer/>
     </BrowserRouter>
   
    </>
  )
}

export default App
