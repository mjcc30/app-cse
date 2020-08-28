/* eslint-disable semi */
/* eslint-disable comma-dangle */
import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  ScrollView,
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
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const hostname = 'backend-ce-news.herokuapp.com';
  const url = `https://${hostname}`;

  const [Users, setUsers] = useState([]);
  const { signIn } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setUsers(result.data);
    };
    fetchData();
  }, []);

  const addUserId = Users.filter((item) => {
    item._id = Users.length + 1;
    id = parseInt(item._id);
    console.log(id);
    return id;
  });

  const { colors } = useTheme();

  const [valEmail, setEmail] = useState('');
  const [valPassword, setPassword] = useState('');
  const [valConfirmPassword, setConfirmPassword] = useState('');
  const [iscreate, setIsCreate] = useState(null);

  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const onSubmit = (e) => {
    if (valEmail.length == 0 || valConfirmPassword.length == 0) {
      Alert.alert(
        'Attention!',
        'email ou mot de passe ne doit pas être vide.',
        [{ text: 'OK' }]
      );
    } else if (valConfirmPassword !== valPassword) {
      Alert.alert('Attention!', 'mot de passe doit être le même.', [
        { text: 'OK' },
      ]);
    } else {
      Alert.alert('Félicitation!', 'votre compte a bien été créer.', [
        { text: 'OK' },
      ]);
      addUserId;
      e.preventDefault();
      axios
        .post(url, {
          _id: id,
          email: valEmail,
          password: valConfirmPassword,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setIsCreate({
        iscreate: true,
      });
    }
  };

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

  const handleConfirmPasswordChange = (valConfirmPassword) => {
    if (valConfirmPassword.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: valConfirmPassword,
        isValidConfirmPassword: true,
      });
      setConfirmPassword(valConfirmPassword);
    } else {
      setData({
        ...data,
        confirm_password: valConfirmPassword,
        isValidConfirmPassword: false,
      });
      setConfirmPassword(valConfirmPassword);
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const loginHandle = (valEmail, valPassword) => {
    const fetchData = async () => {
      const result = await axios(url);
      setUsers(result.data);
    };
    fetchData();
    const foundUser = Users.filter((item) => {
      return valEmail === item.email && valPassword === item.password;
    });
    signIn(foundUser);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>S'inscrire!</Text>
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
            secureTextEntry={!!data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            value={valPassword}
            onChangeText={handlePasswordChange}
            ref={(input) => {
              let secondTextInput = input;
            }}
            onSubmitEditing={() => {
              thirdTextInput.focus();
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
        <Text
          style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
        >
          ConfirmerMot de passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Confirmation mot de passe"
            placeholderTextColor="#666666"
            secureTextEntry={!!data.confirm_secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            value={valConfirmPassword}
            onChangeText={handleConfirmPasswordChange}
            ref={(input) => {
              let thirdTextInput = input;
            }}
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Votre mot de passe doit faire au moins 8 caractères
            </Text>
          </Animatable.View>
        )}
        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            {' '}
            En signant vous acceptez les{' '}
          </Text>
          <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
            {' '}
            Terms of service
          </Text>
          <Text style={styles.color_textPrivate}> et</Text>
          <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
            {' '}
            Privacy policy
          </Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={onSubmit}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: '#fff' }]}>
                S'inscrire
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {iscreate !== null ? (
            <TouchableOpacity
              onPress={() => {
                loginHandle(valEmail, valPassword);
              }}
              style={[
                styles.signIn,
                { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: '#009387' }]}>
                Se connecter
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.signIn,
                { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: '#009387' }]}>
                Se connecter
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    </ScrollView>
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
