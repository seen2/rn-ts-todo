import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../types/appTypes';

export const initialState: ITodo = {
  _id: "",
  userId: "",
  title: "",
  description: "",
  isCompleted: false
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [initialState],

  reducers: {
    addTodo: (state: ITodo[], action: PayloadAction<ITodo>) => ([...state, { ...action.payload }]),
    deleteTodo: (state: ITodo[], action: PayloadAction<ITodo>) => ([...state.filter(todo => todo._id != action.payload._id)]),

    updateTodo: (state: ITodo[], action: PayloadAction<ITodo>) => {
      state = (state.filter(todo => todo._id != action.payload._id));

      return ([...state, { ...action.payload }]);

    },
    getTodos: (state: ITodo[], action: PayloadAction<ITodo[] | []>) => ([...action.payload])

  }

})

export const { addTodo, deleteTodo, updateTodo, getTodos } = todoSlice.actions;
export default todoSlice.reducer;