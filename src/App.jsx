import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos");

    if(todosString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    } 
  }, []);
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]);
    setTodo("");
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let todo = todos.filter(item => item.id == id);
    setTodo(todo[0].todo);

    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(items => items.id != id);
    setTodos(newTodos);
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }
  

  return (
    <>
    <Navbar/>
      <div className={"md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]"}>
      <h1 className={'font-bold text-3xl text-center'}>iTask - Manage your todos at one place</h1>
        <div className={"addTodo my-5 flex flex-col gap-4"}>
          <h2 className={'text-2xl font-bold'}>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className={'bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'}>Save</button>
          </div>
        </div>
        <input type="checkbox" id='show' onChange={toggleFinished} checked={showFinished} className='mx-4' />
        <label htmlFor="Show" className='mx-2'>Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 mx-auto w-[90%] my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item=>{

            return  ( (showFinished || !item.isCompleted) &&
              <div key={item.id} className={"todo flex md:w-1/2 justify-between my-3"}>
                <div className="flex gap-5">
                  <input type="checkbox" checked={item.isCompleted} name={item.id} id="" onChange={handleCheckbox} />
                  <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                </div>
                
                <div className="buttons flex h-full">
                  <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                </div>
              </div>
            )

          })}
        </div>
      </div>
    </>
  )
}

export default App
