import {View, Text, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

const CardProject1 = ({id, kontakItems, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailLogBook', {id: id})}>
      <View>
        <Text style={styles.project}>{kontakItems.berkas}</Text>
        <Text style={styles.kelompok}>Waktu : {kontakItems.waktu}</Text>
        <Text style={styles.tanggal}>Pelaksanaan : {kontakItems.pelaksanaan}</Text>
      </View>
      <View style={styles.icon}>
      <Pressable onPress={() => navigation.navigate('EditLogbook', {id: id})}>
        <FontAwesomeIcon icon={faEdit} color="#03a9f4" size={25} />
        </Pressable>
        <Pressable onPress={() => removeData(id)}>
        <FontAwesomeIcon icon={faTimes} color="#FB0000" size={30} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default CardProject1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  project: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 18,
  },
  kelompok: {
    fontFamily: 'TitilliumWeb-Regular',
  },
  tanggal: {
    fontFamily: 'TitilliumWeb-regular',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex:1,
    flexDirection: 'row'
  },
});
