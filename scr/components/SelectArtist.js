import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Text, StyleSheet, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';

const SELECT_ARTISTS = gql` 
  query findArtists {
    findArtists(query: "Kesha") {
      id,
      name
    }
  }
`;

export default function SelectArtists() {
  const { loading, error, data } = useQuery(SELECT_ARTISTS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  console.log(data);
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
          <Input placeholder='  Input artist name..'/>
        </Item>
      </View>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  inputItem: {
    width: 250,
  }
});
