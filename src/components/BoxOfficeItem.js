import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import Paragraph from './ui/Paragraph';
import styled from 'styled-components';

const Container = styled.View`
  padding: 11px;
`;

export default function BoxOfficeItem({data}) {
  const navigation = useNavigation();
  let intenIcon = '⏺';
  const parsedRankInten = parseInt(data.rankInten, {radix: 10});
  if (parsedRankInten < 0) {
    intenIcon = '🔽';
  } else if (parsedRankInten > 0) {
    intenIcon = '🔼';
  }

  const navigateMovieDetail = useCallback(
    ((callback = () => {
      navigation.navigate('MovieDetail', {movieCd: data.movieCd});
    }),
    (deps = [navigation, data])),
  );

  return (
    <Pressable onPress={navigateMovieDetail}>
      <Container>
        <Row>
          <Paragraph>
            <Paragraph>{data.rank}</Paragraph>
            <Paragraph>
              {intenIcon} {data.rankInten}
            </Paragraph>
            <Paragraph>{data.movieNm}</Paragraph>
            <Paragraph>{data.rankOldAndNew === 'NEW' ? '🆕' : ''}</Paragraph>
          </Paragraph>
        </Row>
      </Container>
    </Pressable>
  );
}
