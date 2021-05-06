import React, {useState} from "react";
import {useFormik} from "formik";

export default function PostComment({index, id, postId, text, deleteCommentHandler, changeCommentHandler}) {
    const [isEdit, setEdit] = useState(false);

    /**
     * Стейт формы редактирования поста
     */
    const editPostForm = useFormik({
        initialValues: {
            text: text
        },
        onSubmit: values => {
            changeCommentHandler(id, values.text, postId);
        }
    });

    /**
     * При закрытии формы редактирования поста сбрасываем ее состояние в начальное
     */
    const onCloseForm = () =>{
        editPostForm.resetForm();
        setEdit(false);
    }

    return (
        <li className="media mb-4 w-100">
            <div className="comment w-100">
                <div className="media-body">
                    <h6>Комментарий {index + 1}</h6>
                    {isEdit
                        ? <>
                            <form className="w-100" onSubmit={editPostForm.handleSubmit}>
                                <textarea className="form-control mb-2"
                                          {...editPostForm.getFieldProps('text')}
                                />
                                <button type="submit" className="btn btn-sm btn-outline-success mr-1">Сохранить</button>
                                <button onClick={onCloseForm}
                                        className="btn btn-sm btn-outline-secondary ">Отмена
                                </button>
                            </form>
                        </>
                        :<>
                            <p className="mb-1">
                                {text}
                            </p>
                            <button onClick={() => setEdit(true)}
                                    className="btn btn-sm btn-outline-secondary mr-1">
                                Редактировать
                            </button>
                            <button onClick={() => {deleteCommentHandler(id)}}
                                    className="btn btn-sm btn-outline-danger">
                                Удалить
                            </button>
                        </>
                    }

                </div>
            </div>
        </li>
    );
}