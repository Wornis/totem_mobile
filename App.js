/* eslint-disable global-require */
import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import SelectArtist from './scr/components/SelectArtist';

const client = new ApolloClient({
  uri: 'http://192.168.0.14:4000/graphql',
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={SelectArtist}
              options={{ title: 'Welcome' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
