import { View, Text, Switch, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import CButton from "../../components/CButton";
import CInput from "../../components/CInput";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { onDeleteTodo, onUpdateTodo } from '../../redux/actionCreators/todoActions';
import type { ITodo, IUser } from "../../types/appTypes";

export default function TodoDetailScreen({ route, navigation }: { route: { params: { todo: ITodo } }, navigation: any }) {

  const { todo }: { todo: ITodo } = route.params;

  const [editable, setEditable] = useState(false);
  const [title, setTitle]: [title: string, setTitle: Function] = useState(todo.title);
  const [description, setDescription]: [description: string, setDescription: Function] = useState(todo.description);

  const [isCompleted, setIsCompleted]: [isCompleted: Boolean, setIsCompleted: Function] = useState(todo.isCompleted);


  const dispatch = useAppDispatch();
  const { _id, loading }: IUser = useAppSelector(
    (state: RootState) => state.auth
  );


  const onPressDelete = async () => {
    const newTodo: ITodo = {
      _id: todo._id,
      title: title,
      description:
        description, userId: _id as unknown as string,
      isCompleted: isCompleted
    };
    await dispatch(onDeleteTodo(newTodo));
    setTitle("");
    setDescription("");
    !loading && navigation.navigate("Todos");

  }

  const onPressUpdate = async () => {
    const newTodo: ITodo = {
      _id: todo._id,
      title: title,
      description: description,
      userId: _id as unknown as string,
      isCompleted: isCompleted
    };
    await dispatch(onUpdateTodo(newTodo));
    !loading && navigation.navigate("Todos");

  }



  return (
    <View>
      <CInput editable={editable} value={title} label={"Title"} onChange={(text: string) => { setTitle(text) }} />
      <CInput editable={editable} value={description} height={100} label={"Description"} onChange={(text: string) => { setDescription(text) }} multiline={true} />
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", margin: 7 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 21 }} >
          Completed
        </Text>
        <Switch
          disabled={!editable}
          onValueChange={(value: boolean) => { setIsCompleted(value) }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          value={Boolean(isCompleted)}
        />
      </View>
      {editable ?
        (loading ? <ActivityIndicator color="#0000ff" size="large" /> :
          <CButton title="Save" onPress={async () => { await onPressUpdate() }} />) :
        <CButton title="Edit" onPress={() => { setEditable(true) }} />}
      {editable ?
        <CButton title="Cancel" color={"tomato"} onPress={() => { setEditable(false) }} /> :
        (!loading ? <CButton title="Delete" color={"red"} onPress={async () => { await onPressDelete() }} /> :
          <ActivityIndicator color="#0000ff" size="large" />)}
    </View>
  )
}