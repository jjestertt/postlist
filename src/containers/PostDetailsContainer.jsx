import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PostDetails from "../components/PostDetails/PostDetails";
import Preloader from "../components/UI/Preloader/Preloader";
import PostComments from "../components/PostComments/PostComments";
import axios from "axios";


const PostDetailsContainer = ({postsData, isFetch, setIsFetch}) => {
    const [commentsData, setCommentsData] = useState(null); //{id: number,postId: number,text: string,}
    const {id} = useParams(); // id поста вычисляемое из адрессной строки

    useEffect(() => {
    /**
     * Отправляем запрос на сервер и получаем список коментариев для конкретного поста
     * Пост возьмем с фронтенда для того чтобы не нагружать сервер лишними запросами
     * Так же можно взять список постов с сервера но в данном случае при фейковом сервере
     * если мы создадим пост и кликнем на него упадет ошибка.
     * */
        const getPostComments = async () => {
            setIsFetch(true);
            try{
                const response = await axios.get(`https://my-json-server.typicode.com/jjestertt/fakeposts/comments?postId=${id}`);
                setCommentsData(response.data);
            }catch (e) {
                console.error(e);
            }finally {
                setIsFetch(false);
            }

        }
        getPostComments();
    }, []);

    //Не загружаем страницу пока нет данных о постах и коментариях
    if (!postsData || !commentsData) {
        return null;
    }


    /**
     * Функция отправляет запрос на сервер на добавление комментария к определенному,
     * в случае успешного ответа добавляет комментарий на фронтенде
     * @param postId {number, string}
     * @param text {string}
     */
    const addCommentHandler = async (postId, text) => {
        setIsFetch(true);
        try{
            const response = await axios
                .post("https://my-json-server.typicode.com/jjestertt/fakeposts/comments", {
                    text, postId});
            const newCommentsData = [...commentsData, response.data];
            setCommentsData(newCommentsData);
        }catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }

    /**
     * Функция принимает на вход id комментария, отправляет запрос на сервер на его удаление
     * и в случае успешного овета удаляет пост на фронтенде
     * @param id {number}
     */
    const deleteCommentHandler = async (id) => {
        setIsFetch(true);
        try {
            await axios.delete(`https://my-json-server.typicode.com/jjestertt/fakeposts/comments/${id}`);
            const newCommentData = commentsData.filter(comment => comment.id !== id);
            setCommentsData(newCommentData);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }

    /**
     * Функция принимает на вход id комментария, отправляет запрос на сервер на его изменение
     * и в случае успешного овета изменяет комментарий на фронтенде
     * @param id {number, string} Номер комментария
     * @param text {string} Текст комментария
     * @param postId {number} Номер поста
     */
    const changeCommentHandler = async (id, text, postId) => {
        setIsFetch(true);
        try {
            await axios.put(`https://my-json-server.typicode.com/jjestertt/fakeposts/comments/${id}`,
                {id, text, postId});
            const newCommentsData = commentsData.map(comment => {
                if (comment.id === id){
                    return {id, text, postId}
                }
                return comment;
            });
            setCommentsData(newCommentsData);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }

    //Текщий пост это первый эллемент массива постов отфильтрованного по id приходящему из params.
    const currentPost = postsData.filter(post => post.id === +id)[0];

    // Если происходит загрузка чего либо, крутим прелоадер
    if (isFetch) {
        return <Preloader/>;
    }

    return (
        <>
            <PostDetails title={currentPost.title} body={currentPost.body}/>
            <PostComments postId={id}
                          commentsData={commentsData}
                          addCommentHandler={addCommentHandler}
                          deleteCommentHandler={deleteCommentHandler}
                          changeCommentHandler={changeCommentHandler}
            />
        </>
    );
}

export default PostDetailsContainer;