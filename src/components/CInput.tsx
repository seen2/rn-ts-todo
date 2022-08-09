import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

type InputProps = {
  label: string;
  onChange: (text:string)=>void;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
  height?: number
}

export default function CInput(props: InputProps) {
  return (
    <View style={styles.main} >
      <Text style={styles.title} >{props.label || "Title"}</Text>
      <TextInput
        multiline={props.multiline ? props.multiline : false}
        autoCapitalize={"none"}
        editable={!props.editable ? props.editable : true}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        value={props.value}
        placeholder={props.placeholder}
        style={{ ...styles.input, height: props.height || 50 }}
        onChangeText={(text: string) => props.onChange(text)} />
    </View>
  )
}

const styles = StyleSheet.create({

  input: {
    borderColor: "grey",
    height: 50,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
    placeholderTextColor: "grey"
  },
  title: {
    color: "#e69327",
    fontSize: 21
  },
  main: {
    margin: 7,
  }
})