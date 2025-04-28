import { FaBeer } from '@react-icons/all-files/fa/FaBeer.js';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import AxiosTest from './components/AxiosTest.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './page/ErrorPage.jsx';
import TestPage1 from './page/TestPage1.jsx';
import TestPage2 from './page/TestPage2.jsx';
import TestPage3 from './page/TestPage3.jsx';
import TestPage4 from './page/TestPage4.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/login/Signup.jsx';
import MainPage from './page/main/MainPage.jsx';

function App() {

  return (
    <>



      <BrowserRouter>
        <Header />

        <h1>Router Test</h1>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/test1'} element={<TestPage1 />} />
          <Route path={'/test2'}>
            <Route index element={<TestPage2 />} />
            <Route path={'test3'} element={<TestPage3 />} />
          </Route>
          <Route path={'/test4'} element={<TestPage4 />} />
          <Route path={'/login'} element={<Login />} />

          <Route path={'*'} element={<ErrorPage />} />
        </Routes>

        <br/><br/><br/>

        <div className={'container mt-5'}>
          <h1>Bootstrap Test</h1>
          <button className={'btn btn-primary'}>Bootstrap</button>
        </div>

        <hr/>

        <div className={'container mt-5'}>
          <h1>React-Icon Test</h1>
          <h1><FaBeer /></h1>
        </div>

        <hr/>

        <div className={'container mt-5'}>
          <h1>Tailwindcss Test</h1>
          <p className={'text-5xl font-bold underline'}>tailwind</p>
        </div>

        <hr/>

        <div className={'container mt-5'}>
          <h1>Axios Test</h1>
          <AxiosTest />
        </div>

        <hr/>


      </BrowserRouter>

      <br/><br/><br/>

      <Footer />
    </>

  )
}

export default App
