import './App.css';
import ToDoList from './ToDoList';


function App() {
  const style={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'200%',
    backgroundColor:'#3d3d3dff'
    
    
  };
  return (
    <div className="App" style={style} >
      <ToDoList/>
    </div>
  );
}

export default App;
