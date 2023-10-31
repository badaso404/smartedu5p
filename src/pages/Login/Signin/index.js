import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../../assets/Images/Logo.png';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const postLogin = async function(){
    const {data} = await axios.post('https://api-dev.smartedu5p.com/api/v1/users/login', {
      email, password
    }) 
    return data.data;
  }
  return (
    <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <LinearTextGradient
        style={{fontFamily: 'TitilliumWeb-Bold', paddingTop:390, position: 'absolute', paddingLeft: 150, fontSize:16}}
        locations={[0, 1]}
        start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#009FFF', '#ec2F4B']}>
        <Text>
        Selamat Datang
        </Text>
      </LinearTextGradient>

      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={{
          marginHorizontal: 30,
          backgroundColor: '#FFFFFF',
          marginTop: 430,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Email Anda"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={{
          marginHorizontal: 30,
          backgroundColor: '#FFFFFF',
          marginTop: 15,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Password Anda"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{marginTop: 10, marginRight: 30}}
        onPress={() => navigation.navigate('LupaPassword')}>
        <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
          Lupa Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={async () => {
        const data = await postLogin();
        console.log(data)
        navigation.navigate('MainApp1')
        }}
        style={{
          marginTop: 40,
          paddingVertical: 15,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#009FFF', '#ec2F4B']}
          style={styles.login}>
          <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  logo: {
    width: windowWidth * 1,
    position: 'absolute',
    marginTop: -20,
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 40,
    borderRadius: 7,
    marginTop: -40,
  },
});
