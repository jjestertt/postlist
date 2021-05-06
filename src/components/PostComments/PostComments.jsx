import React from "react";
import PostComment from "./PostComment/PostComment";
import {useFormik} from "formik";

export default function PostComments({commentsData, addCommentHandler, postId, deleteCommentHandler, changeCommentHandler}) {
    // Стейт формы добавления комментария
    const addCommentForm = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit : values => {
            addCommentHandler(postId ,values.text);
        }
    });

    /**
     *  На основе массива коментариев делаем массив с готовым jsx
     */
    const renderComment = commentsData.map((comment, index) => {
        return (
            <PostComment key={comment.id} index={index} id={comment.id} postId={comment.postId} text={comment.text}
                         deleteCommentHandler={deleteCommentHandler} changeCommentHandler={changeCommentHandler}
            />
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            Комментарии
                        </div>
                        <div className="panel-body comments">
                            <form onSubmit={addCommentForm.handleSubmit}>
                                <textarea className="form-control mb-3" placeholder="Оставьте Ваш комментарий"
                                          rows="3" {...addCommentForm.getFieldProps('text')}
                                />
                                <button type="submit" className="btn btn-success pull-right">Отправить</button>
                            </form>
                            <hr className="mb-3"/>
                            <ul className="media-list">
                                {renderComment.length === 0
                                    ? <span className="text-secondary">Комментариев пока нет</span>
                                    : renderComment
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}