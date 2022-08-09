import { View, Text,StyleSheet } from 'react-native'
import React from 'react';
import { useTheme } from '@react-navigation/native';

type Cardprops={
  children:JSX.Element
}

export default function CCard(props:Cardprops) {
  const { colors } = useTheme();
  return (
    <View style={{...styles.main,backgroundColor:colors.card}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({

  main: {
    backgroundColor: "rgb(50, 50, 69)",
    padding: 7,
    margin: 7,
    borderRadius: 7,
    flexDirection: "row",
    flexWrap: "wrap",
  },

})

