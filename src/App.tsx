import React, { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { reducer } from './reducer';
import { AppStateType, Todo } from './types';

const initialState: AppStateType = {
  todos: [
    { id: '1', title: 'learn js', completed: true },
    { id: '2', title: 'learn ts', completed: true },
  ],
  isModalOpen: false,
  modalText: '',
};

const App = () => {
  // const [todos, setTodos] = useState(data);
  const [todosState, dispatch] = useReducer(reducer, initialState);

  const [isEdit, setIsEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState('');

  const handleTodoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };
  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', id: id });
  };
  const handleEditTodo = (id: string, title: string) => {
    setIsEdit(true);
    setTodoTitle(title);
    setSelectedTodoId(id);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isEdit) {
      dispatch({
        type: 'UPDATE_TODO',
        selectedTodoId: selectedTodoId,
        todoTitle: todoTitle,
      });
    } else {
      const newTodo = {
        id: Date.now().toString(),
        title: todoTitle,
        completed: false,
      };
      dispatch({ type: 'ADD_TODO', todo: newTodo });
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo title"
          value={todoTitle}
          onChange={handleTodoTitleChange}
        />
        <button className="btn">{isEdit ? 'Edit Todo' : 'Add Todo'}</button>
      </form>

      {todosState.isModalOpen && <p>{todosState.modalText}</p>}

      <h2>Listing All Todos</h2>
      <section className="todos">
        {todosState.todos &&
          todosState.todos.length > 0 &&
          todosState.todos.map((todo: Todo) => {
            return (
              <article key={todo.id} className="todo">
                <h3>{todo.id}</h3>
                <p>
                  {todo.completed && <span>&#10003;</span>} {todo.title}
                </p>

                <button
                  className="btn"
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    handleEditTodo(todo.id, todo.title);
                  }}
                >
                  Edit
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default App;
