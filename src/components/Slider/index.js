import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {News1, News2, News3} from './../../assets';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [News1, News2, News3],
    };
  }

  render() {
    return (
      <View>
        <SliderBox
          images={this.state.images}
          autoplay
          circleLoop
          ImageComponentStyle={styles.news}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  news: {
    borderRadius: 20,
  },
});
