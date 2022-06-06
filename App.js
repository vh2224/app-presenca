import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/router';
import { UserProvider } from './src/context/userContext';

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}
