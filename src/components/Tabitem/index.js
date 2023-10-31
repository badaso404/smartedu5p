import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Iconakun,
  IconakunActive,
  Iconhome,
  IconhomeActive,
  Iconpesanan,
  IconpesananActive,
  Iconsave,
  IconsaveActive,
  Iconaccount,
  IconaccountActive,
  Icondashboard,
  IcondashboardActive
} from '../../assets';
import {WARNA_UTAMA, WARNA_DISABLE} from '../../Utils/constant';

const Tabitem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home')
      return isFocused ? <IcondashboardActive /> : <Icondashboard/>;
    if (label === 'HomeT')
      return isFocused ? <IcondashboardActive /> : <Icondashboard/>;
    if (label === 'Profile')
      return isFocused ? <IconaccountActive /> : <Iconaccount />;
    if (label === 'Save') 
      return isFocused ? <IconsaveActive /> : <Iconsave />;
    return <IcondashboardActive />;
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Tabitem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    fontSize: 13,
    color: isFocused ? '#9232DE' : WARNA_DISABLE,
    marginTop: 8,
  }),
});
