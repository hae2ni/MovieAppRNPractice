import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {FlatList, Pressable} from 'react-native';
import Paragraph from '../components/ui/Paragraph';

export default function SearchResult() {
  const [list, setList] = useState((initialState = []));
  useFocusEffect(
    useCallback(
      (callback = () => {
        const url =
          'https://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json';
        axios.get(
          url,
          (config = {
            params: {
              key: 'bb4881b8d562d9187648f76284e6f14c',
              peopleNm: route.params.peopleNm,
            },
          })
            .then(res => setList(res.data.peopleListResultpeopleList))
            .catch(console.warn),
        );
      }),
      (deps = []),
    ),
  );
  return (
    <FlatList
      data={list}
      keyExtractor={item => item.peopleCd}
      renderItem={data => (
        <Pressable onPress={() => {}}>
          <Paragraph>
            {data.item.peopleNm}
            <Text>({data.item.filmoNames})</Text>
          </Paragraph>
        </Pressable>
      )}></FlatList>
  );
}
