import React from "react";
import {useState} from "react";
import axios from "axios";
import Preloader from "../components/UI/Preloader/Preloader";
import PostListItem from "../components/PostsList/PostListItem/PostListItem";
import PostsList from "../components/PostsList/PostsList";


export default function PostsContainer({isFetch, setIsFetch, postsData, setPostsData}) {
    const [showAddPost, toggleShowAddPost] = useState(false); //Показать окно добавления поста

    //Не загружаем страницу пока нет данных о постах
    if (!postsData) {
        return null;
    }

    /**
     * Функция принимает на вход id поста, отправляет запрос на сервер на его удаление
     * и в случае успешного овета удаляет пост на фронтенде
     * @param id {number}
     */
    const deletePostHandler = async (id) => {
        setIsFetch(true);
        try {
            await axios.delete(`https://my-json-server.typicode.com/jjestertt/fakeposts/posts/${id}`);
            const newPostData = postsData.filter(post => post.id !== id);
            setPostsData(newPostData);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }

    /**
     * Функция принимает на вход id поста, отправляет запрос на сервер на его изменение
     * и в случае успешного овета изменяет пост на фронтенде
     * @param id {number}
     * @param title {string}
     * @param body {string}
     */
    const changePostHandler = async (id, title, body) => {
        setIsFetch(true);
        try {
            await axios.put(`https://my-json-server.typicode.com/jjestertt/fakeposts/posts/${id}`,
                    {id, title, body});

            const newPostsData = postsData.map(post => {
                if (post.id === id){
                    return {id, title, body}
                }
                return post;
            });
            setPostsData(newPostsData);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }

    /**
     * Функция отправляет запрос на сервер на добавление поста,
     * в случае успешного ответа добавляет пост на фронтенде
     * @param title {string}
     * @param body  {string}
     */
    const addPostHandler = async (title, body) => {
        setIsFetch(true);
        try {
            const response = await axios.post(`https://my-json-server.typicode.com/jjestertt/fakeposts/posts/`,
                {title, body});
            const newPostsData = [...postsData, response.data];
            setPostsData(newPostsData);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetch(false);
        }
    }
    //Преобразуем массив с постами в массив с jsx
    const renderPosts = postsData.map(post => (
        <PostListItem key={post.id} id={post.id}
                      title={post.title} body={post.body}
                      deletePostHandler={deletePostHandler}
                      changePostHandler={changePostHandler}
        />
    ));

    // Если происходит загрузка чего либо, крутим прелоадер
    if (isFetch) {
        return <Preloader/>;
    }

    return (
        <PostsList renderPosts={renderPosts}
                   showAddPost={showAddPost}
                   toggleShowAddPost={toggleShowAddPost}
                   addPostHandler={addPostHandler}
        />
    );
}