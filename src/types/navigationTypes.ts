import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import type{ITodo} from "./appTypes";


//stack
export type TodoStackNavigatorParamList = {
  Todos: undefined;
  TodoDetails:{todo:ITodo};
};

export type AuthStackNavigatorParamList = {
  Home:undefined;
  Login: undefined;
  Register:undefined;

};

export type TodoStackNavigatorProps = NativeStackScreenProps<TodoStackNavigatorParamList, 'Todos',"TodoDetails">;

export type AuthStackNavigatorProps = NativeStackScreenProps<AuthStackNavigatorParamList, 'Home',"Login","Register">;



// Tab
export type AppTabNavigatorParamList = {
  Home: NavigatorScreenParams<TodoStackNavigatorParamList>;
  Create: undefined;
  UserInfo: undefined;
};

