import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

const CardProject = ({id, kontakItem, navigation, removeData, user}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailProject', {id: kontakItem.id})}>
      <View>
        <Text style={styles.project}>{kontakItem.name}</Text>
        <Text style={styles.kelompok}>Topik : {kontakItem.topic}</Text>
        <Text style={styles.tanggal}>Deskripsi : {kontakItem.description}</Text>
      </View>
      <View style={styles.icon}>
        {user.role === 'siswa' ? (
          <Pressable
            onPress={() =>
              navigation.navigate('EditProject', {id: kontakItem.id})
            }>
            <FontAwesomeIcon icon={faEdit} color="#03a9f4" size={25} />
          </Pressable>
        ) : null}
        {user.role === 'siswa' ? (
          <Pressable onPress={() => removeData(id)}>
            <FontAwesomeIcon icon={faTimes} color="#FB0000" size={30} />
          </Pressable>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CardProject;

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
    flex: 1,
    flexDirection: 'row',
  },
});
