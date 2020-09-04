import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Text,
} from 'react-native';
import { Spinner } from 'native-base';

const GET_ARTIST_ALBUMS = gql` 
  query getArtistAlbums($artistId: String!) {
    artistAlbums(artistId: $artistId) {
      id,
      name,
      releaseDate,
      totalTracks,
      uri,
      albumImages {
        width,
        height,
        url,
      }
    }
  }
`;

export default function ArtistDetails({ route }) {
  const { id: artistId, name: artistName } = route.params;
  const { loading, error, data } = useQuery(GET_ARTIST_ALBUMS, { variables: { artistId } });
  console.log(data);
  if (loading) return <Spinner color="green" />;
  if (error) return <Text>Cannot fetch artist albums</Text>;

  return <Text>test</Text>;
}
