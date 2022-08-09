import { View, Text, TouchableHighlight, StyleSheet, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ButtonProps = {
  onPress: Function;
  title: string;
  disabled?: boolean;
  color?: string;
}


export default function CButton(props: ButtonProps) {

  const { colors } = useTheme();


  return (
    <TouchableHighlight
      disabled={props.disabled || false}
      style={{ ...styles.button, backgroundColor: props.disabled ? "grey" : props.color || colors.primary }} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => {
        Keyboard.dismiss();
        props.onPress();
      }}>
      <Text style={styles.title} >{props.title}</Text>
    </TouchableHighlight>

  );
}


const styles = StyleSheet.create({

  button: {
    backgroundColor: "#3ba3ed",
    height: 45,
    padding: 7,
    margin: 7,
    borderRadius: 7
  },
  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

});