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
          }}>{`ππππ πππππ ππππππππππππ`}</Text>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 22,
            fontWeight: '500',
            color: '#fcbf49',
            textAlign: 'center',
          }}>{`ππ¦ πΈπͺπ­π­ πΆπ±π₯π’π΅π¦ πΊπ°πΆ π΄π°π°π―.`}</Text>
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
