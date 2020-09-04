import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Item, Input, Spinner } from 'native-base';

const SELECT_ARTISTS = gql` 
  query selectArtists($query: String!) {
    artists(query: $query) {
      id,
      name
    }
  }
`;

export default function SelectArtists({ navigation }) {
  const [query, setQuery] = useState('');
  const [queryArtists, { loading, error, data }] = useLazyQuery(SELECT_ARTISTS);

  useEffect(() => {
    if (query.length) queryArtists({ variables: { query } });
  }, [query]);
  if (error) return <Text>Error :(</Text>;

  const showFlatList = () => {
    if (loading) return <Spinner color="green" />;
    if (error) return <Text>Cannot fetch suggestions</Text>;
    return (
      <FlatList
        style={styles.flatListContainer}
        data={query.length && data ? data.artists : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ArtistDetails', { ...item })}>
            <Text style={styles.flatListItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Item rounded style={styles.inputItem}>
        <Input
          onChangeText={(q) => setQuery(q)}
          placeholder="Input artist name.."
        />
      </Item>
      { showFlatList() }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
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
    width: 250,
  },
});
