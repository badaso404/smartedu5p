import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React from 'react';
import {Header} from '../../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {InputData} from '../../../../components';
import {Alert} from 'react-native';
import FIREBASE from '../../../../config/FIREBASE';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Moment from 'moment';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

export default class EditLogbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idLogbook: '',
      pelaksanaan: '',
      aktivitas: '',
      waktu: '',
      berkas: [],
      newBerkas: [],
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
        const data = result.data.data.logbook;
        console.log(data);
        this.setState({
          pelaksanaan: Moment(data.date).format('DD-MM-YYYY'),
          aktivitas: data.activity,
          waktu: data.time,
          berkas: data.supportFile,
          idLogbook: data._id,
        });
        console.log(this.state);
      });
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
        newBerkas: images,
      });
    } catch (error) {}
  };

  onSubmit = async () => {
    const {pelaksanaan, aktivitas, waktu} = this.state;
    if (!pelaksanaan)
      return Alert.alert('Fail', 'Tanggal pelaksanaan harus diisi');
    if (!aktivitas) return Alert.alert('Fail', 'Aktivitas harus diisi');
    if (!waktu)
      return Alert.alert('Fail', 'Waktu melaksanakan aktivitas harus diisi');

    const formLogbook = new FormData();
    formLogbook.append('activity', this.state.aktivitas);
    const dateLogbook = this.state.pelaksanaan?.split('-');
    const dateFormLogbook = `${dateLogbook[1]}-${dateLogbook[0]}-${dateLogbook[2]}`;
    formLogbook.append('date', dateFormLogbook);
    formLogbook.append('time', this.state.waktu);

    try {
      if (this.state.newBerkas.length > 0) {
        this.state.newBerkas.forEach(berkas => {
          formLogbook.append('supportFile', berkas);
        });
        await axios({
          method: 'DELETE',
          url: `https://api-dev.smartedu5p.com/api/v1/logbooks/${this.state.idLogbook}/supportFile`,
          data: {filename: this.state.berkas},
        });
      }
      const resultEdit = await axios.patch(
        `https://api-dev.smartedu5p.com/api/v1/logbooks/${this.state.idLogbook}`,
        formLogbook,
        {
          headers: {
            Accept: 'application/json, text/plain, /',
            'content-type': 'multipart/form-data',
          },
        },
      );
      Alert.alert('Sukses', 'Logbook berhasil disimpan');
      this.props.navigation.replace('Logbook');
    } catch (error) {
      Alert.alert('Sukses', 'Logbook gagal disimpan!. Silahkan coba lagi ');
      console.log(error, error.response?.data.message);
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
            value={`${this.state.waktu}`}
            keyboardType="numeric"
            maxLength={4}
            nameState="waktu"
          />
          <Text style={styles.label}>Berkas :</Text>
          <Text style={{color: '#ff0000'}}>
            *jangan upload berkas jika tidak ingin mengubahnya
          </Text>
          {this.state.berkas.length > 0 ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 4,
                marginVertical: 2,
              }}>
              {this.state.berkas.map(item => {
                return (
                  <Image
                    key={item}
                    style={{width: 100, height: 100}}
                    source={{
                      uri: `https://api-dev.smartedu5p.com/img/projects/logbooks/${item}`,
                    }}></Image>
                );
              })}
            </View>
          ) : null}
          {this.state.newBerkas.length > 0 ? (
            <View>
              <Text>Berkas Baru</Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  gap: 4,
                  marginVertical: 2,
                }}>
                {this.state.newBerkas.map(item => {
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
            </View>
          ) : null}
          <Button title="Select Image" onPress={this.openGallery}></Button>
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
                Simpan
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
