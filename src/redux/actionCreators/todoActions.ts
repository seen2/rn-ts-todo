import type { ITodo } from '../../types/appTypes';
import { setLoading, setMsg, setStatusCode } from '../reducers/authReducers';
import { addTodo, deleteTodo, getTodos, initialState, updateTodo } from '../reducers/todoReducer';
import { AppDispatch, store } from '../store';
import * as SecureStore from 'expo-secure-store';

import AppConstants from "../../AppConstants";

export const onCreateTodo = (newTodo: ITodo) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      //make network request to add
      if (await SecureStore.getItemAsync("userAuthToken") && currentUser._id) {
        const res = await fetch(`${AppConstants.URI}/api/todos`, {
          method: "POST",
          body: JSON.stringify({
            ...newTodo
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + await SecureStore.getItemAsync("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(addTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }

export const onDeleteTodo = (newTodo: ITodo) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      const todoItem = { todoId: newTodo._id, title: newTodo.title, description: newTodo.description, isCompleted: newTodo.isCompleted }
      //make network request to add
      if (await SecureStore.getItemAsync("userAuthToken") && currentUser._id) {
        const res = await fetch(`${AppConstants.URI}/api/todos`, {
          method: "DELETE",
          body: JSON.stringify({
            ...todoItem
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + await SecureStore.getItemAsync("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(deleteTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }


export const onUpdateTodo = (newTodo: ITodo) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      const todoItem = { todoId: newTodo._id, title: newTodo.title, description: newTodo.description, isCompleted: newTodo.isCompleted }
      //make network request to add
      if (await SecureStore.getItemAsync("userAuthToken") && currentUser._id) {
        const res = await fetch(`${AppConstants.URI}/api/todos`, {
          method: "PUT",
          body: JSON.stringify({
            ...todoItem
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + await SecureStore.getItemAsync("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(updateTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }


export const onGetTodos = () =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      //make network request to add
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      if (await SecureStore.getItemAsync("userAuthToken") && currentUser._id) {
        const res = await fetch(`${AppConstants.URI}/api/todos`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + await SecureStore.getItemAsync("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          const { result } = await res.json() || [];
          dispatch(getTodos(result));
          dispatch(setLoading(false));
        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Fetch"));
          dispatch(getTodos([]));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }

      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }
