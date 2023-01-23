import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const Components = styled.Text`
  font-size: 16px;
`;

export default function Paragraph({children}) {
  return <Components>{children}</Components>;
}
