import {Text, StyleSheet, View, Alert, ScrollView, Button} from 'react-native';
import React, {Component} from 'react';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';
import Moment from 'moment';
import {Dimensions, Image} from 'react-native';
import {SliderNews} from '../../../../components';
import {Feed1} from '../../../../assets';
import {SafeAreaView} from 'react-native';

export default class DetailLogbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: {},
      user: {},
    };
  }

  componentDidMount() {
    this.ambilDataApi();
    this.ambilDataUserLogin();
  }

  ambilDataApi = () => {
    axios
      .get(
        `https://api-dev.smartedu5p.com/api/v1/logbooks/${this.props.route.params.id}`,
      )
      .then(result => {
        const data = result.data.data;
        this.setState({kontak: data.logbook});
      })
      .catch(error => {
        console.error(`Error : ${error.response?.data.message}`);
      });
  };

  ambilDataUserLogin = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: 'https://api-dev.smartedu5p.com/api/v1/users/me',
      });
      const user = result.data.data.user;
      this.setState({user});
    } catch (error) {}
  };

  validateLogbook = async () => {
    try {
      await axios({
        method: 'PATCH',
        url: `https://api-dev.smartedu5p.com/api/v1/logbooks/${this.state.kontak._id}/validate`,
      });
      Alert.alert('Sukses', 'Berhasil memvalidasi logbook');
      this.ambilDataApi();
    } catch (error) {
      Alert.alert('Gagal', 'Gagal memvalidasi logbook. Silahkan coba lagi');
    }
  };

  render() {
    const {kontak, user} = this.state;
    return (
      <ScrollView>
        <View style={styles.page}>
          <Text style={styles.judul}>Tanggal Pelaksanaan :</Text>
          <Text style={styles.text}>
            {Moment(kontak.date).format('DD MMMM YYYY')}
          </Text>

          <Text style={styles.judul}>Aktivitas :</Text>
          <Text style={styles.text}>{kontak.activity}</Text>

          <Text style={styles.judul}>Waktu Kegiatan (menit) :</Text>
          <Text style={styles.text}>{kontak.time}</Text>

          <Text style={styles.judul}>Validasi :</Text>
          <Text style={styles.text}>
            {kontak.valid ? 'Valid' : 'Belum tervalidasi'}
          </Text>

          <Text style={styles.judul}>Berkas :</Text>
          <View
            style={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flexGrow: 1,
            }}>
            {kontak.supportFile?.map(image => {
              return (
                <Image
                  key={image}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  source={{
                    uri: `https://api-dev.smartedu5p.com/img/projects/logbooks/${image}`,
                  }}></Image>
              );
            })}
          </View>
          {user.role === 'guru' ? (
            <View style={{marginTop: 5}}>
              <Button title="validasi" onPress={this.validateLogbook}></Button>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  Image: {
    width: windowWidth * 1,
    height: windowHeight * 0.47,
    marginTop: 20,
    resizeMode: 'center',
  },
  judul: {
    fontFamily: 'TitillumWeb-Regular',
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
});
