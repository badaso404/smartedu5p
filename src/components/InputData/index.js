import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {text} from '@fortawesome/fontawesome-svg-core';

const InputData = ({
  label,
  placeholder,
  isTextArea,
  onChangeText,
  value,
  nameState,
  readOnly,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.label}>{label} :</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.textinputarea}
          multiline={true}
          numberOfLines={4}
          value={value}
          onChangeText={text => onChangeText(nameState, text)}
        />
      </>
    );
  }

  return (
    <>
      <Text style={styles.label}>{label} :</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textinput}
        value={value}
        onChangeText={text => onChangeText(nameState, text)}
        readOnly={readOnly}
      />
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  textinput: {
    color: '#000000',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 7,
    paddingTop: 10,
    paddingLeft: 10,
  },
  textinputarea: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 7,
    paddingTop: 10,
    paddingLeft: 10,
  },
});
