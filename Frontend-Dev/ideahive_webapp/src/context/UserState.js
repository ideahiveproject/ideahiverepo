import { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState = {
    accounts:[
        {
            "userId": 1,
            "name": "Betty",
            "email": "Betty@gmail.com",
            "role": "idea_owner",
            "profile_picture": "https://media.istockphoto.com/id/1399788030/photo/portrait-of-young-confident-indian-woman-pose-on-background.jpg?s=612x612&w=0&k=20&c=aQw5YhGl99hL1O77thwpQTmqVE7bc8rCX9H0gTeoX_k="
        },
        {
            "userId": 2,
            "name": "Merbebt",
            "email": "Merbi@gmail.com",
            "role": "investor",
            "profile_picture": "https://media.istockphoto.com/id/1318482009/photo/young-woman-ready-for-job-business-concept.jpg?s=612x612&w=0&k=20&c=Jc1NcoUMoM78AxPTh9EApaPU2kXh2evb499JgW99b0g="
        },
    ]}

    //create context

export const AccountContext = createContext(initialState);

//provider component

export const AccountProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //actions
    const addAccount = (account) =>{
        dispatch({
            type: 'ADD_ACCOUNT',
            payload: account,
        })
    }

    const editAccount = (account) =>{
        dispatch({
            type: 'EDIT_ACCOUNT',
            payload: account,
        })
    }

    return (
        <AccountContext.Provider value={{
            accounts: state.accounts,
            addAccount,
            editAccount
        }}>
        {children}
        </AccountContext.Provider>
    )
}