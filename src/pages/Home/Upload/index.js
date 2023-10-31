import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LinearGradient from 'react-native-linear-gradient';


export default class Upload extends Component {
  render() {
    return (
      <View style={styles.page}>
      <View style={styles.layer}>
      <TouchableOpacity >
      <FontAwesomeIcon icon={faUpload} color='#03a9f4' size={100} style={{ marginVertical:300 }} />
      </TouchableOpacity>
      </View>
      <View style={{position:'absolute', paddingTop:410, paddingLeft:153 }}>
      <Text style={{ padding:20, fontFamily:"TitilliumWeb-Black", fontSize:20, color:'#03a9f4' }}>Upload</Text>
      </View>
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page:{
    flex:1,
  },
  layer:{
    backgroundColor:'#fff',
    alignItems:'center',
    marginVertical: 20,
    borderColor:'#F7F4F4',
    borderRadius:20,
    marginHorizontal:20,
    shadowColor: "#000",
shadowOffset: {
	width: 10,
	height: 10,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 8,
  }
})