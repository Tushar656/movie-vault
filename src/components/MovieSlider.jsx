import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MovieSlider({navigation, movies}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.push('MovieDetails', {movieid: item.id})}>
      <ImageBackground
        source={{ uri: item.primaryImage? item.primaryImage.url : item.primaryImage }}
        style={{ width, height: height / 2 }}
        className="flex justify-end"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
          style={{ height: '100%', width: '100%' }}
          className="p-4 justify-end"
        >
          <Text className="text-white text-2xl font-bold mb-1">{item.originalTitleText.text}</Text>
          <Text numberOfLines={3} className="text-white mb-1 text-sm">
            {item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odit optio vitae veritatis accusantium libero debitis totam deserunt officia minima. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, rem?
          </Text>
          <Text className="text-white text-lg font-semibold">{`Rating: 4.6/5`}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View className="bg-black mb-4" style={{ maxHeight: height / 2 }}>
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
