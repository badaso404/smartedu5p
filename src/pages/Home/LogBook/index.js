import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Header1} from '../../../assets';
import FIREBASE from '../../../config/FIREBASE';
import {CardProject} from '../../../components';
import CardProject1 from '../../../components/CardProject1';
import axios from 'axios';

const navigation = useNavigation();
export default class Logbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaklog: {},
      kontaklogKey: [],
      user: {},
    };
  }

  componentDidMount() {
    this.ambilDataApi();
  }

  ambilData = () => {
    FIREBASE.database()
      .ref('LogBook')
      .once('value', querrySnapShot => {
        let data = querrySnapShot.val() ? querrySnapShot.val() : {};
        let kontakItems = {...data};

        this.setState({
          kontaklog: kontakItems,
          kontaklogKey: Object.keys(kontakItems),
        });
      });
  };

  ambilDataApi = async () => {
    try {
      const result = await axios.get(
        'https://api-dev.smartedu5p.com/api/v1/logbooks?sort=-date',
      );
      const data = result.data.data;
      this.setState({
        kontaklog: data.logbooks,
      });
      const dataUser = await axios.get(
        'https://api-dev.smartedu5p.com/api/v1/users/me',
      );
      this.setState({
        user: dataUser.data.data.user,
      });
    } catch (error) {}
  };

  removeData = id => {
    Alert.alert('Info', 'Anda yakin akan menghapus ?', [
      {
        text: 'Cancel',
        onPress: () => 'Cancel Pressed',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          axios
            .delete(`https://api-dev.smartedu5p.com/api/v1/logbooks/${id}`)
            .then(() => {
              Alert.alert('Hapus', 'Logbook berhasil dihapus');
              this.ambilDataApi();
            })
            .catch(error => {
              Alert.alert('Error', 'Logbook gagal dihapus. Silahkan coba lagi');
              console.log(
                `Error : ${error.message}`,
                error.response?.data.message,
              );
            });
          // FIREBASE.database()
          //   .ref('LogBook/' + id)
          //   .remove();
          // this.ambilData();
          // Alert.alert('Hapus', 'Sukses menghapus project');
        },
      },
    ]);
  };

  render() {
    const {kontaklog, kontaklogKey, user} = this.state;
    return (
      <View style={styles.page}>
        <ImageBackground source={Header1} style={styles.header1}>
          <View style={styles.header}>
            <Text style={styles.title}>Daftar Logbook</Text>
            <View style={styles.garis} />
          </View>
        </ImageBackground>

        <ScrollView>
          <View style={{...styles.project1, marginBottom: 60}}>
            {kontaklog.length > 0 ? (
              kontaklog.map(item => (
                <CardProject1
                  key={item._id}
                  kontakItems={item}
                  id={item.id}
                  user={user}
                  {...this.props}
                  removeData={this.removeData}
                />
              ))
            ) : (
              <Text>Daftar Kosong</Text>
            )}
          </View>
        </ScrollView>

        {this.state.user?.role === 'siswa' ? (
          <View style={styles.wrapbutton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TambahLogbook')}>
              <FontAwesomeIcon icon={faPlus} size={25} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header1: {
    width: windowWidth * 1.01,
    height: windowHeight * 0.115,
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  garis: {
    borderWidth: 2,
    marginTop: 15,
    borderColor: 'white',
  },
  wrapbutton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
  },
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 10,
  },
});
