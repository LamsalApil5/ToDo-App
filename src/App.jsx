import { useEffect, useState } from "react";
import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';


function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storeTodo = localStorage.getItem("todos");
    if (storeTodo) {
      setTodos(JSON.parse(storeTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };

  const save = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const currentDate = new Date().toLocaleDateString();
      const newTodo = {text: inputValue, date:currentDate}
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  const handleDelete = (index) => {
    const updateedTodos = [...todos];
    updateedTodos.splice(index, 1);
    setTodos(updateedTodos);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <div>
        <h1>TODO APP</h1>
        <form onSubmit={save}>
          <input
            type="text"
            placeholder="Add Todo"
            value={inputValue}
            onChange={inputChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      
      <table style={{ display: 'inline-block', marginLeft: '10px' }}>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
              <td>
                <DeleteIcon onClick={() => handleDelete(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default App;
