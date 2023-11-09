import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {InputData} from '../../../../components';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {Platform} from 'react-native';

export default class TambahLogbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pelaksanaan: '',
      aktivitas: '',
      waktu: '',
      berkas: [],
    };
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  openGallery = async () => {
    try {
      const images = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: DocumentPicker.types.images,
        presentationStyle: 'fullScreen',
      });
      this.setState({
        berkas: images,
      });
      console.log(this.state.berkas);
    } catch (error) {}
  };

  onSubmit = () => {
    const {pelaksanaan, aktivitas, waktu, berkas} = this.state;
    if (!pelaksanaan)
      return Alert.alert('Fail', 'Tanggal pelaksanaan harus diisi');
    if (!aktivitas) return Alert.alert('Fail', 'Aktivitas harus diisi');
    if (!waktu)
      return Alert.alert('Fail', 'Waktu melaksanakan aktivitas harus diisi');
    if (!berkas.length > 0)
      return Alert.alert(
        'Fail',
        'Silahkan upload bukti pelaksanaan aktivitas dahulu',
      );
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
    this.state.berkas.forEach(item => {
      formLogbook.append('supportFile', {
        name: item.name,
        type: item.type,
        uri: Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
      });
    });

    console.log(JSON.stringify(formLogbook));
    return;
    axios
      .post('https://api-dev.smartedu5p.com/api/v1/logbooks', formLogbook, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(result => {
        Alert.alert('Sukses', 'Logbook berhasil disimpan');
        this.props.navigation.replace('Logbook');
      })
      .catch(error => {
        console.log(error);
        console.error(error);
        // console.error(`Error : ${error.response.data.message}`);
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
            keyboardType="numeric"
            maxLength={4}
            nameState="waktu"
          />
          <Text style={styles.label}>Berkas : </Text>
          <Button title="Select Image" onPress={this.openGallery}></Button>
          {this.state.berkas.length > 0 ? (
            <Text style={{fontSize: 12}}>
              File : {this.state.berkas.map(berkas => berkas.name).join(', ')}\n
              URI :{' '}
              {this.state.berkas
                .map(berkas => convertContentUriToFilePath(berkas.uri))
                .join('\n')}
            </Text>
          ) : null}
          {this.state.berkas.length > 0 ? (
            <View>
              {this.state.berkas.forEach(item => {
                <Image
                  source={{
                    uri: `D:\\Programming\\Project\\front-end-smartedu5p\\src\\assets\\Images\\Logo.png`,
                  }}></Image>;
              })}
            </View>
          ) : null}
          {/* <InputData
            label="Berkas"
            placeholder="Bukti Kegiatan"
            onChangeText={this.onChangeText}
            value={this.state.berkas}
            nameState="berkas"
          /> */}
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
  label: {
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 5,
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
