import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { MyIcon } from '../../components/MyIcon';
import { API_URL, STAGE } from '@env';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const LoginScreen = () => {
  
  console.log(API_URL, STAGE)
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const {height} = useWindowDimensions();

  const onLogin = async() => {
    if( form.username.length === 0 || form.password.length === 0 ){
      return
    }
    setIsPosting(true)
    const wasSuccessfu1 = await login(form.username, form.password);
    if (wasSuccessfu1) return;
    setIsPosting(false)
      if ( wasSuccessfu1 ) return

      Alert.alert( 'Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Usuario"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.username}
            onChangeText={(username) => setForm({...form, username})}
            accessoryLeft={<MyIcon name="email-outline"/>}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({...form, password})}
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline"/>}
            style={{marginBottom: 10}}
          />
        </Layout>
        <Layout style={{height: 20}} />
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white/>} 
            onPress={onLogin}>
            Ingresar
          </Button>
        </Layout>
        <Layout style={{height: 50}} />
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
