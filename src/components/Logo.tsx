import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type LogoProps = {
  onPress?: Function;
  disabled?: boolean;
}



export default function Logo(props: LogoProps) {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      disabled={props.disabled || false}
      style={styles.logo} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => { !props.disabled && navigation.navigate("Home") }}>
      <Text style={styles.title} >CRUD Todo app</Text>
    </TouchableHighlight>

  );
}


const styles = StyleSheet.create({

  logo: {
    backgroundColor: "#e67a0e",
    padding: 7,
    margin: 3,
    borderRadius: 7,
    height:40,
    justifyContent: "center"
  },
  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

})