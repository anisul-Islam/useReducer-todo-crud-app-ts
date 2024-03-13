import { AppStateType, Todo } from './types';

type AppActionType =
  | { type: 'ADD_TODO'; todo: Todo }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'UPDATE_TODO'; selectedTodoId: string; todoTitle: string };

export const reducer = (state: AppStateType, action: AppActionType) => {
  let filterTodos, todosUpdateData;
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.todo],
        isModalOpen: true,
        modalText: 'new todo is added',
      };

    case 'DELETE_TODO':
      filterTodos = state.todos.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todos: filterTodos,
        isModalOpen: true,
        modalText: 'todo is deleted',
      };

    case 'UPDATE_TODO':
      todosUpdateData = state.todos.map((todo) => {
        if (todo.id === action.selectedTodoId) {
          return { ...todo, title: action.todoTitle };
        }
        return todo;
      });

      return {
        ...state,
        todos: todosUpdateData,
        isModalOpen: true,
        modalText: 'todo is updated',
      };

    default:
      return state;
  }
};
