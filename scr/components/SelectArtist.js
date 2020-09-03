import React, { useState } from "react";
import { useLazyQuery, gql } from '@apollo/client';
import { Text, StyleSheet, View } from 'react-native';
import {
  Container, Header, Left,
  Body, Right, Button,
  Icon, Title, Content,
  Item, Input
} from 'native-base';

const SELECT_ARTISTS = gql` 
  query selectArtists($query: String!) {
    findArtists(query: $query) {
      id,
      name
    }
  }
`;

export default function SelectArtists() {
  const [artists, setArtists] = useState(null);
  const [getArtists, { loading, error, data }] = useLazyQuery(SELECT_ARTISTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  console.log(data);
  if (data && data.artists) {
    setArtists(data.artists);
  }

  const retrieveArtists = (query) => {
    return getArtists({ variables: { query } })
  };

  return (
    <Container>
      <Header>
        <Left/>
        <Body>
          <Title>Find your artist</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        <Item rounded style={styles.inputItem}>
          <Input onChangeText={retrieveArtists} placeholder='Input artist name..'/>
        </Item>
      </View>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 25,
    alignItems:'center',
  },
  inputItem: {
    width: 250,
  }
});
