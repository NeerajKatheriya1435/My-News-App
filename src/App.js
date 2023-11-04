// import logo from './logo.svg';
// import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsmain from './components/Newsmain';
import { BrowserRouter as Router, Route, Routes, }
  from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress:10
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  apiKey=process.env.REACT_APP_MY_API_KEY

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            height="3px"
            progress={this.state.progress}
          />
          <Navbar />
          {/* <Newsmain setProgress={this.setProgress}   country="in" category="science" /> */}
          <Routes>
            {/* <Route exact path="/" element={<Navbar />} /> */}
            <Route exact path="/science" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   country="in" key="science" category="science" />} />
            <Route exact path="/" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   country="in" key="Navbar" category="science" />} />
            <Route exact path="/general" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   key="general" country="in" category="general" />} />
            <Route exact path="/home" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   key="home" country="in" category="general" />} />
            <Route exact path="/health" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   key="health" country="in" category="health" />} />
            <Route exact path="/sports" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<Newsmain setProgress={this.setProgress} apiKey={this.apiKey}   key="technology" country="in" category="technology" />} />
          </Routes>
        </Router>
      </>
    )
  }
}

