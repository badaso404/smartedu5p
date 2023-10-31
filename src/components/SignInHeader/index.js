import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';

const SignInHeader = props => {
  return (
    <View style={{marginTop: 40, marginBottom: 10}}>
    <LinearTextGradient
        style={{fontFamily: 'TitilliumWeb-Black', fontSize:28, textAlign:'center'}}
        locations={[0, 1]}
        start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#009FFF', '#ec2F4B']}>
      <Text>
        {props.title}
      </Text>
      </LinearTextGradient>

      <LinearTextGradient
        style={{fontFamily: 'TitilliumWeb-Regular', fontSize:15, textAlign:'center'}}
        locations={[0, 1]}
        start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#009FFF', '#ec2F4B']}>
      <Text>
        {props.description}
      </Text>
      </LinearTextGradient>
    </View>
  );
};

export default SignInHeader;
