import React from 'react';
import {StatusBar, View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const VisioScreen = ({navigation}) => {
  const { colors } = useTheme();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={{color: colors.text}}>Page Visio</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default VisioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});