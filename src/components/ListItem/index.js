import React from "react";

import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ContainerButton, Item, ActionContainer } from "./styles";

import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ListItem({ data, selectedItem, deleteItem }) {

  function rightActions() {
    return (
      <ActionContainer>
        <Feather name="trash" color="#FFF" size={24} onPress={() => deleteItem(data.id)}/>
      </ActionContainer>
    );
  }

  return (
    <View>
      <Swipeable renderRightActions={rightActions}>
        <ContainerButton activeOpacity={0.9} onPress={() => selectedItem(data)}>
          <Feather name="link" color="#FFF" size={24} />
          <Item numberOfLines={1}>{data.long_url}</Item>
        </ContainerButton>
      </Swipeable>
    </View>
  );
}
