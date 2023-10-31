import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import FIREBASE from '../../../../config/FIREBASE'


export default class DetailLogbook extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         kontak: {}
      }
    }

    componentDidMount() {
        FIREBASE.database()
          .ref('LogBook/'+ this.props.route.params.id)
          .once('value', querrySnapShot => {
            let data = querrySnapShot.val() ? querrySnapShot.val() : {};
            let kontakItems= {...data};
    
            this.setState({
              kontak: kontakItems,
            });
          });
      }



  render() {
    const { kontak }= this.state;
    return (
      <View style={styles.page}>
        <Text style={styles.judul}>Tanggal Pelaksanaan :</Text>
        <Text style={styles.text}>{kontak.pelaksanaan}</Text>
        
        <Text style={styles.judul}>Aktivitas :</Text>
        <Text style={styles.text}>{kontak.aktivitas}</Text>

        <Text style={styles.judul}>Waktu Kegiatan :</Text>
        <Text style={styles.text}>{kontak.waktu}</Text>

        <Text style={styles.judul}>Berkas :</Text>
        <Text style={styles.text}>{kontak.berkas}</Text>
        
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