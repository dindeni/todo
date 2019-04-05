import React, {useContext, useState, useEffect} from 'react';
import {TableBody, TableCell, TableRow,IconButton, Menu, MenuItem, withStyles, Fab, Icon} from "@material-ui/core";
import {MoreVert, Edit, Delete} from "@material-ui/icons";

import {Context} from "./todo";



const styles = {
    divImportance:{
        display: 'flex'
    },
    tableSell: {
        height: '30px'
    }

};


const mainTableContent = (props)=>{

    const IndexContext = React.createContext(openIndex);

    const {stateValue, dispatchValue} = useContext(Context);
    const {stateEdit, dispatchEdit} = useContext(Context);
    const {stateIndex, dispatchIndex} = useContext(Context);


    const [openMenu, setOpenMenu] = useState(false);
    const [openIndex, setOpenIndex] = useState('');
    const [hover, setHover] = useState(false);
    const [indexImpotance, setIndexImportance] = useState(0);


    const options = [
        'Срочная важная задача',
        'Срочная неважная задача',
        'Не срочная важная задача',
        'Не срочная неважная задача'
    ];

    const handlerClose = (evt, option)=>{
        setOpenMenu(false);
        dispatchValue({type: 'importance', index: indexImpotance, option });
    };

    const handlerOpen = (evt, index)=>{
        setOpenMenu(true);

    };

    const deleteTask = (evt)=>{
        dispatchValue({type: 'delete', index: openIndex})
    };

    const editTask = ()=>{
        dispatchIndex({type: 'index', index: openIndex});
        dispatchEdit({type: 'edit'});
    };

    const buttonsHover =
        <div style={{width: '100%'}}>
            <Fab color="secondary" style={{width:'23px',height: '23px', marginRight: '10px'}}>
                <Edit style={{width: '15px', height: '15px'}} onClick={editTask}/>
            </Fab>
            <Fab aria-label="Delete" style={{minHeight: 0,
                width:'28px',height: '28px'}} onClick={deleteTask}>
                <Delete />
            </Fab>
        </div>;

    const showButtons = hover ? buttonsHover : null;

    const table = stateValue.map((value, index)=>{
        return (
            <TableRow key={index} onMouseEnter={()=>setOpenIndex(index)}>
                <TableCell>{index}</TableCell>
                <TableCell>{value.status}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.description}</TableCell>
                <TableCell>{value.date}</TableCell>
                <TableCell style={{display: 'flex', alignItems: 'center'}}>
                    {value.radioValue}
                <div className={props.classes.divImportance} onClick={()=>setIndexImportance(index)}>
                    <IconButton className={props.classes.fab}
                        aria-label="More"
                        aria-haspopup="true"
                        onClick={(evt)=>handlerOpen(evt, index)}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        open={openMenu} >
                        {options.map(option => (
                            <MenuItem key={option} onClick={(evt)=>handlerClose(evt, option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                </TableCell>
                <TableCell>{value.tag}</TableCell>
                <TableCell onMouseOver={()=>setHover(true)}
                    style={{minWidth: '80px'}} onMouseLeave={()=>setHover(false)}
                           >
                    {showButtons}
                </TableCell>
            </TableRow>
        )
    });

    return(
            <TableBody>
                {table}
            </TableBody>

    );
};

export default withStyles(styles)(mainTableContent);