import { useEffect, useState } from "react";
import "./styles/styles.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import Menu from "./components/Menu";
import { FaCheckCircle } from "react-icons/fa";
import TodoSettings from "./components/TodoSettings";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  const [lists, setLists] = useState(() => {
    const localListValue = localStorage.getItem("LISTS");
    if (localListValue == null) return [];

    return JSON.parse(localListValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("LISTS", JSON.stringify(lists));
  }, [lists]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function emptyList() {
    setTodos([])
  }

  //TODO: addList function working, consist of
  //object with id, title of list, array of todos.
  function addList(title) {
    setLists((currentLists) => {
      const newList= {
        id: crypto.randomUUID(),
        title,
        todos: todos,
      };

      saveList(title, todos)

      return [...currentLists, newList]
      
      // [
      //   ...currentLists,
      //   { id: crypto.randomUUID(), title, todos: currentTodos },
      // ];
    });

  }

  function saveList(listName, todos){
    console.log(listName)
    console.log("Name of list from save:", listName)
    console.log(todos)

    const newList = localStorage.setItem(listName, JSON.stringify(todos));

    return newList
  }

  return (
    <>
      <div className="title">
        <FaCheckCircle />
        <h1>My todos</h1>
      </div>
      <Menu />
      <NewTodoForm onSubmit={addTodo} />
      {todos.length !== 0 && <h1 className="newlist">New List:</h1>}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <TodoSettings todos={todos} emptyList={emptyList} saveList={saveList} onSubmit={addList}/>
      {/* {console.log(saveList)} */}
    </>
  );
}
