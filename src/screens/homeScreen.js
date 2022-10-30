import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../context/authContext';

const HomeScreen = ({navigation}) => {
  const allFeaturesList = [
    {key: 'orderMidicines', name: 'Order Medicines'},
    {key: 'labTest', name: 'Lab Test'},
    {key: 'bookDoctor', name: 'Book a Doctor'},
  ];

  const [activeTransactions, setActiveTransactions] = useState([]);

  const {getActiveTransactions} = useContext(AuthContext);

  const handleGetActiveTransactions = async () => {
    const response = await getActiveTransactions();
    console.log('response in homeScreen ', response);
    setActiveTransactions(response.transaction);
  };

  useEffect(() => {
    handleGetActiveTransactions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parentContainer}>
        <View style={styles.childContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderMedicines')}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                fontWeight: '500',
                color: '#e28743',
                textAlign: 'center',
              }}>{`${allFeaturesList[0].name}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.childContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('labTest')}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                fontWeight: '500',
                color: '#e28743',
                textAlign: 'center',
              }}>{`${allFeaturesList[1].name}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.childContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('bookDoctor')}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                fontWeight: '500',
                color: '#e28743',
                textAlign: 'center',
              }}>{`${allFeaturesList[2].name}`}</Text>
          </TouchableOpacity>
        </View>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../assets/medical-image.jpg')}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 22,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '500',
              color: '#9e0059',
              marginBottom: 30,
            }}>
            {!activeTransactions.length
              ? 'No  Active Transactions'
              : 'Active transactions'}
          </Text>

          <FlatList
            keyExtractor={transaction => transaction._id}
            data={activeTransactions}
            renderItem={({item, index}) => {
              return (
                <View style={styles.medicineMainContainer}>
                  {Object.keys(item.medicinesDetails).map(key => {
                    return (
                      <View
                        key={item.medicinesDetails[key]._id}
                        style={styles.medicinePriceAndAddRemoveContainer}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 22,
                            fontWeight: '500',
                            color: '#9e0059',
                            marginBottom: 30,
                          }}>{`${item.medicinesDetails[key].medicineName} - ${
                          item.medicinesDetails[key].medicinePrice
                        } * ${item.medicinesDetails[key].medicineCount} = ${
                          item.medicinesDetails[key].medicinePrice *
                          item.medicinesDetails[key].medicineCount
                        }`}</Text>
                      </View>
                    );
                  })}
                  <View style={styles.medicinePriceAndAddRemoveContainer}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 22,
                        fontWeight: '500',
                        color: '#9e0059',
                        marginBottom: 30,
                      }}>{`Total Price: ${item.totalAmount}`}</Text>
                  </View>
                </View>
              );
            }}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  medicineMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});
