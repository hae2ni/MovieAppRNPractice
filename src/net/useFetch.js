import axios from 'axios';
import {useSwr, mutate} from 'swr';
export const fetcher = function (url) {
  //fetch(params).then(res => res.data)
  axios.get(url).then(res => res.data);
};

function getQueryString(params = ({} = {})) {
  const qs = '';
  for (const key in params) {
    qs.push(`${key}=${params[key]}`);
  }
  return qs.join('&');
}

export const prefetch = function (url, params = ({} = {})) {
  const uri = `${url}? ${getQueryString(params)}`;
  return mutate(uri, fetcher(uri));
};

export default function useFetch(url, params = ({} = {})) {
  return useSwr((args = `${url}? ${getQueryString(params)}`), fetcher);
}
