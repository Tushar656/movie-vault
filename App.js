import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import { SafeAreaView } from 'react-native';
import Global from './Global';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={[Global.AndroidSafeArea]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MovieDetails" component={DetailsScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
