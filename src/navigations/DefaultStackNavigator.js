import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoxOffice from '../screens/BoxOffice';
import MovieDetail from '../screens/MovieDetail';
import SearchResult from '../screens/SearchResult';

const Stack = createNativeStackNavigator();

export default function DefaultStackNavigator() {
  retrun(
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={'BoxOffice'}
          component={BoxOffice}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'MovieDetail'} component={MovieDetail} />
        <Stack.Screen name={'SearchResult'} component={SearchResult} />
      </Stack.Navigator>
    </>,
  );
}
