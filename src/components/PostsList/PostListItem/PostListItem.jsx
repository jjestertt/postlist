import {useState} from "react";
import {useFormik} from "formik";
import {useHistory} from "react-router-dom";

export default function PostListItem(props) {
    const [isEdit, setEdit] = useState(); // переключатель редактирования формы
    const history = useHistory();

    //Стейт формы редактирования поста
    const editPostForm = useFormik({
        initialValues: {
            title: props.title,
            body: props.body,
        },
        onSubmit: (values) => {
            props.changePostHandler(props.id, values.title, values.body);
            setEdit(false);
        }
    });

    /**
     * Редирект на страницу деталей поста
     */
    const showPostDetails = () => {
        history.push(`/posts/${props.id}`);
    }

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    {
                        isEdit
                            ? <form onSubmit={editPostForm.handleSubmit}>
                                <input type="text" className="form-control mb-4" required={true}
                                       {...editPostForm.getFieldProps('title')}
                                />
                                <textarea className="form-control mb-3" rows="5" required={true}
                                          {...editPostForm.getFieldProps('body')}
                                />
                            </form>
                            : <>
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text">{props.body}</p>
                            </>
                    }

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button onClick={showPostDetails} type="button" className="btn btn-sm btn-outline-success">Открыть
                            </button>
                            {
                                isEdit
                                    ?<button type="button" className="btn btn-sm btn-outline-success"
                                                  onClick={editPostForm.handleSubmit}>
                                            Сохранить
                                    </button>
                                    :<button type="button" className="btn btn-sm btn-outline-primary"
                                             onClick={() => {setEdit(true)}}>
                                            Изменить
                                    </button>
                            }
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-danger float-right"
                                onClick={() => {props.deletePostHandler(props.id)}}>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}