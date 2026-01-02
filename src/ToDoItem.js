import * as React from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';


import './App.css';

export default function ToDoItem({todoItem,
  handleCheck,
  handleDelete,
  setToDoItems,
  todoItems,
  
}) {
    const [updatedToDo,setupdatedToDo]=React.useState({id:todoItem.id,title:'',details:'',isCompelete:todoItem.isCompelete});

 
function handleCheckClick(e){
  handleCheck (todoItem.id);
  console.log(todoItem.isCompelete);
}
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  function deleteDialog(){
    setOpen(true);
  }
  function confirmButton(){
    setOpen(false);
    handleDelete(todoItem.id);

  }
  function rejectButton(){
   setOpen(false)
  }
  function editButton(){
   setOpenEdit(true)
  }
 
  function editCancelButton(){
setOpenEdit(false);
  }
  function editTitle (e){
   
   setupdatedToDo({...updatedToDo,title:e.target.value});
  }
  
  

  function editDetails (e){
   
   setupdatedToDo({...updatedToDo,details:e.target.value});
   
  }
  
 function handleUpdateConfirm() {
    const updatedTodos = todoItems.map((t) => {
      if (t.id == todoItem.id) {
        return { ...t, title: updatedToDo.title, details: updatedToDo.details };
      } else {
        return t;
      }
    })
    setToDoItems(updatedTodos);
    setOpenEdit(false);
    localStorage.setItem('todos',JSON.stringify(todoItems));
  };

  return (
    <>
      <Dialog open={openEdit} >
        <DialogTitle>Edit Task Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Here You can add/Change details to your Task
          </DialogContentText>
          
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="details"
              label="Enter Task Title Here"
              type="email"
              fullWidth
              variant="standard"
              value={updatedToDo.title}
              onChange={editTitle}
            />
             <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="details"
              label="Enter Task Details Here"
              type="email"
              fullWidth
              variant="standard"
              value={updatedToDo.details}
              onChange={editDetails}
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={editCancelButton}>Cancel</Button>
          <Button  onClick={handleUpdateConfirm} >
          Add
          </Button>
        </DialogActions>
      </Dialog>
    
      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want to Remove This Task?<br/>
            Once You Delete it, You Can't Get It Back!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={rejectButton} >No,Don't Delete</Button>
          <Button  autoFocus onClick={confirmButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
   

    <Box sx={{ minWidth: 275 }}  >
      <Card style={{backgroundColor:'#301934'}} className='item' >
         <React.Fragment>
    <CardContent >
      <Grid container spacing={2}>
  <Grid size={8}>
          <Typography gutterBottom sx={{ color: 'white', fontSize: 25 ,float:'left'}}>
{todoItem.title}
</Typography> 
<br/>
<br/>
 <Typography gutterBottom sx={{ color: 'white', fontSize: 15 ,float:'left'}}>
{todoItem.details}
</Typography> 
  </Grid>
  <Grid size={4}>
     <Stack direction="row" spacing={1} >
      <IconButton aria-label="delete" style={{color:'#8B0000'

      }}
      onClick={deleteDialog}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton  enabled style={{
        color: todoItem.isCompelete ? 'white' : 'green'
      
        }} 
        onClick={handleCheckClick}>
        <CheckCircleIcon />
      </IconButton>
      <IconButton style={{color:'green'

      }}
      onClick={editButton}>
     <ModeEditOutlineIcon/>
     </IconButton>

      
    </Stack>
  </Grid>
</Grid>
               
    </CardContent>
  </React.Fragment>
      </Card>
    </Box></>
  );
};