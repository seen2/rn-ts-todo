import { ScrollView, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import CInput from "../../components/CInput";
import CButton from "../../components/CButton";
import CCard from "../../components/CCard";
import ShowMessage from "../../components/ShowMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { emailChange, passwordChange, nameChange, setMsg } from "../../redux/reducers/authReducers";

import { onRegister } from "../../redux/actionCreators/authActions";

import type { IUser } from "../../types/appTypes";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const { email, password, statusCode, name, msg, loading }: IUser = useAppSelector(
    (state: RootState) => state.auth
  );
  const [messgae, setMessage] = useState(msg);
  const [validationMessage, setValidationMessage] = useState({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();



  const onPressRegister = async () => {
    await dispatch(onRegister());
  }
  useEffect(() => {
    const validateInputs = () => {
      const namePattern = /\w{3,} \w{3,}/, emailPattern = /\w{3,}\@\w{3,}\.\w{3,}/, passwordPattern = /.{6,}/;
      const newValidationMessgae = { name: "", email: "", password: "" };
      if (!namePattern.test(name as unknown as string)) {
        newValidationMessgae.name = "First Name and Last Name should have min three letters";
      } else {
        newValidationMessgae.name = "";
      }
      if (!emailPattern.test(email as unknown as string)) {
        newValidationMessgae.email = "Email should be correctly formated";
      } else {
        newValidationMessgae.email = "";
      }
      if (!passwordPattern.test(password as unknown as string)) {
        newValidationMessgae.password = "Password must have six letters";
      } else {
        newValidationMessgae.password = "";
      }


      setValidationMessage(newValidationMessgae);

    }
    validateInputs();
    setMessage(msg as unknown as string);
    return () => {
      validateInputs();
      setTimeout(() => {
        setMessage("");
        dispatch(setMsg(""));
      }, 4000);

    }
  }, [msg, setMessage, dispatch, email, name, password]);



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {messgae && <ShowMessage message={messgae} statusCode={statusCode as unknown as number} />}

          <CInput value={name || ""}
            label={"Name"}
            onChange={(text: string) => { dispatch(nameChange(text)) }}
            placeholder={"Radhey krishna"} />
          <Text style={{ color: "grey", margin: 7 }} >{validationMessage.name}</Text>
          <CInput
            value={email || ""}
            label={"Email"}
            onChange={(text: string) => { dispatch(emailChange(text)) }}
            placeholder={"radheykrishna@domain.com"} />
          <Text style={{ color: "grey", margin: 7 }}>{validationMessage.email}</Text>
          <CInput
            secureTextEntry={true}
            value={password || ""}
            label={"Password"}
            onChange={(text: string) => { dispatch(passwordChange(text)) }}
            placeholder={"Password"} />
          <Text style={{ color: "grey", margin: 7 }}>{validationMessage.password}</Text>
          {loading ? (
            <ActivityIndicator color="#0000ff" size="large" />
          ) : <CButton
            disabled={Boolean((validationMessage.password.length > 1 || validationMessage.name.length > 1 || validationMessage.name.length > 1))}
            onPress={() => { onPressRegister() }} title="Register" />}
          <Text> {"Already have account?"} </Text>
          <CButton onPress={() => { navigation.navigate("Login") }} title="Login" />
          <CCard >
            <Text style={{ color: "white", textAlign: "center", fontSize: 21 }} >
              In This App
              {"\n You can Create your own account.\nYou can Create and Manage your personal Tasks.\n You can Delete and Uodate your personal Tasks. \n Note: All your data will stored in the cloud.\n You can access it from anywhere anytime."}
            </Text>
          </CCard>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}