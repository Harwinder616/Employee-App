
const initstate={
    data:[],
    loading:true
}

  const Reducers=(state=initstate,action)=>{

    if(action.type==='ADD_DATA')
    {
        return {
            ...state,
            data:action.payload

        }

    }
    else if(action.type==='SET_LOADING')
    {
        return {
            ...state,
            loading:action.payload

        }
    }

    return state



}

export default Reducers