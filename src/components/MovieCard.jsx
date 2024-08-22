import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAsyncStorageListener from '../hooks/useAsyncStorageListener';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieCard = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setItem } = useAsyncStorageListener();

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const favoritesArray = JSON.parse(favorites);
        if (favoritesArray.includes(props.movieId)) {
          setIsFavorite(true); 
        }
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = [];

      if (favorites !== null) {
        favoritesArray = JSON.parse(favorites);
      }

      if (favoritesArray.includes(props.movieId)) {
        const updatedFavorites = favoritesArray.filter(id => id !== props.movieId);
        setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        favoritesArray.push(props.movieId);
        setItem('favorites', JSON.stringify(favoritesArray));
        setIsFavorite(true); 
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  return (
    <View className='relative'>
      {!props.isFavSection && <TouchableOpacity className="absolute top-1 right-1 z-10" onPress={toggleFavorite}>
        <Icon
          name="heart"
          size={30}
          color={isFavorite ? "red" : "white"}
        />
      </TouchableOpacity>}
      
      <TouchableOpacity onPress={() => props.cardFunction()}>
        <View
          className={`flex bg-black 
              ${props.shouldMarginatedAround ? 'm-3' : ''} 
              ${props.shoudlMarginatedAtEnd ? (props.isFirst ? 'ml-6' : props.isLast ? 'mr-6' : '') : ''}`
          }
        >
          <Image
            className="aspect-[2/3] rounded-xl"
            style={{ width: props.cardWidth }}
            source={{ uri: props.imagePath }}
          />

          <Text style={{ width: props.cardWidth }} className="text-center text-white text-sm py-2.5">
            {props.title ? props.title.split(':')[0] : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;
