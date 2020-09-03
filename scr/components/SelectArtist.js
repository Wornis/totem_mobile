import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from '@apollo/client';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import {
  Container, Header, Left,
  Body, Right, Title,
  Item, Input, Spinner,
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
  const [artists, setArtists] = useState([]);
  const [queryArtists, { loading, error, data }] = useLazyQuery(SELECT_ARTISTS);

  useEffect(() => {
    if(data && data.findArtists) setArtists(data.findArtists);
  }, [data]);
  if (error) return <Text>Error :(</Text>;

  const showFlatList = () => {
    if (loading) return <Spinner color='green' />;
    if (error) return <Text>Cannot fetch suggestions</Text>;
    return <FlatList
      style={styles.flatListContainer}
      data={artists}
      renderItem={({item}) => <Text style={styles.flatListItem}>{item.name}</Text>}
    />;
  };

  const onChangeText = (query) => {
    if (query.length) return queryArtists({ variables: { query } });
    return setArtists([]);
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
          <Input
            onChangeText={onChangeText}
            placeholder='Input artist name..'
          />
        </Item>
        { showFlatList() }
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
  },
  flatListContainer: {
    marginTop: 5,
  },
  flatListItem: {
    textAlign: 'center',
    padding: 5,
    fontSize: 18,
    height: 44,
    width: 250
  },
});
