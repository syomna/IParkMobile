import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {AuthStyle} from '../styles/AuthStyle';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/slices/AuthSlice';
import {validateEmail, validatePassword} from '../utils/Constants';
import Toast from 'react-native-toast-message';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {isLoading, error, id} = useSelector(state => state.authSlice);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Welcome back! 👋',
      text2: "you've logged in successfully!",
      visibilityTime: 1500,
      onHide: () => {
        navigate.goBack();
      },
    });
  };

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Email or Password is incorrect.',
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

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLoginPress = () => {
    let eError = validateEmail(email);
    setEmailError(eError);
    let pError = validatePassword(email);
    setPasswordError(pError);

    if (!emailError && !passwordError && email && password) {
      console.log(`email ${email} password ${password}`);
      dispatch(login({email, password}));
    }
  };
  return (
    <View style={AuthStyle.loginBody}>
      <Text style={AuthStyle.title}>Welcome Back!</Text>
      <Text style={AuthStyle.title}>Let's get you logged in.</Text>
      <TextInput
        style={AuthStyle.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={AuthStyle.error}>{emailError}</Text> : null}

      <TextInput
        style={AuthStyle.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      {passwordError ? (
        <Text style={AuthStyle.error}>{passwordError}</Text>
      ) : null}

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
          handleLoginPress();
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={AuthStyle.icon}>✓</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
