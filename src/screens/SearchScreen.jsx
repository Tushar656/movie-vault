import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import MovieCard from '../components/MovieCard';
import {
    searchMovies,
    options,
} from '../api/apicalls';

const { width } = Dimensions.get('window');

const getMoviesList = async (keyWord) => {
    try {
        let response = await fetch(searchMovies(keyWord), options);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error(
            ' Something went wrong in getNowPlayingMoviesList Function',
            error,
        );
    }
};

const SearchScreen = ({ navigation, route }) => {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        (async () => {
            const tempMovieData = await getMoviesList(route.params.searchQuery);
            console.log(tempMovieData);
            setMovieList(tempMovieData.results);
          })();
    }, []);
    return (
        <FlatList
        className='bg-black'
            data={movieList}
            keyExtractor={(item) => item.id}
            bounces={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, padding: 16 }}
            renderItem={({ item, index }) => {
                if (!item.originalTitleText) {
                    return (
                        <View
                            style={{
                                width: width / 2 - 24,
                            }}
                        />
                    );
                }
                return (
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 8,
                        }}
                    >
                        <MovieCard
                            cardFunction={() => {
                                navigation.push('MovieDetails', { movieid: item.id });
                            }}
                            isFavSection={true}
                            cardWidth={width / 2 - 24}
                            title={item.titleText.text}
                            imagePath={item.primaryImage ? item.primaryImage.url : '/img/no-image.png'}
                            movieId={item.id}
                        />
                    </View>
                );
            }}
        />
    );
};

export default SearchScreen;
