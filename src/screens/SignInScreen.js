/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useContext, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

import { Context } from '../components/context';

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { signIn } = useContext(Context);
  const hostname = 'backend-ce-news.herokuapp.com';
  const url = `https://${hostname}`;

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setUsers(result.data);
    };
    fetchData();
  }, []);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [valEmail, setEmail] = useState('');
  const [valPassword, setPassword] = useState('');

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (valEmail) => {
    if (reg.test(valEmail) === true) {
      setData({
        ...data,
        email: valEmail,
        check_textInputChange: true,
        isValidUser: true,
      });
      setEmail(valEmail);
    } else {
      setData({
        ...data,
        email: valEmail,
        check_textInputChange: false,
        isValidUser: false,
      });
      setEmail(valEmail);
    }
  };

  const handlePasswordChange = (valPassword) => {
    if (valPassword.trim().length >= 8) {
      setData({
        ...data,
        password: valPassword,
        isValidPassword: true,
      });
      setPassword(valPassword);
    } else {
      setData({
        ...data,
        password: valPassword,
        isValidPassword: false,
      });
      setPassword(valPassword);
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (email, password) => {
    const fetchData = async () => {
      const result = await axios(url);
      setUsers(result.data);
    };
    fetchData();
    const foundUser = Users.filter((item) => {
      return email === item.email && password === item.password;
    });

    if (data.email.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Attention!',
        'email ou mot de passe ne doit pas être vide.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Attention!', 'email ou mot de passe est incorrect.', [
        { text: 'OKS' },
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Se connecter!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Votre Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            value={valEmail}
            onChangeText={textInputChange}
            onSubmitEditing={() => {
              secondTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email n'est pas valide.</Text>
          </Animatable.View>
        )}
        <Text
          style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
        >
          Mot de passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Votre mot de passe"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            value={valPassword}
            onChangeText={handlePasswordChange}
            ref={(input) => {
              secondTextInput = input;
            }}
            onSubmitEditing={() => {
              loginHandle(data.email, data.password);
            }}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Votre mot de passe doit faire au moins 8 caractères
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>
            mot de passe oublié?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: '#fff' }]}>
                Se connecter
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: '#009387' }]}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
