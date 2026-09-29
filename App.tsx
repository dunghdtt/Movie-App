import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Switch,
  RefreshControl,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';


const API_URL = 'https://6abb553eb2118ed7abb840b3.mockapi.io/movies';

function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false); 

//2
  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.log('Lỗi gọi API:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMovies();
      setLoading(false);
    };
    loadData();
  }, []);
//6
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

//3c
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (!movie) return;
      if (Platform.OS === 'web') {
        window.alert(movie.title); 
      } else {
        Alert.alert('Phim đã chọn', movie.title);
      }
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
//1b
    <SafeAreaView>
      <View>
{/*1c*/ }
        <Text>Movie App</Text>
        <View>
{/*5a*/ }
          <Text >Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>
{/*2c*/ }
      {loading ? (
        <View >
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={{ marginTop: 8 }}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          key={String(numColumns)} //5c
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns} //5b
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={handleSelect}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text >Không có phim nào</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

//1a
export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}


  