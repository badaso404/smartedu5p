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
    };
  }

  componentDidMount() {
    // FIREBASE.database()
    //   .ref('Kontak/'+ this.props.route.params.id)
    //   .once('value', querrySnapShot => {
    //     let data = querrySnapShot.val() ? querrySnapShot.val() : {};
    //     let kontakItem = {...data};
    // https://api-dev.smartedu5p.com/api/v1/projects/65047c14bc75fb57e15de6c0

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
        });
      });
    // });
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  onSubmit = () => {
    if (
      this.state.topik &&
      this.state.project &&
      this.state.deskripsi
      // this.state.kelompok &&
      // this.state.pembimbing &&
      // this.state.ketua &&
      // this.state.anggota &&
      // this.state.tanggal
    ) {
      axios
        .patch(
          `https://api-dev.smartedu5p.com/api/v1/projects/${this.props.route.params.id}`,
          {
            topic: this.state.topik,
            name: this.state.project,
            description: this.state.deskripsi,
          },
        )
        .then(() => {
          Alert.alert('Sukses', 'Terimakasih data sudah terupdate');
          this.props.navigation.replace('Project');
        })
        .catch(error => {
          console.error('Error : ', error.response);
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
    } else {
      Alert.alert('Error', 'Semua wajib diisi');
    }
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
          <InputData
            label="Kelompok"
            placeholder="Masukkan Nama Kelompok"
            onChangeText={this.onChangeText}
            value={this.state.kelompok}
            nameState="kelompok"
          />
          <InputData
            label="Pembimbing"
            placeholder="Masukkan nama pembimbing"
            onChangeText={this.onChangeText}
            value={this.state.pembimbing}
            nameState="pembimbing"
          />
          <InputData
            label="Ketua"
            placeholder="Masukkan nama ketua"
            onChangeText={this.onChangeText}
            value={this.state.ketua}
            nameState="ketua"
          />
          <InputData
            label="Anggota"
            placeholder="Masukkan nama anggota"
            onChangeText={this.onChangeText}
            value={this.state.anggota}
            nameState="anggota"
          />
          <InputData
            label="Tanggal"
            placeholder="Tanggal Pelaksanaan"
            onChangeText={this.onChangeText}
            value={this.state.tanggal}
            nameState="tanggal"
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
