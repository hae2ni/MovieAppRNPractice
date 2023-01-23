import React, {useCallback, useEffect} from 'react';
import BoxOfficeItem from '../components/BoxOfficeItem';
import axios from 'axios';
import useFetch, {prefetch} from '../net/useFetch';
import Paragraph from '../components/ui/Paragraph';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function BoxOffice() {
  const url =
    'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  const {data, error} = useFetch(
    url,
    (params = {
      key: 'bb4881b8d562d9187648f76284e6f14c',
      targetDt: '20220222',
    }),
  );

  useEffect(() => {
    if (!data) return;
    const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || [];

    (async function () {
      for (const rank of ranks) {
        await prefetch(
          'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json',
          {
            key: 'bb4881b8d562d9187648f76284e6f14c',
            movieCd: rank.movieCd,
          },
        );
      }
    })();
  }, [data]);

  if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>;
  if (!data) return <ActivityIndicator />;

  const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || [];

  return (
    <>
      {ranks.map(item => (
        <BoxOfficeItem navigation={navigation} key={item.rnum} data={item} />
      ))}
    </>
  );
}
