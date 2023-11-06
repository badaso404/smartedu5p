import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import FIREBASE from '../../../../config/FIREBASE';
import axios from 'axios';

export default class DetailProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontak: {},
    };
  }

  componentDidMount() {
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
    // FIREBASE.database()
    //   .ref('Kontak/'+ this.props.route.params.id)
    //   .once('value', querrySnapShot => {
    //     let data = querrySnapShot.val() ? querrySnapShot.val() : {};
    //     let kontakItem = {...data};

    //     this.setState({
    //       kontak: kontakItem,
    //     });
    //   });
  }

  render() {
    const {kontak} = this.state;
    return (
      <View style={styles.page}>
        <Text style={styles.judul}>Topik :</Text>
        <Text style={styles.text}>{kontak.topic}</Text>

        <Text style={styles.judul}>Project :</Text>
        <Text style={styles.text}>{kontak.name}</Text>

        <Text style={styles.judul}>Deskripsi :</Text>
        <Text style={styles.text}>{kontak.description}</Text>

        <Text style={styles.judul}>Kelompok :</Text>
        <Text style={styles.text}>{kontak.kelompok}</Text>

        <Text style={styles.judul}>Pembimbing :</Text>
        <Text style={styles.text}>
          {kontak.teacher?.fullName ?? 'Belom ada Pembimbing'}
        </Text>

        <Text style={styles.judul}>Ketua :</Text>
        <Text style={styles.text}>{kontak.chairman?.fullName}</Text>

        <Text style={styles.judul}>Anggota :</Text>
        <Text style={styles.text}>
          {kontak.members?.length > 0 ? kontak.members : 'Belom ada anggota'}
        </Text>

        <Text style={styles.judul}>Tanggal :</Text>
        <Text style={styles.text}>{kontak.tanggal}</Text>
      </View>
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
