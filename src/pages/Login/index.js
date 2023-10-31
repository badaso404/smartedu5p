import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Logo from '../../assets/Images/Logo.png'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation ()
  return (
    <View style={styles.container} >
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.text}>
        <Text style={styles.text1}>SmartEdu-P5</Text>
        <Text style={styles.text2}>hai guys, Selamat Datang </Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress = {() => navigation.navigate ('Signin')}>
        <LinearGradient 
        start={{ x:0.0 , y:0.0 }}
        end={{ x:1.0 , y:0.0 }}
        colors={[ '#009FFF', '#ec2F4B']} 
        style={styles.login}>
          <Text style={{fontSize:17, fontWeight:'bold',color:'white' }}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => navigation.navigate ('Daftar')}>
        <LinearGradient 
        start={{ x:1.0 , y:0.0 }}
        end={{ x:0.0 , y:0.0 }}
        colors={[ '#009FFF', '#ec2F4B']} 
        style={styles.daftar}>
          <Text style={{fontSize:17, fontWeight:'bold',color:'white'}}>Daftar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f6fd',
  },

  logo: {
    width: windowWidth * 1,
    position: 'absolute',
    
  },
  text: {
    color: 'white',
    paddingTop:430,
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
    flexDirection: 'row',
    paddingTop:30,
  },

  login :{
    alignItems : 'center',
    justifyContent: 'center',
    width:130,
    height:40,
    marginLeft :20,
    marginRight : 15,
    borderRadius: 7,

  },
  daftar :{
    alignItems : 'center',
    justifyContent: 'center',
    width:130,
    height:40,
    marginRight : 20,
    marginLeft :15,
    borderRadius: 7,

  },
});
