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
import DropDownPicker from 'react-native-dropdown-picker';

export default class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topik: '',
      project: '',
      deskripsi: '',
      kelompok: '',
      pembimbing: '',
      ketua: '',
      anggota: '',
      tanggal: '',

      // for Dropdown pembimbing
      openPembimbing: false,
      selectedPembimbing: null,
      idSelectedPembimbing: null,
      dataPembimbing: [],

      // for Dropdown Anggota
      openAnggota: false,
      selectedAnggota: [],
      idSelectedAnggota: [],
      dataAnggota: [],

      // data user login
      user: {},
    };

    this.setSelectedPembimbing = this.setSelectedPembimbing.bind(this);
    this.setSelectedAnggota = this.setSelectedAnggota.bind(this);
  }

  setOpenPembimbing = openPembimbing => {
    this.setState({
      openPembimbing,
    });
  };
  setDataPembimbing(callback) {
    this.setState(state => ({
      dataPembimbing: callback(state.items),
    }));
  }
  setSelectedPembimbing(callback) {
    this.setState(state => ({
      selectedPembimbing: callback(state.value),
    }));
  }

  setOpenAnggota = openAnggota => {
    this.setState({
      openAnggota,
    });
  };
  setDataAnggota(callback) {
    this.setState(state => ({
      dataAnggota: callback(state.items),
    }));
  }
  setSelectedAnggota(callback) {
    this.setState(state => {
      return {
        selectedAnggota: callback(state.selectedAnggota),
      };
    });
  }

  async componentDidMount() {
    // FIREBASE.database()
    //   .ref('Kontak/'+ this.props.route.params.id)
    //   .once('value', querrySnapShot => {
    //     let data = querrySnapShot.val() ? querrySnapShot.val() : {};
    //     let kontakItem = {...data};
    // https://api-dev.smartedu5p.com/api/v1/projects/65047c14bc75fb57e15de6c0

    await axios
      .get('https://api-dev.smartedu5p.com/api/v1/users/me')
      .then(result => {
        const {user} = result.data.data;
        this.setState({
          user: user,
        });
      });

    axios
      .get(
        `https://api-dev.smartedu5p.com/api/v1/search?schoolNPSN=${this.state.user?.school?.npsn}`,
      )
      .then(result => {
        const listGuru = result.data.data.data
          .filter(user => user.role === 'guru')
          .map(guru => {
            return {label: guru.fullName, value: guru.fullName, id: guru.id};
          });
        const listSiswa = result.data.data.data
          .filter(
            user => user.role === 'siswa' && user.id !== this.state.user.id,
          )
          .map(siswa => {
            return {label: siswa.fullName, value: siswa.fullName, id: siswa.id};
          });
        this.setState({
          dataPembimbing: listGuru,
          dataAnggota: listSiswa,
        });
      });

    axios
      .get(
        `https://api-dev.smartedu5p.com/api/v1/projects/${this.props.route.params.id}`,
      )
      .then(data => {
        const {project} = data.data.data;
        this.setState({
          topik: project.topic,
          project: project.name,
          deskripsi: project.description,
          // kelompok: project.kelompok,
          pembimbing: project.teacher?.fullName,
          ketua: project.chairman.fullName,
          // anggota: project.members.map(member => member.fullName).join(', '),
          // tanggal: project.tanggal,
          selectedPembimbing: project.teacher?.fullName,
          idSelectedPembimbing: project.teacher?.id,
          selectedAnggota: project.members?.map(member => member.fullName),
          idSelectedAnggota: project.members?.map(member => member.id),
        });
      });
    // });
  }

  fetchDataAnggota = async text => {
    try {
      const result = await axios.get(
        `https://api-dev.smartedu5p.com/api/v1/search?user=${text}&schoolNPSN=${this.state.user?.school?.npsn}&role=siswa`,
      );
      let data = result.data.data.data;
      data = data.filter(user => user.id !== this.state.user.id);
      const listSiswa = data.map(siswa => {
        return {label: siswa.fullName, value: siswa.fullName, id: siswa.id};
      });
      this.setState({
        dataAnggota: listSiswa,
      });
    } catch (error) {}
  };

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  onSubmit = async () => {
    const {topik, project, deskripsi} = this.state;
    if (!topik)
      return Alert.alert('Fail', 'Silahkan isi topik terlebih dahulu');
    if (!project)
      return Alert.alert('Fail', 'Silahkan isi judul project terlebih dahulu');
    if (!deskripsi)
      return Alert.alert(
        'Fail',
        'Silahkan isi deskripsi project terlebih dahulu',
      );

    axios
      .patch(
        `https://api-dev.smartedu5p.com/api/v1/projects/${this.props.route.params.id}`,
        {
          topic: topik,
          name: project,
          description: deskripsi,
          teacher: this.state.idSelectedPembimbing,
          members: this.state.idSelectedAnggota,
        },
      )
      .then(() => {
        Alert.alert('Sukses', 'Terimakasih data sudah terupdate', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.replace('Project');
            },
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.message);
      });

    // const kontakReferensi = FIREBASE.database().ref(
    //   'Kontak/' + this.props.route.params.id,
    // );
    // const kontak = {
    //   topik: this.state.topik,
    //   project: this.state.project,
    //   deskripsi: this.state.deskripsi,
    //   kelompok: this.state.kelompok,
    //   pembimbing: this.state.pembimbing,
    //   ketua: this.state.ketua,
    //   anggota: this.state.anggota,
    //   tanggal: this.state.tanggal,
    // };

    // kontakReferensi
    //   .update(kontak)
    //   .then(data => {
    //     Alert.alert('Sukses', 'Terimakasih kontak sudah terupdate');
    //     this.props.navigation.replace('Project');
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
            label="Topik"
            placeholder="Masukkan nama topik"
            onChangeText={this.onChangeText}
            value={this.state.topik}
            nameState="topik"
          />
          <InputData
            label="Project"
            placeholder="Masukkan nama Judul Projek"
            onChangeText={this.onChangeText}
            value={this.state.project}
            nameState="project"
          />
          <InputData
            label="Deskripsi"
            placeholder="Deskripsikan Projek secara singkat"
            isTextArea={true}
            onChangeText={this.onChangeText}
            value={this.state.deskripsi}
            nameState="deskripsi"
          />
          {/* <InputData
            label="Kelompok"
            placeholder="Masukkan Nama Kelompok"
            onChangeText={this.onChangeText}
            value={this.state.kelompok}
            nameState="kelompok"
          /> */}
          {/* <InputData
            label="Pembimbing"
            placeholder="Masukkan nama pembimbing"
            onChangeText={this.onChangeText}
            value={this.state.pembimbing}
            nameState="pembimbing"
          /> */}
          <View>
            <Text style={styles.label}>Pembimbing :</Text>
            <DropDownPicker
              placeholder="Pilih guru pembimbing"
              zIndex={5001}
              open={this.state.openPembimbing}
              value={this.state.selectedPembimbing}
              items={this.state.dataPembimbing}
              setOpen={this.setOpenPembimbing}
              setValue={this.setSelectedPembimbing}
              setItems={this.setDataPembimbing}
              onSelectItem={item =>
                this.setState({
                  idSelectedPembimbing: item.id,
                })
              }
              style={{
                ...styles.textinput,
                backgroundColor: '#f5f5f5',
              }}
              dropDownContainerStyle={{
                borderColor: '#c4c4c4',
                borderRadius: 10,
              }}
              textStyle={{
                color: '#575757',
              }}
            />
          </View>
          <InputData
            label="Ketua"
            placeholder="Masukkan nama ketua"
            onChangeText={this.onChangeText}
            value={this.state.ketua}
            nameState="ketua"
            readOnly={true}
          />
          <View>
            <Text style={styles.label}>Anggota :</Text>
            <DropDownPicker
              multiple={true}
              placeholder="Pilih anggota"
              mode="BADGE"
              dropDownDirection="BOTTOM"
              zIndex={5000}
              open={this.state.openAnggota}
              value={this.state.selectedAnggota}
              items={this.state.dataAnggota}
              setOpen={this.setOpenAnggota}
              setValue={this.setSelectedAnggota}
              setItems={this.setDataAnggota}
              onSelectItem={items => {
                items = items.map(item => item.id);
                this.setState({
                  idSelectedAnggota: items,
                });
              }}
              style={{
                ...styles.textinput,
                backgroundColor: '#f5f5f5',
              }}
              dropDownContainerStyle={{
                borderColor: '#c4c4c4',
                borderRadius: 10,
              }}
              textStyle={{
                color: '#575757',
              }}
              searchable={true}
              searchPlaceholder="Cari nama anggotamu"
              onChangeSearchText={text => {
                this.fetchDataAnggota(text);
              }}
            />
          </View>
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
  label: {
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  textinput: {
    color: '#000000',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 7,
    // paddingTop: 10,
    paddingLeft: 10,
  },
  login: {
    borderRadius: 7,
    width: 100,
    height: 30,
  },
});
