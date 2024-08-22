import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  movieDetails,
  movieRating,
  options,
} from '../api/apicalls';
import Icon from 'react-native-vector-icons/FontAwesome';

const getMovieDetails = async (id) => {
  try {
    let response = await fetch(movieDetails(id), options);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getMovieDetails Function',
      error,
    );
  }
};
const getMovieRating = async (id) => {
  try {
    let response = await fetch(movieRating(id), options);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getMovieDetails Function',
      error,
    );
  }
};

const formatReleaseDate = (day, month, year) => {

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[month - 1];
  return `${day ? day : ''} ${monthName ? monthName : ''} ${year ? year : ''}`;
};

const DetailsScreen = ({ navigation, route }) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieRatingDetail, setMovieRatingDetail] = useState(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData.results);
    })();

    (async () => {
      const tempMovieCastData = await getMovieRating(route.params.movieid);
      setMovieRatingDetail(tempMovieCastData.cast);
    })();
  }, []);

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="absolute top-0 left-0 right-0 flex-row items-center p-1 z-20 opacity-60">
        <TouchableOpacity className="ml-3">
          <Icon name="heart" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <ImageBackground
          source={{
            uri: movieData?.primaryImage?.url,
          }}
          className="w-full aspect-[3072/1727]"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', '#000000']}
            className="h-full"
          >
          </LinearGradient>
        </ImageBackground>
        <Image
          source={{ uri: movieData?.poster_path }}
          className="absolute bottom-0 self-center w-3/5 aspect-[200/300]"
        />
      </View>

      <View className="flex-row items-center justify-center py-4">
        <Icon name="clock-o" size={25} color="white" />
        <Text className="font-medium text-base text-white ml-2">
          2h 30m
        </Text>
      </View>

      <View className="mx-9 my-4">
        <Text className="text-center font-regular text-2xl text-white">
          {movieData?.originalTitleText?.text}
        </Text>
        <Text className="italic text-center font-thin text-base text-white my-4">
          {movieData?.primaryImage?.caption?.plainText}
        </Text>
      </View>

      <View className="mx-6">
        <View className="flex-row items-center gap-2.5">
          <Icon name="star" size={25} color="yellow" />
          <Text className="font-medium text-base text-white mr-10">4.6 (1025)</Text>
          <Text className="font-medium text-sm text-white">
            {formatReleaseDate(movieData?.releaseDate?.day, movieData?.releaseDate?.month, movieData?.releaseYear?.year)}
          </Text>
        </View>
        <Text className="font-light text-base text-white mt-4">
          {movieData?.primaryImage?.caption?.plainText} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit fugiat voluptatibus officiis at! Vel perspiciatis necessitatibus ab suscipit molestiae. Eius placeat tempore repellendus doloremque quod?
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
