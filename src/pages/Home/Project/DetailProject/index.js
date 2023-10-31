import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import FIREBASE from '../../../../config/FIREBASE'


export default class DetailProject extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         kontak: {}
      }
    }

    componentDidMount() {
        FIREBASE.database()
          .ref('Kontak/'+ this.props.route.params.id)
          .once('value', querrySnapShot => {
            let data = querrySnapShot.val() ? querrySnapShot.val() : {};
            let kontakItem = {...data};
    
            this.setState({
              kontak: kontakItem,
            });
          });
      }



  render() {
    const { kontak }= this.state;
    return (
      <View style={styles.page}>
        <Text style={styles.judul}>Topik :</Text>
        <Text style={styles.text}>{kontak.topik}</Text>
        
        <Text style={styles.judul}>Project :</Text>
        <Text style={styles.text}>{kontak.project}</Text>

        <Text style={styles.judul}>Deskripsi :</Text>
        <Text style={styles.text}>{kontak.deskripsi}</Text>

        <Text style={styles.judul}>Kelompok :</Text>
        <Text style={styles.text}>{kontak.kelompok}</Text>

        <Text style={styles.judul}>Pembimbing :</Text>
        <Text style={styles.text}>{kontak.pembimbing}</Text>

        <Text style={styles.judul}>Ketua :</Text>
        <Text style={styles.text}>{kontak.ketua}</Text>

        <Text style={styles.judul}>Anggota :</Text>
        <Text style={styles.text}>{kontak.anggota}</Text>

        <Text style={styles.judul}>Tanggal :</Text>
        <Text style={styles.text}>{kontak.tanggal}</Text>

        

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    page: {
        padding:20,
        margin:20,
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

    judul:{
        fontFamily:'TitillumWeb-Regular',
        fontSize: 16
    },
    text:{
        fontSize:20,
        fontFamily: 'TitilliumWeb-Bold',
        marginBottom:10

    }
})