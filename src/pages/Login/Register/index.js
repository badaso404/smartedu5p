import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SignInHeader from '../../../components/SignInHeader';
import LinearGradient from 'react-native-linear-gradient';
import SearchableDropDown from 'react-native-searchable-dropdown';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Username, setUsername] = useState('');
  const [Sekolah, setSekolah] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ulangiPassword, setUlangiPassword] = useState('');

  // Dropdown sekolah
  const [openData, setOpenData] = useState(false);
  const [selectedSekolah, setSelectedSekolah] = useState({});
  const [npsnSelectedSekolah, setNpsnSelectedSekolah] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [sekolahNotFound, setSekolahNotFound] = useState(false);

  // Dropdown role
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [items, setItems] = useState([
    {label: 'Guru', value: 'guru'},
    {label: 'Siswa', value: 'siswa'},
  ]);

  const BASE_URL = 'https://api-sekolah-indonesia.vercel.app';
  const fetchData = async text => {
    axios
      .get(`${BASE_URL}/sekolah/s?perPage=20&sekolah=${text}`)
      .then(result => {
        const data = result.data.dataSekolah;
        const items = data.map(data => {
          return {
            label: data.sekolah,
            value: data.sekolah,
            npsn: data.npsn,
          };
        });
        setFullData(items);
        setSekolahNotFound(false);
      })
      .catch(error => {
        setSekolahNotFound(true);
      });
  };

  const postSignUp = () => {
    if (!firstname) return Alert.alert('Fail', 'Silahkan isi nama depanmu');
    if (!lastname) return Alert.alert('Fail', 'Silahkan isi nama belakangmu');
    if (!Username) return Alert.alert('Fail', 'Silahkan isi username mu ');
    if (!npsnSelectedSekolah)
      return Alert.alert('Fail', 'Pilih asal sekolahmu');
    if (!email) return Alert.alert('Fail', 'Silahkan isi emailmu');
    if (!role) return Alert.alert('Fail', 'Silahkan pilih rolemu');
    if (!password) return Alert.alert('Fail', 'Silahkan isi password');
    if (!ulangiPassword)
      return Alert.alert('Fail', 'Silahkan isi ulangi password');
    const newUser = {
      firstName: firstname,
      lastName: lastname,
      username: Username,
      schoolNPSN: npsnSelectedSekolah,
      email: email,
      role: role,
      password: password,
      passwordConfirm: ulangiPassword,
    };

    axios
      .post('https://api-dev.smartedu5p.com/api/v1/users/signup', newUser)
      .then(result => {
        const data = result.data;
        Alert.alert(
          'Berhasil',
          'Sukses membuat akun. Silahkan login terlebih dahulu',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Signin');
              },
            },
          ],
        );
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.message);
      });
  };

  const textSekolahNotFound = () => {
    return sekolahNotFound ? (
      <Text>
        {'Sekolah tidak ditemukan!. Silahkan coba dengan nama yang benar'}
      </Text>
    ) : null;
  };

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
      <SignInHeader
        title="Daftar Akun"
        description={'Selamat datang dihalaman Daftar Akun'}
      />
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
        onChangeText={text => setLastname(text)}
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

      {textSekolahNotFound()}
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <DropDownPicker
          placeholder="Pilih Sekolah"
          listMode="MODAL"
          zIndex={5001}
          open={openData}
          value={selectedSekolah}
          items={fullData}
          setOpen={setOpenData}
          setValue={setSelectedSekolah}
          onSelectItem={item => {
            setNpsnSelectedSekolah(item.npsn);
          }}
          setItems={setFullData}
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            marginTop: 20,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          dropDownContainerStyle={{
            borderColor: '#c4c4c4',
            marginTop: 21,
            borderRadius: 10,
          }}
          textStyle={{
            color: '#575757',
          }}
          searchable={true}
          searchPlaceholder="Cari nama sekolah"
          onChangeSearchText={text => {
            fetchData(text);
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <DropDownPicker
          placeholder="Pilih Role"
          open={open}
          value={role}
          items={items}
          setOpen={setOpen}
          setValue={setRole}
          setItems={setItems}
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            marginTop: 20,
            borderRadius: 9,
            elevation: 2,
            paddingLeft: 10,
          }}
          dropDownContainerStyle={{
            borderColor: '#c4c4c4',
            marginTop: 21,
            borderRadius: 10,
          }}
          textStyle={{
            color: '#575757',
          }}
        />
      </View>

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
        onPress={async () => {
          postSignUp();
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
            Buat
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 5, marginRight: 20}}
        onPress={() => navigation.navigate('Signin')}>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', color: '#FB0000'}}>
          Sudah Punya akun?{' '}
          <Text style={{color: '#03a9f4'}}> Login Disini</Text>
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
  },
});
