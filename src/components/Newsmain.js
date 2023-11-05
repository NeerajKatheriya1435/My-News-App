import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const Newsmain = (props) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  // const [initialState, setNumber ]=useState ("no")
  // setNumber("hello")
  // setTotalResults(totalresults)
  
  // const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const updateNews = async () => {
    props.setProgress1(20)
    setLoading(true)
    let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
    props.setProgress1(50)
    let resnews = await newsapi.json();
    props.setProgress1(70)
    setLoading(true)
    setArticles(resnews.articles)
    setTotalResults(totalResults)
    props.setProgress1(100)
  }
  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)}-NewsDaily`;
    //eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    setPage(page + 1)
    setLoading(true)
    let newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`)
    let resnews = await newsapi.json();
    setArticles(articles.concat(resnews.articles))
    setTotalResults(resnews.totalResults)
    setLoading(false)

  }
  return (
    <>
      <div className="text-center">
        <h1 className='text-center' style={{ marginTop: "80px" }} >NewsDaily- Top {props.category} Headlines</h1>
      </div>
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== articles}
        loader={loading && <Spinner />}>
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem author={element.author} publishedAt={element.publishedAt} newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
Newsmain.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: "general"
}
Newsmain.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
}

export default Newsmain
