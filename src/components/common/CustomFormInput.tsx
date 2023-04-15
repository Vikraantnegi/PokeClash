/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Fonts} from '../../HelperStyles';
import Icon from 'react-native-vector-icons/Feather';

interface FormInputProps {
  name: string;
  value: string;
  iconName?: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  iconColor?: string;
  iconSize?: number;
  secureTextEntry?: boolean;
  errorMsg?: string;
  validationRequired?: string;
  onChange: Function;
}

const CustomFormInput = ({
  name,
  value,
  iconName,
  label,
  placeholder = '',
  iconColor = '#d53f27',
  iconSize = 20,
  onChange,
  maxLength = 128,
  secureTextEntry = false,
  validationRequired = '',
  errorMsg,
}: FormInputProps) => {
  return (
    <View style={styles.formElement}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {iconName ? (
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={[styles.inputIcon, label ? {} : {top: 12}]}
        />
      ) : null}
      <TextInput
        style={[
          styles.input,
          iconName
            ? {
                paddingLeft: 36,
              }
            : {},
        ]}
        onChangeText={text =>
          onChange({
            type: name,
            value: text,
            validationType: validationRequired,
          })
        }
        value={value}
        placeholder={placeholder}
        placeholderTextColor="grey"
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      />
      {errorMsg ? <Text style={styles.inputErr}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formElement: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontFamily: Fonts.fontSemi,
    fontSize: 14,
    lineHeight: 16,
    color: '#FFF',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    color: '#000',
    fontFamily: Fonts.fontSemi,
    fontSize: 14,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    top: 30,
    left: 8,
    zIndex: 1,
  },
  inputErr: {
    fontFamily: Fonts.fontRegular,
    fontSize: 12,
    color: '#FFF',
  },
});

export default CustomFormInput;
