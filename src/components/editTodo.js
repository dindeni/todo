import React, {useContext, useState} from 'react';
import {
    Drawer, withStyles, TextField, RadioGroup, FormControlLabel, Radio,
    FormControl, InputLabel, Select, Button, Fab, CircularProgress} from "@material-ui/core";
import SelectReact from 'react-select';
import {List, Description, DateRange, Done, AddAlert, Check, Save} from '@material-ui/icons';

import {Context} from "./todo";

const styles = {
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
    }
};

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

    const {stateEdit, dispatchEdit} = useContext(Context);
    const {stateValue, dispatchValue} = useContext(Context);
    const {stateIndex, dispatchIndex} = useContext(Context);

    const [radioButtonsState, setRadioButtonsState] = useState(false);
    const [date, setDate]=useState(stateValue[stateIndex].date);
    const [errorInput, setErrorInput] = useState(false);
    const [name, setName] = useState(stateValue[stateIndex].name);
    const [description, setDescription] = useState(stateValue[stateIndex].description);
    const [radioValue, setRadioValue] = useState(stateValue[stateIndex].radioValue);
    const [status, setStatus] = useState(stateValue[stateIndex].status);
    const [tag, setTag] = useState(stateValue[stateIndex].tag);
    const [progressState, setProgressState] = useState({loading: false, success: false, show:false});


    const getDate = ()=>{
        return stateValue[stateIndex].date
    };

    let radioButtons = null;
    if (stateValue[stateIndex].radioValue){
        radioButtons = <RadioGroup row={true}
                                   className={props.classes.formGroup}
                                   onChange={(evt)=>setRadioValue(evt.target.value)}
        value={stateValue[stateIndex].radioValue}>
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

    const changeDate = (evt)=>{
        setDate(evt.target.value);
        setRadioButtonsState(true);
    };

    const saveData = ()=>{
        let result = {name, description, date, radioValue, status, tag};
            dispatchValue({type: 'saveEditedData', index: stateIndex, name: result.name, description: result.description,
                date: result.date, radioValue: result.radioValue, status: result.status,
                tag: result.tag});

        setProgressState({show: true, loading: true, success: false});

        setTimeout(() => {
            setProgressState({
                loading: false,
                success: true,
                show: false
            });
            dispatchEdit({type: 'false'})
        }, 2000);
    };

    const selectedValue = ()=>{
            return options.filter((option)=>{
                return option.value === stateValue[stateIndex].tag
            })
    };


    const progress = progressState.show ? <div className={props.classes.progressWrapper}>
        <Fab color="primary">
            {progressState.success ? <Check /> : <Save />}
        </Fab>
        {progressState.loading && <CircularProgress size={68} className={props.classes.fabProgress} />}
    </div> : null;

    return(
        <Drawer open={true} classes={{paper: props.classes.paper}}>
            <form className={props.classes.form}>
                <div className={props.classes.divInput}>
                    <List className={props.classes.svgIcon} style={{marginTop: '10px'}}/>
                    <TextField label='Название' type='text'
                               className={props.classes.input}
                               onChange={(evt)=>setName(evt.target.value)}
                               error={errorInput} required={true}
                               helperText={errorInput ? 'Обязательное поле' :
                                   ''} defaultValue={stateValue[stateIndex].name}>

                    </TextField>
                </div>
                <div className={props.classes.divInput}>
                    <Description className={props.classes.svgIcon}/>
                    <TextField label='Описание задачи' type='text'
                               className={props.classes.input}
                               multiline={true} onChange={(evt)=>setDescription(evt.target.value)}
                               defaultValue={stateValue[stateIndex].description}>
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
                            onChange={(evt)=>setStatus(evt.target.value)}
                            defaultValue={stateValue[stateIndex].status}>
                            <option value={'Выполняется'}>Выполняется</option>
                            <option value={'На потом'}>На потом</option>
                            <option value={'Выполнена'}>Выполнена</option>
                        </Select>
                    </FormControl>
                </div >
                <div className={props.classes.divInput} style={{alignItems: 'start'}}>
                    <AddAlert className={props.classes.svgIcon} style={{marginTop: '15px'}}/>
                    <SelectReact options={options}
                                 value={selectedValue()}
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
                        onClick={()=>dispatchEdit({type: 'editFalse'})}
                >
                    Отмена
                </Button>
            </div>
            {progress}
        </Drawer>
    )
};

export default withStyles(styles)(sidePanel);