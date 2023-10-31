import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {Header, Logo} from '../../assets';
import {ButtonIcon, SliderNews} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ImageBackground source={Header} style={styles.header}>
        <View style={styles.logo}>
          <Image source={Logo} style={styles.logo1} />
          <ButtonIcon onPress={() => navigation.navigate('Search')} />
        </View>
        <View style={styles.hello}>
          <ButtonIcon title="" type="profile" onPress={() => navigation.navigate('Profile')}/>
          <Text style={styles.selamat}> Selamat Datang,</Text>
          <Text style={styles.username}> Bagas</Text>
        </View>
      </ImageBackground>
      <Text style={styles.layanan1}>Hii Teman-teman</Text>
      <View style={styles.layanan}>
        <View style={styles.buttonlayanan}>
          <ButtonIcon
            title="Project"
            type="layanan"
            onPress={() => navigation.navigate('Project')}
          />
          <ButtonIcon
            title="Logbook"
            type="layanan"
            onPress={() => navigation.navigate('Logbook')}
          />
          <ButtonIcon
            title="Public"
            type="layanan"
            onPress={() => navigation.navigate('Public')}
          />
          <ButtonIcon
            title="Group"
            type="layanan"
            onPress={() => navigation.navigate('Group')}
          />
          <ButtonIcon
            title="Add People"
            type="layanan"
            onPress={() => navigation.navigate('AddPeople')}
          />
          <ButtonIcon title="Upload" type="layanan" 
          onPress={() => navigation.navigate('Upload')}
          />
        </View>
      </View>
      <View style={styles.news}>
        <SliderNews />
      </View>
    </View>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    width: windowWidth * 1,
    height: windowHeight * 0.24,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo1: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.055,
  },
  hello: {
    marginTop: -windowHeight * 0.045,
    flexDirection: 'column',
    alignItems: 'center',
  },
  selamat: {
    fontSize: 27,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'white',
    marginTop: -windowHeight * 0.03,
  },
  username: {
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'white',
  },
  layanan: {
    marginLeft: 30,
    paddingTop: 15,
  },
  layanan1: {
    fontSize: 25,
    fontFamily: 'TitilliumWeb-Black',
    color: '#9c9c9c',
    paddingHorizontal: 40,
    paddingTop: 10,
  },
  buttonlayanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  news: {
    marginTop: 25,
  },
});
