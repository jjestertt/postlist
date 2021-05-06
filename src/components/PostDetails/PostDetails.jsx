import React from "react";


const PostDetails = ({title, body}) => {
    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{body}</p>
            </div>
        </>
    );
}

export default PostDetails;