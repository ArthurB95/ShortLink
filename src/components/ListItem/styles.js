import styled from "styled-components";
import { Platform } from "react-native";

export const ContainerButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.21);
  margin: 7px 15px;
  padding: 12px;
  border-radius: 7px;
`;

export const Item = styled.Text`
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
`;
