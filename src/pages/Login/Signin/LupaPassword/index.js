import React, {useState, useEffect} from 'react';

import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import SignInHeader from '../../../../components/SignInHeader';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const LupaPassword = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
      <SignInHeader
        title="Lupa Password"
        description={
          'masukkan email anda untuk mendapatkan \n tutorial cara reset password'
        }
      />

      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={{
          marginHorizontal: 30,
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Email Anda"
      />

      
        <TouchableOpacity
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#009FFF', '#ec2F4B']}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 350,
          height: 40,
          borderRadius: 7,
        }}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Lupa Password
          </Text>
          </LinearGradient>
        </TouchableOpacity>
      

      <TouchableOpacity
        style={{marginTop: 20, marginRight: 20}}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={{textAlign: 'center', fontWeight: 'bold',color: '#FF4848'}}>
        Sudah Punya akun? <Text style={{color: '#03a9f4'}}> Login Disini</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LupaPassword;
