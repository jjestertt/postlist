import React from "react";
import style from "./PostList.module.css";
import AddPostForm from "../AddPostForm/AddPostForm";

export default function PostsList({renderPosts, showAddPost, toggleShowAddPost, addPostHandler}) {

    return (
        <>
            <AddPostForm
                showAddPost={showAddPost}
                toggleShowAddPost={toggleShowAddPost}
                addPostHandler={addPostHandler}
            />
            <h2 className="mt-3 d-inline-block mr-2">Все посты</h2>
            <span className={"text-secondary " + style.AddPostLink}
                  onClick={() => {toggleShowAddPost(!showAddPost)}}
            >
                Добавить пост
            </span>
            <div className="album py-5">
                <div className="container">
                    <div className="row">
                        {renderPosts.length === 0
                            ? <h5>В данный момент постов нет</h5>
                            : renderPosts
                        }
                    </div>
                </div>
            </div>
        </>
    );
}