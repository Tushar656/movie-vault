import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import {TMDB_API_KEY} from '@env'

const { width, height } = Dimensions.get('window');

const movies = [
  {
    id: '1',
    name: 'Inception',
    description: 'A skilled thief is given a chance at redemption if he can successfully perform inception, the planting of an idea into a target\'s subconscious.',
    rating: '8.8',
    image: 'https://img.asmedia.epimg.net/resizer/v2/ST2R2PANVJBLJHO72OKRYOWQKY.jpg?auth=041625b6706fdb347bb4d1cc6dcc57179602aa30fa4d8eb5cb5415e219868fd4&width=644&height=362&smart=true'
  },
  {
    id: '2',
    name: 'The Dark Knight',
    description: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    rating: '9.0',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTYWoYAqNV7uPa3I7QVjmMdNOtJ9T-oEIfg&s'
  },
];

export default function MovieSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Pressable>
      <ImageBackground
        source={{ uri: item.image }}
        style={{ width, height: height / 2 }}
        className="flex justify-end"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
          style={{ height: '100%', width: '100%' }}
          className="p-4 justify-end"
        >
          <Text className="text-white text-2xl font-bold mb-1">{item.name}</Text>
          <Text numberOfLines={3} className="text-white text-base mb-1">
            {item.description}
          </Text>
          <Text className="text-white text-lg font-semibold">{`Rating: ${item.rating}/10`}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={movies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
}
