import { View, Text } from 'react-native';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TodoStackNavigatorParamList} from "../types/navigationTypes";
import Logo from "../components/Logo";


import TodosScreen from "../screens/todos/TodosScreen";
import TodoDetailScreen from "../screens/todos/TodoDetailScreen";

const TodoStackNavigator=createNativeStackNavigator<TodoStackNavigatorParamList>();

export default function TodoStack() {
  return (
    <TodoStackNavigator.Navigator >
      <TodoStackNavigator.Screen name="Todos" component={TodosScreen} />
      <TodoStackNavigator.Screen name="TodoDetails" component={TodoDetailScreen} />
    </TodoStackNavigator.Navigator>
  )
}