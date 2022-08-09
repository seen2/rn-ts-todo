import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from "react-native";
import { useTheme } from '@react-navigation/native';

import { AppTabNavigatorParamList } from "../types/navigationTypes";
import TodoStack from "./TodoStack";
import UserDetailsScreen from "../screens/auth/UserDetailScreen";
import CreateTodoScreen from "../screens/todos/CreateTodoScreen";


const TabNavigator = createBottomTabNavigator<AppTabNavigatorParamList>();

export default function AppTab() {
  const { colors } = useTheme();

  return (
    <TabNavigator.Navigator  >
      <TabNavigator.Screen
        options={{
          unmountOnBlur: true, headerShown: false,
          
          tabBarIcon: ({ focused, color }: { focused: boolean, color: string }) => (<View>
            <Ionicons name="home" size={27} color={focused ? colors.primary : "#cfc1b0"} />
          </View>),
        }}
        name="Home" component={TodoStack}

      />
      <TabNavigator.Screen options={{

        tabBarIcon: ({ focused, color }: { focused: boolean, color: string }) => (<View>
          <Ionicons name="add-circle" size={27} color={focused ? colors.primary : "#cfc1b0"} />
        </View>),
        

      }}
        name="Create" component={CreateTodoScreen} />
      <TabNavigator.Screen
        options={{

          tabBarIcon: ({ focused, color }: { focused: boolean, color: string }) => (<View>
            <Ionicons name="person" size={27} color={focused ? colors.primary : "#cfc1b0"} />
          </View>),
        }}
        name="UserInfo" component={UserDetailsScreen} />
    </TabNavigator.Navigator>
  )
}