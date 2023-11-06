import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Header} from '../../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {InputData} from '../../../../components';
import {Alert} from 'react-native';
import FIREBASE from '../../../../config/FIREBASE';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default class EditLogbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pelaksanaan: '',
      aktivitas: '',
      waktu: '',
      berkas: '',
    };
  }

  componentDidMount() {
    // FIREBASE.database()
    //   .ref('LogBook/' + this.props.route.params.id)
    //   .once('value', querrySnapShot => {
    //     let data = querrySnapShot.val() ? querrySnapShot.val() : {};
    //     let kontakItems = {...data};

    //     this.setState({
    //       pelaksanaan: kontakItems.pelaksanaan,
    //       aktivitas: kontakItems.aktivitas,
    //       waktu: kontakItems.waktu,
    //       berkas: kontakItems.berkas,
    //     });
    //   });
    axios
      .get(
        `https://api-dev.smartedu5p.com/api/v1/logbooks/${this.props.route.params.id}`,
      )
      .then(result => {
        const data = result.data.data;
        this.setState({
          pelaksanaan: data.date,
          aktivitas: data.activity,
          waktu: data.time,
          berkas: data.supportFile,
        });
      });
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  onSubmit = () => {
    if (
      this.state.pelaksanaan &&
      this.state.aktivitas &&
      this.state.waktu
      // this.state.berkas
    ) {
      // const kontakLogbook = FIREBASE.database().ref(
      //   'LogBook/' + this.props.route.params.id,
      // );
      // const logbook = {
      //   pelaksanaan: this.state.pelaksanaan,
      //   aktivitas: this.state.aktivitas,
      //   waktu: this.state.waktu,
      //   berkas: this.state.berkas,
      // };
      // kontakLogbook
      //   .update(logbook)
      //   .then(data => {
      //     Alert.alert('Sukses', 'Terimakasih kontak sudah terupdate');
      //     this.props.navigation.replace('Logbook');
      //   })
      //   .catch(error => {
      //     console.log('Error :', error);
      //   });

      const formLogbook = new FormData();
      formLogbook.append('activity', this.state.aktivitas);
      const dateLogbook = this.state.pelaksanaan?.split('-');
      const dateFormLogbook = new Date(
        +dateLogbook[2],
        +dateLogbook[1] - 1,
        +dateLogbook[0],
      );
      formLogbook.append('date', dateFormLogbook);
      formLogbook.append('time', this.state.waktu);
      // TODO: append foto berkas di form

      axios
        .patch('https://api-dev.smartedu5p.com/api/v1/logbooks', formLogbook)
        .then(result => {
          Alert.alert('Sukses', 'Logbook berhasil disimpan');
          this.props.navigation.replace('Logbook');
        })
        .catch(error => {
          console.error(`Error : ${error.message}`);
        });
    } else {
      Alert.alert('Error', 'Semua wajib diisi');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <InputData
            label="Tanggal Pelaksanaan"
            placeholder="Masukkan nama topik tanggal pelaksanaan"
            onChangeText={this.onChangeText}
            value={this.state.pelaksanaan}
            nameState="pelaksanaan"
          />
          <InputData
            label="Aktivitas"
            placeholder="Masukkan Aktivitas (Kegiatan yang dilakukan)"
            isTextArea={true}
            onChangeText={this.onChangeText}
            value={this.state.aktivitas}
            nameState="aktivitas"
          />
          <InputData
            label="Waktu Kegiatan"
            placeholder="(xx:xx - xx:xx)"
            onChangeText={this.onChangeText}
            value={this.state.waktu}
            nameState="waktu"
          />
          <InputData
            label="Berkas"
            placeholder="Bukti Kegiatan"
            onChangeText={this.onChangeText}
            value={this.state.berkas}
            nameState="berkas"
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.onSubmit()}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 0.0}}
              colors={['#740EAB', '#ec2F4B']}
              style={styles.login}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Buat
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginHorizontal: 20,
  },

  button: {
    paddingTop: 15,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  login: {
    borderRadius: 7,
    width: 100,
    height: 30,
  },
});
