import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import CInput from '../../components/CInput';
import CButton from '../../components/CButton';
import ShowMessage from '../../components/ShowMessage';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { emailChange, passwordChange, setMsg } from '../../redux/reducers/authReducers';

import { onLogin } from '../../redux/actionCreators/authActions';

import type { IUser } from '../../types/appTypes';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { email, password, loading, statusCode, msg }: IUser = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const [messgae, setMessage] = useState("");

  const onPressLogin = async () => {
    await dispatch(onLogin());
  };



  useEffect(() => {
    setMessage(msg as unknown as string);
    return () => {
      setTimeout(() => {
        setMessage("");
        dispatch(setMsg(""));
      }, 4000);

    }
  }, [msg, setMessage, dispatch]);

  return (
    <View>
      <CInput
        value={email || ''}
        label={'Email'}
        onChange={(text: string) => {
          dispatch(emailChange(text));
        }}
        placeholder={'radheykrishna@domain.com'}
      />
      <CInput
        secureTextEntry={true}
        value={password || ''}
        label={'Password'}
        onChange={(text: string) => {
          dispatch(passwordChange(text));
        }}
        placeholder={'Password'}
      />
      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <CButton

          disabled={Boolean(!(email && password))}
          onPress={() => {
            onPressLogin();
          }}
          title="Login"
        />
      )}
      <Text style={{ color: 'grey', fontSize: 18 }}>
        {' '}
        {"Don't have account?"}{' '}
      </Text>
      <CButton
        onPress={() => {
          navigation.navigate('Register');
        }}
        title="Register"
      />
      {messgae && <ShowMessage
        message={messgae as unknown as string}
        statusCode={statusCode as unknown as number}
      />}
    </View>
  );
}
