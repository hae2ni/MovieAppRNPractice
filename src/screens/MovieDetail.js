import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import Row from '../components/Row';
import Paragraph from '../components/ui/Paragraph';
import axios from 'axios';
import useFetch from '../net/useFetch';

export default function MovieDetail({route, navigation}) {
  const url =
    'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json';
  const {data, error} = useFetch(
    url,
    (params = {
      key: 'bb4881b8d562d9187648f76284e6f14c',
      movieCd: route.params.movieCd,
    }),
  );

  useEffect(
    ((effect = () => {
      if (data) {
        navigation.setOptions({
          title: detail.movieNm,
        });
      }
    }),
    (deps = [data])),
  );

  if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>;
  if (!data) return <ActivityIndicator />;

  const detail = data.movieInfoResult.movieInfo;

  return (
    <>
      <Row>
        <Paragraph>영화명 : {detail.movieNm} </Paragraph>
      </Row>

      <Row>
        <Paragraph>상영시간 : {detail.showTm}분 </Paragraph>
      </Row>
      <Row>
        <Paragraph>개봉일 : {detail.openDt} </Paragraph>
      </Row>
      <Row>
        <Paragraph>
          감독:
          {detail.directors.map(director => (
            <Link
              key={director.peopleNm}
              onPress={() => {
                navigation.navigate('SearchResult', {
                  peopleNm: director.peopleNm,
                });
              }}>
              {director.peopleNm}
            </Link>
          ))}
        </Paragraph>
      </Row>
      <Row>
        <Paragraph>
          출연:
          {detail.actors.map(actor => (
            <Link
              key={actor.peopleNm}
              onPress={() => {
                navigation.navigate('SearchResult', {peopleNm: actor.peopleNm});
              }}>
              {actor.peopleNm}
            </Link>
          ))}
        </Paragraph>
      </Row>
    </>
  );
}
