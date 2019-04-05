export const reducerFormValue = (state, action)=>{
    switch (action.type){
        case 'add':
            return [...state, {name: action.name, description: action.description, date: action.date,
                radioValue: action.radioValue, status: action.status, tag: action.tag}];
        case 'importance':
            return state.map((value, index)=>{
                if (index === action.index){
                    value.radioValue = action.option;
                    console.log(action.option, index);
                    return value
                } else return value
            });
        case 'delete':
            return state.filter((value, index)=>{
                if (index !== action.index){
                    return value
                }
            });
        case 'edit':
            return false;
        case 'saveEditedData':
            return state.map((value, index)=>{
                if (index === action.index){
                    return {name: action.name, description: action.description, date: action.date,
                        radioValue: action.radioValue, status: action.status, tag: action.tag}
                }else return value
            })
    }
};

export const reducerEdit =(state, action)=>{
    switch (action.type) {
        case 'edit':
            return true;
        case 'editFalse':
            return false;
    }
};

export const reducerIndex = (state, action)=>{
    switch (action.type) {
        case 'index':
            return action.index
    }
};

