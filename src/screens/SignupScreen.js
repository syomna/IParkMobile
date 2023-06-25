import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signup} from '../redux/slices/AuthSlice';
import {AuthStyle} from '../styles/AuthStyle';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validatePlate,
} from '../utils/Constants';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [plateError, setPlateError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {isLoading, error, id} = useSelector(state => state.authSlice);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Welcome! 👋',
      text2: "you've signed up successfully!",
      visibilityTime: 1500,
      onHide: () => {
        navigate.goBack();
      },
    });
  };

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong.',
      visibilityTime: 1500,
    });
  };

  useEffect(() => {
    if (id !== null && !error && !isLoading) {
      console.log('navigate');
      showToastSuccess();
    }
    if (error && !isLoading) {
      showToastError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, error, isLoading, navigate]);

  const handleNameChange = text => {
    setName(text);
  };
  const handlePhoneChange = text => {
    setPhone(text);
  };
  const handlePlateChange = text => {
    setPlate(text);
  };
  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleSignupPress = () => {
    let nError = validateName(name);
    setNameError(nError);
    let eError = validateEmail(email);
    setEmailError(eError);
    let pError = validatePassword(password);
    setPasswordError(pError);
    let phError = validatePhone(phone);
    setPhoneError(phError);
    let plError = validatePlate(plate);
    setPlateError(plError);
    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      !phoneError &&
      !plateError &&
      name &&
      email &&
      password &&
      phone &&
      plate
    ) {
      console.log(
        `name ${name} email ${email} password ${password} phone ${phone} plate ${plate}`,
      );
      dispatch(signup({name, email, password, phone, plate}));
    }
  };
  return (
    <View style={AuthStyle.loginBody}>
      <Text style={AuthStyle.title}>Welcome!</Text>
      <Text style={AuthStyle.title}>Let's get you started.</Text>
      <TextInput
        style={AuthStyle.input}
        placeholder="name"
        onChangeText={handleNameChange}
        value={name}
        autoCapitalize="none"
      />
      {nameError ? <Text style={AuthStyle.error}>{nameError}</Text> : null}

      <TextInput
        style={AuthStyle.input}
        placeholder="email address"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={AuthStyle.error}>{emailError}</Text> : null}
      <View style={AuthStyle.inputContainer}>
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={[AuthStyle.input, {flex: 2}]}
          placeholder="Password"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!passwordVisible);
          }}>
          <View style={AuthStyle.imageContainer}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/icons/hidden.png')
                  : require('../assets/icons/eye.png')
              }
              style={AuthStyle.image}
            />
          </View>
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={AuthStyle.error}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={AuthStyle.input}
        placeholder="phone number"
        onChangeText={handlePhoneChange}
        value={phone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      {phoneError ? <Text style={AuthStyle.error}>{phoneError}</Text> : null}

      <TextInput
        style={AuthStyle.input}
        placeholder="plate Number"
        onChangeText={handlePlateChange}
        value={plate}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      {plateError ? <Text style={AuthStyle.error}>{plateError}</Text> : null}

      <Text
        style={AuthStyle.back}
        onPress={() => {
          navigate.goBack();
        }}>
        Back
      </Text>

      <TouchableOpacity
        style={AuthStyle.button}
        activeOpacity={0.8}
        underlayColor="#d1d1d1"
        onPress={() => {
          handleSignupPress();
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={AuthStyle.icon}>✓</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
