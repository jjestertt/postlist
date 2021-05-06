import React, {useEffect, useRef} from "react";
import style from "./AddPostForm.module.css";
import {useFormik} from "formik";

export default function AddPostForm({showAddPost, toggleShowAddPost, addPostHandler}) {
    // Реф и инлайновые стили нужны для того чтобы посчитать высоту окна для плавного выезжания формы
    const addPost = useRef();

    useEffect(
        () => {
            /**
             * При размонтировании компонента переменная showAddPost должна стать false
             * Это поможет избежать ошибки когда открыто окно дрбавления поста, и мы захотим удалить
             * пост который уже есть.
             */
            return () => {
                toggleShowAddPost(false);
            }
        },[]
    );

    //Стейт формы добавления поста
    const addPostForm = useFormik({
        initialValues:{
            title: '',
            body: ''
        },
        onSubmit: (values) => {
            addPostHandler(values.title, values.body);
            toggleShowAddPost(false);
        }
    });

    return (
        <div className={"row " + style.AddPost} ref={addPost}
             style={{
                 height: (showAddPost
                     ? addPost.current.scrollHeight + "px"
                     : "0px")
             }}>
            <div className="col">
                <form onSubmit={addPostForm.handleSubmit}>
                    <legend>Добавить новый пост</legend>
                    <div className="form-group">
                        <label htmlFor="title">Название</label>
                        <input type="text" id="title" className="form-control" required={true}
                               {...addPostForm.getFieldProps('title')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Текст поста</label>
                        <textarea type="text" id="body" className="form-control" required={true}
                                  {...addPostForm.getFieldProps('body')}
                        />
                    </div>
                    <button type="submit" className="btn btn-sm btn-success mr-2">Добавить</button>
                    <button type="button" onClick={()=>{toggleShowAddPost(false)}}
                            className="btn btn-sm btn-outline-primary">Закрыть
                    </button>
                </form>
            </div>
        </div>
    );
}