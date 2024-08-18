import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MovieSlider from '../components/MovieSlider';

export default function HomeScreen({navigation}) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <MovieSlider/>
    </View>
  );
}

