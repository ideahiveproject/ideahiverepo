import { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState = {
    posts:[
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            "category": "information technology",
            "image": "https://media.istockphoto.com/id/1420039900/photo/cyber-security-ransomware-email-phishing-encrypted-technology-digital-information-protected.webp?b=1&s=170667a&w=0&k=20&c=CnXO_hc7YtdR0CSVwE1bQFQrxBdR_qzfsfLuD8aKhfA="
        },
        {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
            "category": "education",
            "image": "https://media.istockphoto.com/id/1360520509/photo/businessman-using-a-computer-to-webinar-online-education-on-internet-online-courses-e.webp?b=1&s=170667a&w=0&k=20&c=sWq4OO7eg_Kt47vD_FS2k3AUREyBorCsZxPngSuyuec="
        },{
            "userId": 1,
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
            "category": "education",
            "image": "https://media.istockphoto.com/id/1329983365/photo/online-class-online-education-e-learning-technology-on-mobile-smartphone-training-course-and.webp?b=1&s=170667a&w=0&k=20&c=d8mrdqPJd13c8cc73K0sWNbblncqSZZdP6EBPxXj5Lk="
        },
        {
            "userId": 2,
            "id": 4,
            "title": "et ea vero quia laudantium autem",
            "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
            "category": "industry",
            "image": "https://media.istockphoto.com/id/1435491075/photo/business-logistics-technology-concept.webp?b=1&s=170667a&w=0&k=20&c=rC44MqclncroQCuhM9IdK1BzgqFzYWoxWOUIr5KCgBs="
        }
    ]
}

//create context

export const PostContext = createContext(initialState);

//provider component

export const PostProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //actions
    const removePost = (id) =>{
        dispatch({
            type: 'REMOVE_POST',
            payload: id,
        })
    }

    const addPost = (post) =>{
        dispatch({
            type: 'ADD_POST',
            payload: post,
        })
    }

    const editPost = (post) =>{
        dispatch({
            type: 'EDIT_POST',
            payload: post,
        })
    }

    return (
        <PostContext.Provider value={{
            posts: state.posts,
            removePost,
            addPost,
            editPost
        }}>
        {children}
        </PostContext.Provider>
    )
}

