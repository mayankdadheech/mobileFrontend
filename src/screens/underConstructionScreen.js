import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const UnderConstructionScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parentContainer}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#fcbf49',
            textAlign: 'center',
            paddingBottom: 10,
          }}>{`𝘗𝘈𝘎𝘌 𝘜𝘕𝘋𝘌𝘙 𝘊𝘖𝘕𝘚𝘛𝘙𝘜𝘊𝘛𝘐𝘖𝘕`}</Text>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 22,
            fontWeight: '500',
            color: '#fcbf49',
            textAlign: 'center',
          }}>{`𝘞𝘦 𝘸𝘪𝘭𝘭 𝘶𝘱𝘥𝘢𝘵𝘦 𝘺𝘰𝘶 𝘴𝘰𝘰𝘯.`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default UnderConstructionScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#063970',
  },
  childContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#abdbe3',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    cursor: 'pointer',
  },
});
