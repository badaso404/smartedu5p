import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Team from '../../../assets/Images/Team.png'
import {Header1} from '../../../assets/'

const navigation = useNavigation ()

export default class AddPeople extends Component {
  render() {
    return (
    <View style={styles.container} >
      <ImageBackground source={Header1} style={styles.header1}>
        <View style={styles.header}>
          <Text style={styles.title}>TEAM</Text>
          <View style={styles.garis}/>
        </View>
        </ImageBackground>
      <Image source={Team} style={styles.logo} resizeMode="contain" />
      <View style={styles.text}>
        <Text style={styles.text1}>SmartEdu-P5</Text>
        <Text style={styles.text2}>hai guys, Selamat Datang </Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress = {() => navigation.navigate ('Search')}>
        <LinearGradient 
        start={{ x:0.0 , y:0.0 }}
        end={{ x:1.0 , y:0.0 }}
        colors={[ '#009FFF', '#ec2F4B']} 
        style={styles.login}>
          <Text style={{fontSize:17, fontWeight:'bold',color:'white' }}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
        </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f6fd',
      },
    
      logo: {
        width: windowWidth * 0.7,
        position: 'absolute',
        height : windowHeight* 0.75
        
      },
      text: {
        color: 'white',
        paddingTop:320
      },
      text1 :{
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 20,
      },
      text2 :{
        paddingTop:5,
        fontSize:15,
      },
      
      button :{
        paddingTop:10,
      },
    
      login :{
        alignItems : 'center',
        justifyContent: 'center',
        width:130,
        height:40,
        borderRadius: 7,
    
      },
      header1: {
        width: windowWidth * 1.01,
        height: windowHeight * 0.115,
        marginBottom: 20
      },
      header: {
        paddingHorizontal:30,
        paddingTop:15
      },
      title: {
        fontSize:25,
        fontWeight: 'bold',
        color: 'white'
      },
      garis:{
        borderWidth: 2,
        marginTop: 15,
        borderColor: 'white'
      }
})