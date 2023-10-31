import {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import FIREBASE from '../../../config/FIREBASE';
import { CardProject } from '../../../components';
import {Header1} from '../../../assets';
import axios from 'axios';

const navigation = useNavigation();
export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: {},
      kontaksKey: [],
    };
  }

  componentDidMount() {
   this.ambilDataApi()
  }

  ambilData = () => {
    FIREBASE.database()
    .ref('Kontak')
    .once('value', querrySnapShot => {
      let data = querrySnapShot.val() ? querrySnapShot.val() : {};
      let kontakItem = {...data};

      this.setState({
        kontaks: kontakItem,
        kontaksKey: Object.keys(kontakItem),
      });
    });
  }

  ambilDataApi = () => {
    // https://api-dev.smartedu5p.com/api/v1/projects
    axios.get('https://api-dev.smartedu5p.com/api/v1/projects').then((result) => {
      console.log(result.data.data)
      let data = result.data.data;
      this.setState({
        kontaks: data.projects,
        kontaksKey: Object.keys(data.projects)
      })
    })
  }

  removeData = (id)=> {
    Alert.alert('Info', 'Anda yakin akan menghapus ?', [
      {
        text: 'Cancel',
        onPress: () => ('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
      FIREBASE.database()
      .ref('Kontak/'+ id)
      .remove()
      this.ambilData()
      Alert.alert('Hapus', 'Sukses menghapus project')
    }},
    ]);
  }

  render() {
    const {kontaks, kontaksKey} = this.state
    return (
      <View style={styles.page}>
      <ImageBackground source={Header1} style={styles.header1}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Project</Text>
          <View style={styles.garis}/>
        </View>
        </ImageBackground>

        <View style={styles.project1}>
          {kontaksKey.length > 0 ? (
            kontaksKey.map((key) => (
              <CardProject key={key} kontakItem={kontaks[key]} id={key} {...this.props}
                removeData={this.removeData}
              /> 
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>

        <View style={styles.wrapbutton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TambahProject')}>
            <FontAwesomeIcon icon={faPlus} size={25} color="white" />
          </TouchableOpacity>
        </View>
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
    marginBottom: 20
  },
  header: {
    paddingHorizontal:30,
    paddingTop:15
  },
  title: {
    fontSize:25,
    fontWeight: 'bold',
    color: 'white'
  },
  garis:{
    borderWidth: 2,
    marginTop: 15,
    borderColor: 'white'
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
