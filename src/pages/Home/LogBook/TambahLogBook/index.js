import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {InputData} from '../../../../components';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
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
      let images = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: DocumentPicker.types.images,
        presentationStyle: 'fullScreen',
      });
      images = await Promise.all(
        images.map(async image => {
          if (image.uri.startsWith('content://')) {
            const destPath = `${RNFS.TemporaryDirectoryPath}/${image.name}`;
            await RNFS.copyFile(image.uri, destPath);
            image.uri = `file://${destPath}`;
          }
          return {
            fileCopyUri: image.fileCopyUri,
            name: image.name,
            type: image.type,
            uri: image.uri,
          };
        }),
      );
      this.setState({
        berkas: images,
      });
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
    const dateFormLogbook = `${dateLogbook[1]}-${dateLogbook[0]}-${dateLogbook[2]}`;
    formLogbook.append('date', dateFormLogbook);
    formLogbook.append('time', this.state.waktu);
    // DONE: append file to formData
    this.state.berkas.forEach(item => {
      formLogbook.append('supportFile', {
        name: item.name,
        type: item.type,
        uri: item.uri,
      });
    });

    axios
      .post('https://api-dev.smartedu5p.com/api/v1/logbooks', formLogbook, {
        headers: {
          Accept: 'application/json, text/plain, /',
          'content-type': 'multipart/form-data',
        },
      })
      .then(result => {
        Alert.alert('Sukses', 'Logbook berhasil disimpan');
        this.props.navigation.replace('Logbook');
      })
      .catch(error => {
        console.log(error, error.response);
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
            placeholder="Masukkan tanggal pelaksanaan (01-01-2023)"
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
              File : {this.state.berkas.map(berkas => berkas.name).join(', ')}
            </Text>
          ) : null}
          {this.state.berkas.length > 0 ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 4,
                marginTop: 2,
              }}>
              {this.state.berkas.map(item => {
                return (
                  <Image
                    key={item.name}
                    style={{width: 100, height: 100}}
                    source={{
                      uri: item.uri,
                    }}></Image>
                );
              })}
            </View>
          ) : null}
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
  Image: {
    width: windowWidth * 1,
    height: windowHeight * 0.47,
    marginTop: 20,
  },
});
