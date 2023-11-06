import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {InputData} from '../../../../components';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';

export default class TambahLogbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pelaksanaan: '',
      aktivitas: '',
      waktu: '',
      berkas: '',
    };
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
      this.state.waktu &&
      this.state.berkas
    ) {
      // const kontakLogbook = FIREBASE.database().ref('LogBook');
      // const logbook = {
      //   pelaksanaan: this.state.pelaksanaan,
      //   aktivitas: this.state.aktivitas,
      //   waktu: this.state.waktu,
      //   berkas: this.state.berkas,
      // };

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
        .post('https://api-dev.smartedu5p.com/api/v1/logbooks', formLogbook)
        .then(result => {
          Alert.alert('Sukses', 'Logbook berhasil disimpan');
          this.props.navigation.replace('Logbook');
        })
        .catch(error => {
          console.error(`Error : ${error.message}`);
        });

      // kontakLogbook
      //   .push(logbook)
      //   .then(data => {
      //     Alert.alert('Sukses', 'Terimakasi sudah mengisi');
      //     this.props.navigation.replace('Logbook');
      //   })
      //   .catch(error => {
      //     console.log('Error :', error);
      //   });
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
            placeholder="Masukkan tanggal pelaksanaan (DD-MM-YYYY)"
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
            placeholder="Masukkan menit waktu kegiatan"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
