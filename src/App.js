import React, {useState } from 'react'
import Navbar from './components/Navbar';
import Newsmain from './components/Newsmain';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const [progress, setProgress] = useState(20);
  const setProgress1=(progress1)=>{
    setProgress(progress1)
  }
  const apiKey=process.env.REACT_APP_MY_API_KEY
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            height="3px"
            progress={progress}
          />
          <Navbar />
          {/* <Newsmain setProgress1 = {setProgress1}   country="in" category="science" /> */}
          <Routes>
            {/* <Route exact path="/" element={<Navbar />} /> */}
            <Route exact path="/science" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   country="in" key="science" category="science" />} />
            <Route exact path="/" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   country="in" key="Navbar" category="science" />} />
            <Route exact path="/general" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   key="general" country="in" category="general" />} />
            <Route exact path="/home" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   key="home" country="in" category="general" />} />
            <Route exact path="/health" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   key="health" country="in" category="health" />} />
            <Route exact path="/sports" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<Newsmain setProgress1 = {setProgress1} apiKey={apiKey}   key="technology" country="in" category="technology" />} />
          </Routes>
        </Router>
      </>
    )
}
export default App

