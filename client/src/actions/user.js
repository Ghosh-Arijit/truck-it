//import axios from 'axios'

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

// export const startSetUser= (user)=> {
//     return(dispatch)=> {
//         axios.post('http://localhost:3005/login', user)
//             .then(response=> {
//                 const user = response.data
//                 dispatch(setUser(user))
//             })
//     }
// }