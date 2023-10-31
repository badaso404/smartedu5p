import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, {Component} from 'react';
import {IconSearch1} from '../../assets';
import {useState} from 'react';

export default class Search extends Component {
  render() {
    return (
      <View style={styles.page}>
        <TextInput
          style={styles.search}
        />
        <TouchableOpacity style={styles.icon}>
          <IconSearch1 />
        </TouchableOpacity>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  search: {
    backgroundColor: 'white',
    paddingTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    paddingTop: 20,
    marginLeft:  windowWidth * 0.88
  },
});
