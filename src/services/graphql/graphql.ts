import { storage } from '@/App';
import { instance } from '../instance';
import { ResponseSchema } from './type';
import { get } from 'lodash';
import { REFRESH_TOKEN_STRING } from './graphqlString/login';
import { Asset } from 'react-native-image-picker';

export const callGraphql = async (
  query: string,
  variables: object,
  dataObject: string = '',
  headers: any = undefined,
  isAuthenticatedRequest: boolean = false,
) => {
  try {
    let postCall = await instance.post('graphql', {
      headers: headers ?? [],
      json: { query, variables },
    });

    let response: ResponseSchema = await postCall.json();

    if (response.errors) {
      if (isAuthenticatedRequest && response.errors[0].message === 'Expired') {
        const accessToken = await refreshToken();

        const newHeaders = {
          ...headers,
          Authorization: 'Bearer ' + accessToken,
        };

        postCall = await instance.post('graphql', {
          headers: newHeaders,
          json: { query, variables },
        });
        response = await postCall.json();
      } else throw new Error(response.errors[0].message);
    }
    return get(response.data, dataObject);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

async function refreshToken(): Promise<string> {
  try {
    const data = await callGraphql(
      REFRESH_TOKEN_STRING,
      {
        authInput: {
          refresh_token: storage.getString('refreshToken'),
        },
      },
      'refreshToken',
    );

    storage.set('accessToken', data?.access_token);
    storage.set('refreshToken', data?.refresh_token);
    return data?.access_token;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
}

export const callGraphqlWithUpload = async (
  query: string,
  variables: object,
  files: Array<Asset>,
  dataObject: string = '',
  headers: any = undefined,
  isAuthenticatedRequest: boolean = true,
) => {
  try {
    let imageIndex = 0;
    let videoIndex = 0;
    let imageVariables: any = [];
    let videoVariables: any = [];

    const map: any = {};

    files.map<Record<string, string[]>>((file, index): any => {
      if (file.type?.includes('image')) {
        imageVariables.push(null);
        map[`${index}`] = [`variables.images.${imageIndex}`];
        imageIndex++;
      } else if (file.type?.includes('video')) {
        videoVariables.push(null);
        map[`${index}`] = [`variables.videos.${videoIndex}`];
        videoIndex++;
      }
    }, {});

    const operations = {
      query,
      variables: {
        ...variables,
        images: imageVariables,
        videos: videoVariables,
      },
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(map));
    files.map((item, index) => {
      formData.append('' + index, {
        uri: item.uri,
        type: item.type,
        name: item.fileName,
      });
    });

    let postCall = await instance.post('graphql', {
      headers: headers ?? [],
      body: formData,
    });

    let response: ResponseSchema = await postCall.json();

    if (response.errors) {
      if (isAuthenticatedRequest && response.errors[0].message === 'Expired') {
        const accessToken = await refreshToken();

        const newHeaders = {
          ...headers,
          Authorization: 'Bearer ' + accessToken,
        };

        postCall = await instance.post('graphql', {
          headers: newHeaders,
          json: { query, variables },
        });
        response = await postCall.json();
      } else throw new Error(response.errors[0].message);
    }
    return get(response.data, dataObject);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
