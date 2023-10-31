import {View, Text, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

const CardTeam = ({id, label, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.icon}>
      </View>
    </TouchableOpacity>
  );
};

export default CardTeam;

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
  label: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 20,
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
