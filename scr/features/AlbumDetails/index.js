import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Text,
  Linking,
} from 'react-native';
import moment from 'moment';
import {
  Body,
  Container,
  Content,
  List,
  ListItem,
  Right,
  Spinner, Thumbnail,
} from 'native-base';
import spotifyIcon from '../../../assets/spotify_icon.png';

const GET_ALBUM_TRACKS = gql` 
  query getTracks($albumId: String!) {
    tracks(albumId: $albumId) {
      id,
      name,
      duration,
      trackNumber,
      uri
    }
  }
`;

export default function AlbumDetails({ route }) {
  const { albumId } = route.params;
  const { loading, error, data } = useQuery(GET_ALBUM_TRACKS, { variables: { albumId } });

  if (loading) return <Spinner color="green" />;
  if (error) return <Text>Cannot fetch album tracks</Text>;

  const renderTrackItem = (track) => (
    <ListItem
      thumbnail
      key={track.id}
      onPress={() => Linking.openURL(track.uri)}
    >
      <Body>
        <Text>{ track.name }</Text>
        <Text note numberOfLines={1}>
          N°:
          {' '}
          {track.trackNumber}
        </Text>
        <Text note numberOfLines={1}>
          Duration:
          {' '}
          {moment.utc(track.duration).format('mm:ss')}
        </Text>
      </Body>
      <Right>
        <Thumbnail square source={spotifyIcon} />
      </Right>
    </ListItem>
  );

  return (
    <Container>
      <Content>
        <List>
          { data.tracks.map(renderTrackItem) }
        </List>
      </Content>
    </Container>
  );
}
