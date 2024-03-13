export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type AppStateType = {
  todos: Todo[];
  isModalOpen: boolean;
  modalText: string;
};
