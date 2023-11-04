import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class Newsmain extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // articles = []
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,

      // pageSize:20,
      // totalResults:0

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsDaily`
  }

  async updateNews() {
    this.props.setProgress(20)
    this.setState({ loading: true })
    let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    this.props.setProgress(50)
    let resnews = await newsapi.json();
    this.props.setProgress(70)
    this.setState({
      articles: resnews.articles,
      totalResults: resnews.totalResults,
      loading: true
      // pageSize:20
    })
    this.props.setProgress(100)
  }
  async componentDidMount() {
    // this.setState({ loading: true })
    // let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f6e9b5eb495049f2a2c81bd02fede1d8&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    // let resnews = await newsapi.json();
    // this.setState({
    //   articles: resnews.articles,
    //   page: 1,
    //   totalResults: resnews.totalResults,
    //   loading: false
    //   // pageSize:20
    // })
    this.updateNews();
  }
  handleonPrev = async () => {
    // console.log("Clicked on Prev")
    // this.setState({ loading: true })
    // let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f6e9b5eb495049f2a2c81bd02fede1d8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
    // let resnews = await newsapi.json();
    // this.setState({
    //   articles: resnews.articles,
    //   page: this.state.page - 1,
    //   loading: false
    //   // pageSize:20
    // })
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  }
  handleonNext = async () => {
    // console.log("Clicked on Next")
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

    //   this.setState({ loading: true })
    //   let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f6e9b5eb495049f2a2c81bd02fede1d8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
    //   let resnews = await newsapi.json();
    //   this.setState({ articles: resnews.articles, page: this.state.page + 1, loading: false })
    // }
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();
  }
  fetchData = async () => {
    
    this.setState({
      page: this.state.page + 1,
      loading: true 
    })
    // this.setState({ })
    let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`)
    let resnews = await newsapi.json();
    this.setState({
      articles: this.state.articles.concat(resnews.articles),
      totalResults: resnews.totalResults,
      loading: false,
      // pageSize:20
    })
    
    
  }

  render() {
    return (
      <>
        {/* // <div className='container my-3'> */}

        <div className="text-center">
          <h1 className='text-center'>NewsDaily- Top {this.props.category} Headlines</h1>
          {/* {this.state.loading && <Spinner />} */}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.articles}
          loader={this.state.loading && <Spinner />}
        ><div className="container">
            <div className="row my-3">
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem author={element.author} publishedAt={element.publishedAt} newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between container">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handleonPrev}>&larr; Previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleonNext}>Next &rarr;</button>
        </div> */}
        {/* </div> */}
      </>
    )
  }
}

export default Newsmain
