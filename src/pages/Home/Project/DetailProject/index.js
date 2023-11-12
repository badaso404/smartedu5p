import {Text, StyleSheet, View, Image, Button} from 'react-native';
import React, {Component} from 'react';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';
import {ScrollView} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';

export default class DetailProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: {},
      user: {},
      hasil: [],
    };
  }

  componentDidMount() {
    this.ambilDataApi();
  }

  ambilDataApi = () => {
    axios
      .get(
        `https://api-dev.smartedu5p.com/api/v1/projects/${this.props.route.params.id}`,
      )
      .then(result => {
        this.setState({
          kontak: result.data.data.project,
        });
      })
      .catch(error => console.error(error.message));

    axios.get('https://api-dev.smartedu5p.com/api/v1/users/me').then(result => {
      this.setState({
        user: result.data.data.user,
      });
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
        hasil: images,
      });
    } catch (error) {}
  };

  uploadResult = async () => {
    const formResult = new FormData();
    this.state.hasil.forEach(image => {
      formResult.append('results', image);
    });

    Alert.alert(
      'Peringatan!',
      'Anda hanya bisa mengubah hasil saja setelah upload hasil!.\nTetap upload ? ',
      [
        {
          text: 'Cancel',
          onPress: () => 'Cancel pressed',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const result = await axios({
                url: `https://api-dev.smartedu5p.com/api/v1/projects/${this.state.kontak.id}/results`,
                method: 'PATCH',
                data: formResult,
                headers: {
                  Accept: 'application/json, text/plain, /',
                  'Content-Type': 'multipart/form-data',
                },
              });
              Alert.alert('Sukses', 'Berhasil mengupload hasil');
              this.setState({
                hasil: [],
              });
              this.ambilDataApi();
            } catch (error) {
              Alert.alert(
                'Gagal',
                `Gagal mengupload hasil!. Silahkan coba lagi.\n${
                  error.response?.data.message
                    ? 'Pesan : ' + error.response?.data.message
                    : null
                }`,
              );
            }
          },
        },
      ],
    );
  };

  publication = async () => {
    try {
      await axios({
        method: 'PATCH',
        url: `https://api-dev.smartedu5p.com/api/v1/projects/${this.state.kontak.id}/publish`,
      });
      Alert.alert('Sukses', 'Berhasil mempublikasikan project');
      this.ambilDataApi();
    } catch (error) {
      console.log(error, error.response?.data.message);
      Alert.alert('Gagal', 'Gagal mempublikasikan project. Silahkan coba lagi');
    }
  };

  activateProject = async () => {
    Alert.alert('Info', 'Apakah anda yakin untuk mengaktifkan project', [
      {
        text: 'Cancel',
        onPress: () => 'Cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const result = await axios.patch(
              `https://api-dev.smartedu5p.com/api/v1/projects/${this.state.kontak.id}/activate`,
            );
            Alert.alert('Sukses', 'Berhasil mengaktifkan project');
            this.ambilDataApi();
          } catch (error) {
            Alert.alert(
              'Sukses',
              `Gagal mengaktifkan project. \n ${
                error.response?.data.message
                  ? 'Pesan : ' + error.response?.data.message
                  : null
              }`,
            );
          }
        },
      },
    ]);
  };

  render() {
    const {kontak, user, hasil} = this.state;
    return (
      <ScrollView>
        <View style={styles.page}>
          <Text style={styles.judul}>Topik :</Text>
          <Text style={styles.text}>{kontak.topic}</Text>

          <Text style={styles.judul}>Project :</Text>
          <Text style={styles.text}>{kontak.name}</Text>

          <Text style={styles.judul}>Deskripsi :</Text>
          <Text style={styles.text}>{kontak.description}</Text>

          <Text style={styles.judul}>Pembimbing :</Text>
          <Text style={styles.text}>
            {kontak.teacher?.fullName ?? 'Belom ada Pembimbing'}
          </Text>

          <Text style={styles.judul}>Ketua :</Text>
          <Text style={styles.text}>{kontak.chairman?.fullName}</Text>

          <Text style={styles.judul}>Anggota :</Text>
          <Text style={styles.text}>
            {kontak.members?.length > 0
              ? kontak.members.map(member => member.fullName).join(', ')
              : 'Belom ada anggota'}
          </Text>

          <Text style={styles.judul}>Jumlah logbook :</Text>
          <Text style={styles.text}>
            {kontak.logbooks?.length > 0
              ? `${
                  kontak.logbooks.filter(logbook => logbook.valid === true)
                    .length
                }/${kontak.logbooks.length}`
              : '0/0'}
          </Text>

          <Text style={styles.judul}>Like :</Text>
          <Text style={styles.text}>{kontak.like}</Text>

          <Text style={styles.judul}>Komentar :</Text>
          <Text style={styles.text}>{kontak.comment}</Text>

          <Text style={styles.judul}>Bookmark :</Text>
          <Text style={styles.text}>{kontak.bookmark}</Text>

          <Text style={styles.judul}>Publik :</Text>
          <Text style={styles.text}>
            {kontak.public ? 'Terpublikasi' : 'Belum terpublikasi'}
          </Text>

          <Text style={styles.judul}>Status :</Text>
          <Text style={styles.text}>
            {kontak.active ? 'Aktif' : 'Tidak aktif'}
          </Text>

          <Text style={styles.judul}>Selesai :</Text>
          <Text style={styles.text}>{kontak.finish ? 'Selesai' : 'Belum'}</Text>

          <Text style={styles.judul}>Hasil : </Text>
          {kontak.result?.length > 0 ? (
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
              {kontak.result?.map(image => {
                return (
                  <Image
                    key={image}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    source={{
                      uri: `https://api-dev.smartedu5p.com/img/projects/results/${image}`,
                    }}></Image>
                );
              })}
            </View>
          ) : (
            <Text style={styles.text}>Belom ada hasil yg di upload</Text>
          )}

          {user?.role === 'siswa' ? (
            <View>
              <Text>
                Pilih gambar
                <Text
                  style={{
                    color: '#ff0000',
                  }}>
                  {` (hanya ketua yang bisa upload hasil)`}
                </Text>
              </Text>
              <Button title="Pilih gambar" onPress={this.openGallery}></Button>
            </View>
          ) : (
            <View>
              <Button title="Publikasikan" onPress={this.publication}></Button>
            </View>
          )}

          {hasil?.length > 0 ? (
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
              <Text>File : {hasil.map(hasil => hasil.name).join(', ')}</Text>
              <Text style={{color: '#ff0000'}}>
                {
                  'File yang lama akan terganti dengan yang baru. Abaikan jika tidak ada file yang lama'
                }
              </Text>
              {hasil.map(hasil => (
                <Image
                  key={hasil.name}
                  style={{height: 200, width: 200}}
                  source={{uri: hasil.uri}}></Image>
              ))}
              <Button title="Upload hasil" onPress={this.uploadResult}></Button>
            </View>
          ) : null}

          {user?.role === 'siswa' ? (
            <View
              style={{
                marginTop: 4,
              }}>
              <Button
                title="Aktifkan project"
                onPress={this.activateProject}></Button>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

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
