import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Header} from './../../assets';
import axios from 'axios';

const Profile = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api-dev.smartedu5p.com/api/v1/users/me').then((result)=> {
      setData(result.data.data.user);
    }).finally(() => setLoading(false))
  })


  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#212121" />
      <ImageBackground
        source={Header}
        style={{flex: 0.5}}
        resizeMode={'cover'}>
        <View style={{flex: 0.5}}></View>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop:40, marginTop:-150}}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: '#FFFFFF',
              position: 'absolute',
              zIndex: 2,
            }}
          />
        </View>
        <View style={{marginTop: 50}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: '#ffff',
            }}>
            {loading ? 'Loading...' : data.fullName}
          </Text>
          <Text style={{textAlign: 'center', color: '#ffff',}}>
            {loading ? 'Loading...' : data.role}
          </Text>
          <View style={{marginLeft: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                }}>
                <Icon name="mobile-alt" size={25} color="red" />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>{loading ? 'Loading...' : data.username}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                }}>
                <Icon name="map-marker-alt" size={25} color="red" />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>{loading ? 'Loading...' : data.school.sekolah + ", " + data.school.alamat_jalan}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                }}>
                <Icon name="envelope" size={25} color="red" />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>
                  {loading ? 'Loading...' : data.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
