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

const OrderMedicinesScreen = ({navigation}) => {
  const [allMedicines, setAllMedicines] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isTransactionViewOpen, setIsTransactionViewOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    getMedicinesList,
    medicinesList,
    setMedicinesList,
    setSelectedMedicinesContext,
    setTotalAmountContext,
    fullName,
    getTransactions,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    getAllMedicines(searchKeyword);
    getSomeTransactions();
  }, []);

  useEffect(() => {
    setAllMedicines(medicinesList);
  }, [medicinesList]);

  const getAllMedicines = async value => {
    const response = await getMedicinesList(value);

    if (response && response.success) {
      // setAllMedicines(response.medicines);
    }
  };

  const getSomeTransactions = async () => {
    const response = await getTransactions();
    console.log('Last three transactions ', response);
    setAllTransactions(response.transaction);
  };

  const handleSearchMedicines = async value => {
    try {
      // AsyncStorage.clear();
      setSearchKeyword(value);
      await getAllMedicines(value);
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

  const handleLogout = async () => {
    await logout();
  };

  const handleAddMedicineCount = (item, index) => {
    const updatedMedicine = medicinesList;
    updatedMedicine[index].medicineCount = updatedMedicine[index].medicineCount
      ? ++updatedMedicine[index].medicineCount
      : 1;

    setMedicinesList([...updatedMedicine]);

    const updatedSelectedMedicines = selectedMedicines;
    updatedSelectedMedicines[item.medicineName] = updatedMedicine[index];
    setSelectedMedicines({...updatedSelectedMedicines});

    handleTotalAmount(updatedSelectedMedicines);
    // selectedMedicines
    // [{
    //  "Dolo": {medicineDetails}, medicineCount: 2
    //  "Paracetamol": {medicineDetails}, medicineCount: 2
    //}]
    // const medicineData = setSelectedMedicines();
  };

  const handleRemoveMedicineCount = (item, index) => {
    const updatedSelectedMedicines = selectedMedicines;
    const updatedMedicine = medicinesList;
    if (!updatedMedicine[index].medicineCount) {
      // If medicineCount is already 0 then no functionality on - button onPress event
      return;
      // toast message or alert and return
    }

    updatedMedicine[index].medicineCount = updatedMedicine[index].medicineCount
      ? --updatedMedicine[index].medicineCount
      : 0;

    setMedicinesList([...updatedMedicine]);

    if (
      !updatedMedicine[index].medicineCount &&
      updatedSelectedMedicines[item.medicineName]
    ) {
      delete updatedSelectedMedicines[item.medicineName];
      setSelectedMedicines({...updatedSelectedMedicines});

      handleTotalAmount(updatedSelectedMedicines);
      return;
    }

    updatedSelectedMedicines[item.medicineName] = updatedMedicine[index];
    setSelectedMedicines({...updatedSelectedMedicines});

    handleTotalAmount(updatedSelectedMedicines);

    // [{
    //  "Dolo": {medicineDetails}, medicineCount: 2
    //}]
    // const medicineData = setSelectedMedicines();
  };

  const handleCartOnPressEvent = () => {
    // selectedMedicines totalAmount will be added to contextAPI
    console.log('selectedMedicines new order', selectedMedicines);
    setSelectedMedicinesContext({...selectedMedicines});
    setTotalAmountContext(totalAmount);
    navigation.navigate('Cart');
  };

  const handleRepeatSelectedOrder = item => {
    // selectedMedicines totalAmount will be added to contextAPI
    console.log('item.medicineDetails repeated order', item.medicinesDetails);
    setSelectedMedicinesContext({...item.medicinesDetails});
    setTotalAmountContext(item.totalAmount);
    navigation.navigate('Cart');
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
            {`Welcome @${fullName}`}
          </Text>

          <TouchableOpacity onPress={handleLogout}>
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
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              fontWeight: '500',
              marginBottom: 10,
            }}
            onPress={() => {
              setIsTransactionViewOpen(!isTransactionViewOpen);
            }}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              {' '}
              {isTransactionViewOpen
                ? 'View all medicines'
                : 'View Last 3 Orders'}
            </Text>
          </TouchableOpacity>
        </View>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../assets/medical-image.jpg')}>
          {isTransactionViewOpen && (
            <FlatList
              keyExtractor={transaction => transaction._id}
              data={allTransactions}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.medicineMainContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        handleRepeatSelectedOrder(item);
                      }}>
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
                              }}>{`${
                              item.medicinesDetails[key].medicineName
                            } - ${item.medicinesDetails[key].medicinePrice} * ${
                              item.medicinesDetails[key].medicineCount
                            } = ${
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
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}

          {!isTransactionViewOpen && (
            <>
              <InputField
                style={{backgroundColor: '#fff'}}
                label={'Search medicines...'}
                keyboardType="searchMedicines"
                handleOnChange={value => {
                  handleSearchMedicines(value);
                }}
                text={searchKeyword}
              />
              <FlatList
                keyExtractor={medicine => medicine.medicineName}
                data={allMedicines}
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
                        }}>{`Medicine name: ${item.medicineName}`}</Text>
                      <View style={styles.medicinePriceAndAddRemoveContainer}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 22,
                            fontWeight: '500',
                            color: '#9e0059',
                            marginBottom: 30,
                          }}>{`Price: ${item.medicinePrice}`}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleRemoveMedicineCount(item, index);
                          }}>
                          <Text style={styles.buttonContainer}>{`-`}</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>
                          {item.medicineCount ? item.medicineCount : 0}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleAddMedicineCount(item, index);
                          }}>
                          <Text style={styles.buttonContainer}>{`+`}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          )}
        </ImageBackground>

        <View style={styles.totalItemsContainer}>
          <Text style={styles.totalItemsContainerButtonContainer}>Total</Text>
          <Text style={styles.totalItemsContainerButtonContainer}>
            {totalAmount}
          </Text>
          <TouchableOpacity onPress={handleCartOnPressEvent}>
            <Text
              style={
                (styles.totalItemsContainerButtonContainer,
                styles.verticalBorder)
              }>
              Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderMedicinesScreen;

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
