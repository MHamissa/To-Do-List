import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDoItem from './ToDoItem';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
 let todos=[
    {
      id:uuidv4(),
      title:'First Task',
      details:'First Task Details',
      isCompelete:false
    }
     
  ]
 

export default function ToDoList() {
 
 
  const [todoItems,setToDoItems]=useState(todos);
  const [textValue,setTextValue]=useState('');
  
  function enterTask(e){
   setTextValue(e.target.value);
    }
  function addTaskButton(){
    const newToDo={
      id:uuidv4(),
      title:textValue,
      details:'',
      isCompelete:false
    }
   setToDoItems([...todoItems,newToDo]);
   console.log(todoItems);
  localStorage.setItem('todos',JSON.stringify(todoItems));

  }
  
  
  
  function handleCheckClick(todoId){
   const updatedTodos=todoItems.map((t)=>{
    if (todoId==t.id){
   t.isCompelete =!t.isCompelete;
   
    }
    return t
    }
    
   )
   setToDoItems(updatedTodos);
   localStorage.setItem('todos',JSON.stringify(updatedTodos));

  }
  function deleteTask(todoId){
    const newAfterDelete=todoItems.filter((t)=>{
      if(t.id==todoId){
        return false
      }else{
        return true
      }
    })
   setToDoItems(newAfterDelete);
   localStorage.setItem('todos',JSON.stringify(newAfterDelete));

  }
   const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todoItems.filter((t) => {
    return t.isCompelete;
  });

  const notCompletedTodos = todoItems.filter((t) => {
    return !t.isCompelete;
  });

  let todosToBeRendered = todoItems;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todoItems;
  }
  function displayTaskType(e){
   setDisplayedTodosType(e.target.value);

  }

useEffect(()=>{
    const todoItemsStorage=JSON.parse(localStorage.getItem('todos'));
  setToDoItems(todoItemsStorage);
  },[]);
    const todoMaterials= todosToBeRendered.map((t)=>{
    return(<ToDoItem key={t.id} todoItem={t} 
      handleCheck={handleCheckClick} 
      handleDelete={deleteTask}
      setToDoItems={setToDoItems} todoItems={todoItems}
      
      />)});
     

 

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


const card = (
  <React.Fragment>
  <ThemeProvider theme={theme}>
    <CardContent >
      
      <Typography variant="h5" component="div" style={{fontSize:'30pt',marginBottom:'30px'}}>
        My Tasks
        
      </Typography>
       <ToggleButtonGroup
      color="primary"
      value={displayedTodosType}
      exclusive
      onChange={displayTaskType}
      aria-label="Platform"
      style={{marginBottom:'30px'}}
    >
      <ToggleButton value='all' >All</ToggleButton>
      <ToggleButton value='completed'  >Complete</ToggleButton>
      <ToggleButton value='non-completed' >Incomplete</ToggleButton>
    </ToggleButtonGroup>
     <Stack spacing={2} direction="row" 
     style={{
          marginBottom:'20px',
          display:'flex',
          justifyContent:'center'
     }}
     >
          <TextField id="filled-basic" label="Enter Task Title to Add" variant="filled"
          value={textValue}
          onChange={enterTask} />

      <Button variant="contained" onClick= {addTaskButton}>Add Task</Button>
    </Stack>
      {todoMaterials}
    </CardContent>
    </ThemeProvider>
  </React.Fragment>
);

 
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        
       <Box sx={{ minWidth: 275 }}>
        
      <Card variant="outlined">
        
        {card}
        
      </Card>
    </Box>
      </Container>
    </>
  )};

