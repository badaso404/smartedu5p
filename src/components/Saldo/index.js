import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {WARNA_UTAMA} from '../../Utils/constant';
import ButtonIcon from '../ButtonIcon';

const Saldo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.perent}>
        <View style={styles.saldo}>
          <Text style={styles.textSaldo}>Saldo :</Text>
          <Text style={styles.velueSaldo}>Rp.100.000</Text>
        </View>
        <View style={styles.saldo}>
          <Text style={styles.textPoint}>Antar Point :</Text>
          <Text style={styles.veluePoint}>100 points</Text>
        </View>
      </View>
      <View style={styles.buttonAksi}>
        <ButtonIcon title="add saldo"/>
        <ButtonIcon title="get point"/>
      </View>
    </View>
  );
};

export default Saldo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 17,
    marginHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#55CB95',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12.81,
    elevation: 16,
    marginTop: -windowHeight * 0.05,
    flexDirection: 'row',
  },
  perent: {
    width: '60%',
  },
  saldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  textSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-regular',
  },
  velueSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-bold',
  },
  textPoint: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-regular',
  },
  veluePoint: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Black',
    color: WARNA_UTAMA,
  },
  buttonAksi: {
    paddingLeft: 15,
    flexDirection: 'row',
    marginLeft: 10,
    width: '35%',
    justifyContent: 'space-between',
  },
});
