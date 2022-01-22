import React, { useState, useEffect, useRef } from "react";

import { Modal, ActivityIndicator } from "react-native";
import {
  Container,
  Title,
  ListLinks,
  ContainerEmpty,
  WarningText,
} from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { getLinksSave, deleteLink } from "../../utils/storeLinks";

import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import ListItem from "../../components/ListItem";
import ModalLink from "../../components/ModalLink";
import LottieView from "lottie-react-native";

export default function MyLinks() {
  const isFocused = useIsFocused();

  const [links, setLinks] = useState([]);
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLinks() {
      const result = await getLinksSave("ShortLinks");
      setLinks(result);
      setLoading(false);
    }
    getLinks();
  }, [isFocused]);

  function handleItem(item) {
    setData(item);
    setModalVisible(true);
  }

  async function handleDelete(id) {
    const result = await deleteLink(links, id);
    setLinks(result);
  }

  return (
    <Container>
      <StatusBarPage barStyle="light-content" backgroundColor="#132742" />
      <Menu />
      <Title>Meus Links</Title>

      {loading && (
        <ContainerEmpty>
          <ActivityIndicator color="#FFF" size={25} />
        </ContainerEmpty>
      )}

      {!loading && links.length === 0 && (
        <ContainerEmpty>
          <WarningText>Você ainda não possui nenhum link</WarningText>
          <LottieView
            source={require("../../assets/notfound.json")}
            autoPlay={true}
            loop={true}
            style={{width: 200, height: 200, marginTop: 30}}
            resizeMode="cover"
          />
        </ContainerEmpty>
      )}
      <ListLinks
        data={links}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ListItem
            data={item}
            selectedItem={handleItem}
            deleteItem={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalLink onClose={() => setModalVisible(false)} data={data} />
      </Modal>
    </Container>
  );
}
