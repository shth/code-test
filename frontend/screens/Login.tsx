import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import APIClient from '../apiClient';

export default function Login({ navigation }) {
  const [isError, setIsError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const login = () => {
    console.log('login')
    console.log(APIClient.get)
    APIClient.post(
      "/login",
      {
        email,
        password,
      }
    )
    .then(response => {
      console.log('response', response)
      setIsError(false);
      navigation.navigate("Consultations")
    }).catch((error) => {
      setIsError(true);
      console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.email} placeholder={'email'} onChangeText={email => setEmail(email)}/>
      <TextInput style={styles.password} placeholder={'password'} onChangeText={pw => setPassword(pw)}/>
      <Button onPress={login} title="Login"/>
      {isError && <Text>Email or password incorrect</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  email: {
    borderWidth: 1,
    height: 48,
    width: '80%',
  },
  password: {
    borderWidth: 1,
    height: 48,
    width: '80%',
  },
  error: {
    borderColor: "red"
  }
});
