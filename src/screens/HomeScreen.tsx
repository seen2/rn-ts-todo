import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Ionicons from '@expo/vector-icons/Ionicons';



import CButton from "../components/CButton";
import Logo from "../components/Logo";
import CCard from "../components/CCard"

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View>
      <CButton onPress={() => { navigation.navigate("Login") }} title="Login" />
      <Text style={{ color: "grey", fontSize: 18, textAlign: "center", }} > {"Don't have account?"} </Text>
      <CButton onPress={() => { navigation.navigate("Register") }} title="Register" />
      <CCard >
        <Text style={{ color: colors.text, textAlign: "center", fontSize: 21 }} >
          In This App
          {"\n You can Create your own account.\nYou can Create and Manage your personal Tasks.\n You can Delete and Uodate your personal Tasks. \n Note: All your data will stored in the cloud.\n You can access it from anywhere anytime."}
        </Text>
      </CCard>
      <Logo disabled={true} />
      <View style={{ alignItems: "center", margin: 7 }} >
        <Text style={{ color: colors.text, fontSize: 21, fontWeight: "bold" }} >Web App</Text>
        <Ionicons name="bookmark" color={colors.primary} size={30} onPress={() => { Linking.openURL("https://next-ts-todo.vercel.app/") }} />
      </View>
      <View style={{ alignItems: "center", margin: 7 }} >
        <Text style={{ color: "grey", fontSize: 21, fontWeight: "bold" }} >Source code </Text>
        <Ionicons name="logo-react" color={colors.primary} size={30} onPress={() => { Linking.openURL("https://snack.expo.dev/@shintu/rn-ts-todo") }} />
      </View>
    </View>
  )
}