import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, Route , Routes } from 'react-router-dom';
import Mainpage from './pages/MainPage/index';
import Detailpage from './pages/DetailPage/index';
import Searchpage from './pages/SearchPage/index';


const Layout = () => {
  return (
    <div>
      <Header/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Mainpage/>}/>
          <Route path=":movieId" element={<Detailpage/>}/>
          <Route path="search" element={<Searchpage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

