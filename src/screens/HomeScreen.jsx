import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import MovieSlider from '../components/MovieSlider';
import MovieCard from '../components/MovieCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
import {
  upcomingMovies,
  popularMovies,
  movieDetails,
  options,
} from '../api/apicalls';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import useAsyncStorageListener from '../hooks/useAsyncStorageListener';

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies, options);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};
const getPopulerMoviesList = async () => {
  try {
    let response = await fetch(popularMovies, options);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};
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

const getFavoriteMoviesList = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites !== null) {
      const favoritesArray = JSON.parse(favorites);

      const movieDetailsPromises = favoritesArray.map(async (movieId) => {
        const movieDetails = await getMovieDetails(movieId);
        return movieDetails.results;
      });

      const favoriteMoviesDetails = await Promise.all(movieDetailsPromises);
      return favoriteMoviesDetails;
    }
    return [];
  } catch (error) {
    console.error('Error getting favorites:', error);
  }
}

export default function HomeScreen({ navigation }) {
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState(undefined);
  const { storageUpdated } = useAsyncStorageListener();

  useEffect(() => {
    getUpcomingMoviesList().then((data) => {
      setUpcomingMoviesList(data.results);
    });
    getPopulerMoviesList().then((data) => {
      setPopularMoviesList(data.results);
    });
    getFavoriteMoviesList().then((data) => {
      setFavoriteMoviesList(data);
    });
  }, [storageUpdated]);

  return (
    <ScrollView className="flex-1 bg-black">
      <SearchBar navigation={navigation}/>
      <MovieSlider movies={popularMoviesList} navigation={navigation} />
      <Text className="font-semibold text-2xl text-white px-9 py-7">Upcoming Movies</Text>
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item) => item?.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={{ gap: 36 }}
        renderItem={({ item, index }) => {
          if (!item?.originalTitleText) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + 36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item?.id });
              }}
              isFavSection={false}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == popularMoviesList?.length - 1 ? true : false}
              title={item.titleText.text}
              imagePath={item.primaryImage ? item.primaryImage.url : '/img/no-image.png'}
              movieId={item?.id}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />


      <Text className="font-semibold text-2xl text-white px-9 py-7">Favorite</Text>
      <FlatList
        data={favoriteMoviesList}
        keyExtractor={(item) => item?.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={{ gap: 36 }}
        renderItem={({ item, index }) => {
          if (!item?.originalTitleText) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + 36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item?.id });
              }}
              isFavSection={true}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == favoriteMoviesList?.length - 1 ? true : false}
              title={item.titleText.text}
              imagePath={item.primaryImage ? item.primaryImage.url : '/img/no-image.png'}
              movieId={item?.id}
            />
          );
        }}
      />
    </ScrollView>
  );
}
