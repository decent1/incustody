import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../utils/Fonts'
import { Colors } from '../utils/Colors'

const AuthHeading = ({title,style}) => {
  return (
    <Text
      style={{
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.black,
        ...style,
        
      }}>
      {title}
    </Text>
  );
}

export default AuthHeading

const styles = StyleSheet.create({});