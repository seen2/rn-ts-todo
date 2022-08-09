import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Logo from "../../components/Logo";
import CButton from "../../components/CButton";
import CInput from "../../components/CInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

import { onLogout } from "../../redux/actionCreators/authActions";

import type { IUser, ITodo } from "../../types/appTypes";

export default function UserDetailsScreen() {

  const { email, name, _id }: IUser = useAppSelector((state: RootState) => state.auth)
  const todos: ITodo[] = useAppSelector((state: RootState) => state.todos)
  const dispatch = useAppDispatch();

  const onPressLogout = async () => {
    await dispatch(onLogout());

  }

  useEffect(() => {
  }, [todos])

  return (
    <View>

      <Logo />
      <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
        <CInput editable={false} onChange={() => { }} label={"Completed"} value={"" + (todos.filter(todo => todo.isCompleted).length)} />
        <CInput editable={false} onChange={() => { }} label={"Incomplete"} value={"" + (todos.length - todos.filter(todo => todo.isCompleted).length)} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons name={"person"} size={50} color={"white"} />
      </View>
      <CInput editable={false} onChange={() => { }} label={"Name"} value={name || ""} />
      <CInput editable={false} onChange={() => { }} label={"Email"} value={email || ""} />

      <CButton color={"red"} onPress={() => { onPressLogout() }} title={"Logout"} />
    </View>
  )
}