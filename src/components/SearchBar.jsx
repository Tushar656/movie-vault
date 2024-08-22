import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        if (searchQuery.trim()) {
          navigation.push('SearchScreen', { searchQuery });
        }
      };
  return (
    <View className="absolute top-0 left-0 right-0 flex-row items-center p-1 z-20 bg-black opacity-60">
      <View className="flex-row flex-1 items-center bg-transparent border border-white/50 rounded-full px-3 py-2">
        <TextInput
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="flex-1 text-white bg-transparent"
        />
        <Icon onPress={handleSearch} name="search" size={20} color="white" className="ml-2" />
      </View>
    </View>
  );
};

export default SearchBar;
