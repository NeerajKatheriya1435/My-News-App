import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt,source } = this.props
        return (
            <div className="card">
                <img src={imageUrl ? imageUrl : "https://cdn.arstechnica.net/wp-content/uploads/2023/10/GettyImages-1242978740-760x380.jpg"} className="card-img-top" alt="Error loading..." />
                <div className="card-body">
                    <h5 className="card-title">{title ? title : "No titile"}</h5>
                    <p className="card-text">{description ? description : "No description"}...</p>
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{float:"left",zIndex:"1",left:source.length<15 ?"92%":"82%"}}>
                        {source}
                    </span>
                    <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Click Here For More</a>
                </div>
            </div>
        )
    }
}

export default Newsitem
