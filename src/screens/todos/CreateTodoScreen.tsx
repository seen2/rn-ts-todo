import { View, Text, ActivityIndicator } from 'react-native';
import { useState } from "react";

import CButton from "../../components/CButton";
import CInput from "../../components/CInput";
import Logo from "../../components/Logo";


import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { onCreateTodo } from '../../redux/actionCreators/todoActions';
import type { ITodo, IUser } from "../../types/appTypes";

export default function CreateTodoScreen() {

  const [title, setTitle]: [title: string, setTitle: Function] = useState("");
  const [description, setDescription]: [description: string, setDescription: Function] = useState("");

  const dispatch = useAppDispatch();
  const { _id, loading }: IUser = useAppSelector(
    (state: RootState) => state.auth
  );

  const onPressSave = async () => {

    const newTodo: ITodo = {
      title: title,
      description:
        description, userId: _id as unknown as string,
      isCompleted: false
    };
    await dispatch(onCreateTodo(newTodo));
    setTitle("");
    setDescription("");

  }




  return (
    <View>
      <Logo />
      <CInput
        placeholder={"Enter Task Name"}
        label={"Title"}
        value={title}
        onChange={(text: string) => setTitle(text)}
      />
      <CInput
        placeholder={"Enter Task Description"}
        height={100}
        multiline={true}
        label={"Description"}
        onChange={(text: string) => { setDescription(text) }}
        value={description} />
      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <CButton disabled={Boolean(!(title && description))} title={"Save"} onPress={() => { onPressSave() }} />)}
    </View>
  )
}