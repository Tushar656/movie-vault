import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorageListener = () => {
  const [storageUpdated, setStorageUpdated] = useState(0);

  const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, value);
    setStorageUpdated(prev => prev + 1);
  };

  const removeItem = async (key) => {
    await AsyncStorage.removeItem(key);
    setStorageUpdated(prev => prev + 1);
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
    setStorageUpdated(prev => prev + 1);
  };

  return { storageUpdated, setItem, removeItem, clearStorage };
};

export default useAsyncStorageListener;
