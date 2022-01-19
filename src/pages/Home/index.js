import React, { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import {
  ContainerLogo,
  Logo,
  ContainerContent,
  Title,
  Subtitle,
  ContainerInput,
  BoxIcon,
  Input,
  ButtonLink,
  ButtonLinkText,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";

import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import ModalLink from "../../components/ModalLink";
import api from '../../services/api';

export default function Home() {
  const [input, setInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  async function handleShortLink() {
    try {
      const response = await api.post('/shorten', {
        long_url: input
      })

      console.log(response.data)
    } catch {
      alert('Ops! Parece que algo deu errado 😅')
      Keyboard.dismiss();
      setInput('');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#1DDBB9", "#132742"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <StatusBarPage barStyle="light-content" backgroundColor="#1DDBB9" />

        <Menu />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
          enabled={true}
        >
          <ContainerLogo>
            <Logo
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
            />
          </ContainerLogo>

          <ContainerContent>
            <Title>SujeitoLink</Title>
            <Subtitle>Cole seu link para encurtar</Subtitle>

            <ContainerInput>
              <BoxIcon>
                <Feather name="link" size={22} color="#FFF" />
              </BoxIcon>
              <Input
                placeholder="Cole seu link aqui..."
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                value={input}
                onChangeText={(text) => setInput(text)}
              />
            </ContainerInput>

            <ButtonLink onPress={handleShortLink}>
              <ButtonLinkText>Gerar link</ButtonLinkText>
            </ButtonLink>
          </ContainerContent>
        </KeyboardAvoidingView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalLink onClose={() => setModalVisible(false)} />
        </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
