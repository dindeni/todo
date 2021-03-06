import React, {useContext, useState} from 'react';
import {
    AppBar, Drawer, Typography, withStyles,
    TextField, RadioGroup, FormControlLabel, Radio,
    FormControl, InputLabel, Select, Button, Fab, CircularProgress, Snackbar} from "@material-ui/core";
import SelectReact from 'react-select';
import {List, Description, DateRange, Done, AddAlert, Check, Save} from '@material-ui/icons';

import {Context} from "./todo";

const styles = theme => ({
    paper: {
        width: '40%',
        padding: '40px 0 60px 0',
        position: 'relative',
        height: '60%'
    },
    appBar: {
        width: '40%',
        left: '0'
    },
    h2:{
        padding: '10px'
    },
    form:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5px'
    },
    input: {
        width: '50%',
        paddingBottom: '10px'
    },
    formGroup:{
        flexDirection: 'column'
    },
    formControl: {
        width: '50%'
    },
    button: {
        width: '40%',

    },
    divButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        left: '0',
        width: '40%',
        top: '62%',
        paddingBottom: '20px'
    },
    divInput: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgIcon:{
        width: '30px',
        /*marginTop: '5px'*/
    },
    fabProgress: {
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    progressWrapper: {
        position: 'absolute',
        top: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: '0',
        right: '0',
        width: '20%',
        marginTop: 'auto',
        marginBottom: 'auto',
        bottom: '0',
        height: '20%',
    },
    snackbar: {
        position: 'absolute',
        bottom: '0'
    },
});

const options = [
    { value: 'тег0', label: 'тег0'},
    { value: 'тег1', label: 'тег1'},
    { value: 'тег2', label: 'тег2'},
    { value: 'тег3', label: 'тег3'}
];

const selectStyles = {
    container: (styles)=>{
        return {
            ...styles,
            width: '50%',
            padding: '10px 0 10px 0',
            height: '50px',
            marginBottom: '90px'
        }
    }
};

const sidePanel = (props)=>{

    const [radioButtonsState, setRadioButtonsState] = useState(false);
    const [date, setDate]=useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [errorInput, setErrorInput] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [radioValue, setRadioValue] = useState('');
    const [status, setStatus] = useState('');
    const [tag, setTag] = useState('');
    const [progressState, setProgressState] = useState({loading: false, success: false, show:false});

    const {state, dispatch} = useContext(Context);
    const {stateValue, dispatchValue} = useContext(Context);
    const [formValue, setFormValue] = useState({name: '', description: ''});
    const [stateSnackBar, setStateSnackBar] = useState(false);

    const getDate = ()=>{
        return new Date().toISOString().substr(0, 10)
    };

    let radioButtons = null;
    if (radioButtonsState){
        radioButtons = <RadioGroup row={true}
                                   className={props.classes.formGroup}
        onChange={(evt)=>setRadioValue(evt.target.value)}>
            <FormControlLabel value="Срочная важная задача"
                              control={<Radio />}
                              label="Срочная важная задача"  />
            <FormControlLabel value="Срочная неважная задача"
                              control={<Radio />}
                              label="Срочная неважная задача" />
            <FormControlLabel value="Не срочная важная задача"
                              control={<Radio />}
                              label="Не срочная важная задача" />
            <FormControlLabel value="Не срочная не важная задача"
                              control={<Radio />}
                              label="Не срочная не важная задача" />
        </RadioGroup>;
    }
   /* let name, description, radioValue, status, tag;*/

    const changeDate = (evt)=>{
        setDate(evt.target.value);
        setRadioButtonsState(true);
    };

    const saveData = ()=>{
        let result = {name, description, date, radioValue, status, tag};
        if (!result.name){
            setErrorInput(true)
        }else {
            setErrorInput(false);
            dispatchValue({type: 'add', name: result.name, description: result.description,
                date: result.date, radioValue: result.radioValue, status: result.status,
                tag: result.tag});
            /*dispatch({type: 'false'})*/

            setProgressState({show: true, loading: true, success: false});

            setTimeout(() => {
                setProgressState({
                    loading: false,
                    success: true,
                    show: false
                });
                dispatch({type: 'false'})
            }, 2000);
        }

    };

    const cancel = ()=>{
        if (stateSnackBar){
            setStateSnackBar(false);
            dispatch({type: 'false'})
        } else setStateSnackBar(true);
    };

    const snackBar =
        stateSnackBar ? <div>
            <Snackbar className={props.classes.snackbar}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={stateSnackBar}
                      close={()=>setStateSnackBar(false)}
            autoHideDuration={6000}
            message={"Данные не сохранены"}

        >
        </Snackbar>
    </div> : null;

    const progress = progressState.show ? <div className={props.classes.progressWrapper}>
        <Fab color="primary">
            {progressState.success ? <Check /> : <Save />}
        </Fab>
        {progressState.loading && <CircularProgress size={68} className={props.classes.fabProgress} />}
    </div> : null;

    return(
        <Drawer open={true} classes={{paper: props.classes.paper}}>
            <AppBar color="primary" className={props.classes.appBar}>
                    <Typography color="inherit" align='center'
                                variant='title' className={props.classes.h2}>
                        Новая задача
                    </Typography>
            </AppBar>
            <form className={props.classes.form}>
                <div className={props.classes.divInput}>
                    <List className={props.classes.svgIcon} style={{marginTop: '10px'}}/>
                    <TextField label='Название' type='text'
                               className={props.classes.input}
                               onChange={(evt)=>setName(evt.target.value)}
                    error={errorInput} required={true}
                               helperText={errorInput ? 'Обязательное поле' :
                               ''}>

                    </TextField>
                </div>
                <div className={props.classes.divInput}>
                    <Description className={props.classes.svgIcon}/>
                    <TextField label='Описание задачи' type='text'
                               className={props.classes.input}
                               multiline={true} onChange={(evt)=>setDescription(evt.target.value)}>
                    </TextField>
                </div>
                <div className={props.classes.divInput}>
                    <DateRange className={props.classes.svgIcon} style={{marginBottom:'10px'}}/>
                    <TextField   type="date"
                                 className={props.classes.input}
                                 defaultValue={getDate()}
                                 onChange={changeDate}>
                    </TextField>
                </div>

                {radioButtons}
                <div className={props.classes.divInput}>
                    <Done className={props.classes.svgIcon}/>
                    <FormControl className={props.classes.formControl}>
                        <InputLabel htmlFor="status-native-simple">Статус</InputLabel>
                        <Select
                            native
                            inputProps={{name: 'age', id: 'status-native-simple'}}
                            onChange={(evt)=>setStatus(evt.target.value)}>
                            <option value={'Выполняется'}>Выполняется</option>
                            <option value={'На потом'}>На потом</option>
                            <option value={'Выполнена'}>Выполнена</option>
                        </Select>
                    </FormControl>
                </div >
                <div className={props.classes.divInput} style={{alignItems: 'start'}}>
                    <AddAlert className={props.classes.svgIcon} style={{marginTop: '15px'}}/>
                    <SelectReact options={options}
                                 value={{selectedOption}}
                                 placeholder="Тег" onChange={(opt)=>setTag(opt.value)}
                                 styles={selectStyles}/>
                </div>

            </form>
            <div color="primary" className={props.classes.divButtons}>
                <Button size="medium" fullWidth={false} color='primary'
                         variant='outlined' className={props.classes.button}
                         onClick={saveData}>
                Сохранить
            </Button>
                <Button size="medium" fullWidth={false} color='secondary'
                        variant='outlined' className={props.classes.button}
                        onClick={cancel}
                >
                    Отмена
                </Button>
            </div>
            {progress}
            {snackBar}
        </Drawer>
    )
};

export default withStyles(styles)(sidePanel);