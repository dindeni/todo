import React, {Fragment,useReducer} from 'react';

import {
    AppBar, Typography, withStyles, Button, Table,
    TableHead, TableRow, TableCell} from "@material-ui/core";
import SidePanel from './sidePanel';
import MainTableContent from './mainTableContent';
import EditTodo from './editTodo';
import {reducerFormValue, reducerEdit, reducerIndex} from "./reducers/reducers";

export const Context = React.createContext(null);

const styles = {
    root: {
        padding: '10px'
    },
    button: {
        margin: '10px'
    }

};

const todo = (props)=>{

    const reducer = (state, action)=>{
        switch (action.type) {
            case 'true':
                return true;
            case 'false':
                return false;
            default: return
        }
    };

    const [state, dispatch] = useReducer(reducer, false);
    const [stateValue, dispatchValue] = useReducer(reducerFormValue, []);
    const [stateEdit, dispatchEdit] = useReducer(reducerEdit, false);
    const [stateIndex, dispatchIndex] = useReducer(reducerIndex, null);

    console.log(stateIndex);


    const addTask =  (evt)=>{
        dispatch({type: 'true'})
    };

    const panel = (state) ? <Context.Provider value={{
        state, dispatch, stateValue, dispatchValue}}>
        <SidePanel/></Context.Provider> : null;

        const todoEdit = stateEdit ? <Context.Provider value={{
            stateEdit, dispatchEdit, stateValue, dispatchValue,
        stateIndex, dispatchIndex}}>
            <EditTodo/></Context.Provider> : null;

        return(
        <Fragment>
            <AppBar className={props.classes.root} position="static" color="primary">
                <Typography color="inherit" align='center'
                            variant='title'>
                    Список задач
                </Typography>
            </AppBar>
            <Button size="medium" fullWidth={false} color='primary'
            variant='outlined' className={props.classes.button}
            onClick={addTask}>
                Добавить задачу
            </Button>
            {panel}
            {todoEdit}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            id
                        </TableCell>
                        <TableCell>
                            Статус
                        </TableCell>
                        <TableCell>
                            Название
                        </TableCell>
                        <TableCell>
                            Описание
                        </TableCell>
                        <TableCell>
                            Дата выполнения
                        </TableCell>
                        <TableCell>
                            Важность
                        </TableCell>
                        <TableCell>
                            Тег
                        </TableCell>
                        <TableCell>
                            Действие
                        </TableCell>
                    </TableRow>
                </TableHead>
                <Context.Provider value={{stateValue, dispatchValue,
                stateEdit, dispatchEdit, stateIndex, dispatchIndex}}>
                    <MainTableContent/>
                </Context.Provider>
            </Table>
        </Fragment>

    );

};

export default withStyles(styles)(todo);