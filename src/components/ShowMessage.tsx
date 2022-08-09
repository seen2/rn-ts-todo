import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

type ShowMessageProps = {
  statusCode?: number;
  message: string;
}

export default function ShowMessage(props: ShowMessageProps) {

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToggle(false);
    }, 3000);
  }, [toggle, setToggle]);

  return (
    toggle && props.message ? <View
      style={{ ...styles.main, backgroundColor: props.statusCode === 200 ? "green" : "red" }} >
      <Text style={styles.title} >{props.statusCode}: {props.message}</Text>
    </View> : null

  );
}

const styles = StyleSheet.create({

  main: {
    backgroundColor: "#e67a0e",
    padding: 7,
    margin: 3,
    borderRadius: 7,
    height: 40,
    justifyContent: "center"
  },
  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 16,
  },

})