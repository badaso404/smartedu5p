import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faEdit,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';

const limitCharacter = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + '...';
  }
};

const CardProject1 = ({id, kontakItems, navigation, removeData, user}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('DetailLogBook', {id: kontakItems._id});
      }}>
      <View>
        <Text style={styles.project} numberOfLines={1}>
          {limitCharacter(kontakItems.activity, 20)}
        </Text>
        <Text style={styles.kelompok}>Waktu : {kontakItems.time} menit</Text>
        <Text style={styles.tanggal}>
          Pelaksanaan : {Moment(kontakItems.date).format('DD MMMM YYYY')}
        </Text>
      </View>
      <View style={styles.icon}>
        {kontakItems.valid ? (
          <FontAwesomeIcon
            style={{marginHorizontal: 4}}
            icon={faCheckCircle}
            color="#00c217"
            size={25}
          />
        ) : null}
        {user.role === 'siswa' ? (
          <Pressable
            onPress={() =>
              navigation.navigate('EditLogbook', {id: kontakItems._id})
            }>
            <FontAwesomeIcon icon={faEdit} color="#03a9f4" size={25} />
          </Pressable>
        ) : null}
        {user.role === 'siswa' ? (
          <Pressable onPress={() => removeData(kontakItems._id)}>
            <FontAwesomeIcon icon={faTimes} color="#FB0000" size={30} />
          </Pressable>
        ) : null}
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
    flex: 1,
    flexDirection: 'row',
  },
});
