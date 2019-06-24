import axios from 'axios'

export const setUser= (user)=> {
    return{
        type: 'SET_USER',
        payload: user
    } 
}
export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        payload: user
    }
}

export const removeUser= ()=>{
    return{
        type: 'REMOVE_USER'
    }
}

// export const startSetUser= (user)=> {
//     return(dispatch)=> {
//         axios.post('http://localhost:3005/login', user)
//             .then(response=> {
//                 const user = response.data
//                 dispatch(setUser(user))
//             })
//     }
// }

export const saveUserOnLoad = (token) => {
    return (dispatch) => {
        axios.get(`http://localhost:3005/token/${token}`)
            .then(res => {
                dispatch(setUser(res.data))
            })
            .catch(err => {
                dispatch(removeUser())
            })
    }
}