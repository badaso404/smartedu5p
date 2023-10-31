import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {Component} from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Header1} from '../../../assets';
import {ButtonIcon} from '../../../components';
import { useNavigation } from '@react-navigation/native';



const navigation = useNavigation();
export default class Group extends Component {
  render() {
    return (
      <View style={styles.page}>
        <ImageBackground source={Header1} style={styles.header1}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Team</Text>
            <View style={styles.garis} />
          </View>
        </ImageBackground>

        <View style={styles.wraptouch}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.icon}>
              <ButtonIcon title="" type="profile" />
            </View>
            <View style={styles.wrap1}>
              <Text style={{fontFamily: 'TitilliumWeb-Black'}}>
                Merdeka Team
              </Text>
              <Text
                style={{
                  fontFamily: 'TitilliumWeb-Regular',
                  textAlign: 'center',
                }}>
                {' '}
                5 Member
              </Text>
              <View style={styles.team}>
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.icon}>
              <ButtonIcon title="" type="profile" />
            </View>
            <View style={styles.wrap1}>
              <Text
                style={{fontFamily: 'TitilliumWeb-Black', textAlign: 'center'}}>
                Kuda Team
              </Text>
              <Text
                style={{
                  fontFamily: 'TitilliumWeb-Regular',
                  textAlign: 'center',
                }}>
                {' '}
                5 Member
              </Text>
              <View style={styles.team}>
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
                <Image source={require('./../../../assets/Images/foto.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapbutton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddPeople')}>
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
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  garis: {
    borderWidth: 2,
    marginTop: 5,
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
  wraptouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 13,
  },
  card: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  wrap1: {
    padding: 30,
    paddingTop: 55,
    margin: 10,
  },
  icon: {
    position: 'absolute',
    marginLeft: 57,
    marginTop: 3,
  },
  team: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
