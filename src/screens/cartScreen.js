import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import InputField from '../components/inputField';
import {AuthContext} from '../context/authContext';

const CartScreen = ({navigation}) => {
  const [allMedicines, setAllMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const {selectedMedicinesContext, totalAmountContext, proceedToPayment} =
    useContext(AuthContext);

  useEffect(() => {
    console.log('selectedMedicinesContext ', selectedMedicinesContext);
    setAllMedicines(selectedMedicinesContext);
  }, [selectedMedicinesContext]);

  const handleSearchMedicines = async () => {
    try {
      // AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotalAmount = updatedSelectedMedicines => {
    let total = 0;
    Object.keys(updatedSelectedMedicines).map(key => {
      total +=
        updatedSelectedMedicines[key].medicineCount *
        updatedSelectedMedicines[key].medicinePrice;
    });
    setTotalAmount(total);
  };

  const handleProceedToPayOnPressEvent = async () => {
    const userEmail = await AsyncStorage.getItem('email');
    const params = {
      medicinesDetails: {...selectedMedicinesContext},
      totalAmount: totalAmountContext,
      userEmail: userEmail,
    };

    proceedToPayment(params);
    // hit payment and transaction details POST api call and display success message to user.
    // navigation.navigate('paymentPortal');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.parentContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#063970',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 18,
              fontWeight: '500',
              color: '#e28743',
              // margintop: 25,
              marginBottom: 30,
              marginTop: 20,
            }}>
            Welcome User
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
              fontWeight: '500',
              color: '#e28743',
              backgroundColor: '#fff',
              borderRadius: 15,
              padding: 5,
              marginBottom: 30,
              marginTop: 20,
            }}>
            Logout
          </Text>
        </View>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../assets/medical-image.jpg')}>
          <FlatList
            keyExtractor={medicine => allMedicines[medicine].medicineName}
            data={Object.keys(allMedicines)}
            renderItem={({item, index}) => {
              return (
                <View style={styles.medicineMainContainer}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 22,
                      fontWeight: '500',
                      color: '#9e0059',
                      marginBottom: 30,
                    }}>{`${allMedicines[item].medicineName}`}</Text>

                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 22,
                      fontWeight: '500',
                      color: '#9e0059',
                      marginBottom: 30,
                    }}>{`Quantity: ${allMedicines[item].medicineCount}`}</Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 22,
                      fontWeight: '500',
                      color: '#9e0059',
                      marginBottom: 30,
                    }}>{`Price: ${allMedicines[item].medicinePrice} * ${
                    allMedicines[item].medicineCount
                  } = ${
                    allMedicines[item].medicinePrice *
                    allMedicines[item].medicineCount
                  }`}</Text>
                </View>
              );
            }}
          />
        </ImageBackground>

        <View style={styles.totalItemsContainer}>
          <Text style={styles.totalItemsContainerButtonContainer}>Total</Text>
          <Text style={styles.totalItemsContainerButtonContainer}>
            {totalAmountContext}
          </Text>
          <TouchableOpacity onPress={handleProceedToPayOnPressEvent}>
            <Text
              style={
                (styles.totalItemsContainerButtonContainer,
                styles.verticalBorder)
              }>
              Proceed to Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

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
  medicinePriceAndAddRemoveContainer: {
    display: 'flex',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  counterText: {
    backgroundColor: '#fff',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    height: 35,
  },
  buttonContainer: {
    width: 25,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#9e0059',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#9e0059',
    textAlign: 'center',
    borderRadius: 5,
  },
  totalItemsContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginTop: 2,
  },
  totalItemsContainerButtonContainer: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#9e0059',
  },
  verticalBorder: {
    borderLeftWidth: 2,
    borderLeftColor: '#9e0059',
    paddingLeft: 60,
    color: '#9e0059',
  },
});
