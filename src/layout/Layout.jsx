import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PostDetailsContainer from "../containers/PostDetailsContainer";
import axios from "axios";
import {useAlert} from "react-alert";

export default function Layout() {
    const alert = useAlert(); // Обработчик ошибок
    const [isFetch, setIsFetch] = useState(true); //Процесс загрузки
    const [postsData, setPostsData] = useState(null); //Данные о постах{id: number, title: string, body: string}


    useEffect(() => {
        /**
         * Функция отправляет запрос на сервер и получает данные о постах
         */
        const getPostsData = async () => {
            setIsFetch(true);
            try {
                const response = await axios.get('https://my-json-server.typicode.com/jjestertt/fakeposts/posts');
                setPostsData(response.data);
            } catch (e) {
                alert.error("Ошибка получения постов");
                console.error(e);
            } finally {
                setIsFetch(false);
            }
        }
        getPostsData();
    }, [])

    return (
        <>
            <Header/>
            <main role="main" className="flex-shrink-0">
                <div className="container">
                    <Route path="/posts/:id" render={() => (
                        <PostDetailsContainer alert={alert}
                            isFetch={isFetch} setIsFetch={setIsFetch}
                            postsData={postsData}
                        />
                    )}/>
                    <Route exact={true} path="/posts" render={() => (
                        <PostsContainer alert={alert}
                            isFetch={isFetch} setIsFetch={setIsFetch}
                            postsData={postsData} setPostsData={setPostsData}
                        />
                    )}/>
                    <Route exact={true} path="/" render={() => <Redirect to='/posts'/>}/>
                </div>
            </main>
            <Footer/>
        </>


    );
}