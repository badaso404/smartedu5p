import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Iconsaldo,
  Iconpoint,
  IconProject,
  IconLogbook,
  IconPublic,
  IconGroup,
  IconAdd,
  IconUpload,
  IconProfile,
  IconSearch,
  IconSearch1,
  IconValidasiP,
  IconValidasiL,
  IconSearch2,
} from '../../assets';
import {WARNA_UTAMA} from '../../Utils/constant';
import {useNavigation} from '@react-navigation/native';

const ButtonIcon = ({title, type, onPress}) => {
  const Icon = () => {
    if (title === 'add saldo') return <Iconsaldo />;
    if (title === 'get point') return <Iconpoint />;
    if (title === 'Project') return <IconProject onPress={onPress} />;
    if (title === 'Logbook') return <IconLogbook onPress={onPress} />;
    if (title === 'Public') return <IconPublic onPress={onPress} />;
    if (title === 'Group') return <IconGroup onPress={onPress} />;
    if (title === 'Add People') return <IconAdd onPress={onPress} />;
    if (title === 'Upload') return <IconUpload onPress={onPress} />;
    if (title === '') return <IconProfile onPress={onPress} />;
    if (title === 'Validasi')
      return <IconValidasiP onPress={onPress} />;
    if (title === 'Log-book')
      return <IconValidasiL onPress={onPress} />;
    if (title === 'Search') return <IconSearch2 onPress={onPress} />;
    return <IconSearch onPress={onPress} />;
  };
  return (
    <TouchableOpacity style={styles.container(type)}>
      <View style={styles.icon(type)}>
        <Icon />
      </View>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: type => ({
    marginBottom: 15,
    marginRight: type === 'layanan' ? 30 : 0,
  }),

  icon: type => ({
    padding: type === 'layanan' ? 1 : 5,
    borderRadius: 10,
  }),
  text: type => ({
    fontSize: type === 'layanan' ? 17 : 10,
    fontFamily:
      type === 'layanan' ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
    textAlign: 'center',
    marginTop: 2,
  }),
});
