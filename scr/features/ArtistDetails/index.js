import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Text } from 'react-native';
import {
  Spinner,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Container,
  Content,
} from 'native-base';

const GET_ARTIST_ALBUMS = gql` 
  query getArtistAlbums($artistId: String!) {
    albums(artistId: $artistId) {
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

export default function ArtistDetails({ route, navigation }) {
  const { id: artistId } = route.params;
  const { loading, error, data } = useQuery(GET_ARTIST_ALBUMS, { variables: { artistId } });

  if (loading) return <Spinner color="green" />;
  if (error) return <Text>Cannot fetch artist albums</Text>;

  const renderAlbumItem = (album) => (
    <ListItem
      thumbnail
      key={album.id}
      onPress={() => navigation.navigate('AlbumDetails', {
        albumId: album.id,
        name: album.name,
      })}
    >
      <Left>
        <Thumbnail square source={{ uri: album.albumImages[0].url }} />
      </Left>
      <Body>
        <Text>{ album.name }</Text>
        <Text note numberOfLines={1}>
          Release Date:
          {' '}
          {album.releaseDate}
        </Text>
        <Text note numberOfLines={1}>
          Total Tracks:
          {' '}
          {album.totalTracks}
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>{'>'}</Text>
        </Button>
      </Right>
    </ListItem>
  );

  return (
    <Container>
      <Content>
        <List>
          { data.albums.map(renderAlbumItem) }
        </List>
      </Content>
    </Container>
  );
}
