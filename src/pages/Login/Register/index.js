import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SignInHeader from '../../../components/SignInHeader';
import LinearGradient from 'react-native-linear-gradient';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Username, setUsername] = useState('');
  const [Sekolah, setSekolah] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ulangiPassword, setUlangiPassword] = useState('');

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
    <SignInHeader
        title="Daftar Akun"
        description={
          'Selamat datang dihalaman Daftar Akun'
        }/>

      <TextInput
        value={firstname}
        keyboardType="email-address"
        onChangeText={text => setFirstname(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="First Name"
      />
      <TextInput
        value={lastname}
        keyboardType="email-address"
        onChangeText={text => setLastname (text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Last Name"
      />
      <TextInput
        value={Username}
        keyboardType="email-address"
        onChangeText={text => setUsername(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Username"
      />
      <TextInput
        value={Sekolah}
        keyboardType="email-address"
        onChangeText={text => setSekolah(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Asal Sekolah Kamu "
      />
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Email Kamu"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 40,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Password Kamu"
        secureTextEntry={true}
      />
      <TextInput
        value={ulangiPassword}
        onChangeText={text => setUlangiPassword(text)}
        style={{
          marginHorizontal: 20,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 9,
          elevation: 2,
          paddingLeft: 10,
        }}
        placeholder="Masukkan Ulang Password kamu"
        secureTextEntry={true}
      />


<TouchableOpacity
      onPress={() => navigation.navigate('MainApp')}
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
            Buat
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 5, marginRight: 20}}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={{textAlign: 'center', fontWeight: 'bold',color: '#FB0000'}}>
          Sudah Punya akun? <Text style={{color: '#03a9f4'}}> Login Disini</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 380,
    height: 40,
    borderRadius: 7,
    marginTop: -40,
  }
})
