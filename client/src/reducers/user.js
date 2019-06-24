const userInitialState= {}
const userReducer= (state= userInitialState, action)=> {
    switch(action.type){
        case 'SET_USER' :
            return {...action.payload, ...{status:"true"}}
        case 'UPDATE_USER':
            return {...state, ...action.payload}
        case 'REMOVE_USER':
            return{ status: "false"}
        default:
            return {...state}
    }

}

export default userReducer
