import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

//3a
export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTile = layout === 'tile';

  // 3b
  const ratingText = `${Number(movie.rating).toFixed(1)}`;

  return (
    // 3c
    <TouchableOpacity
      testID="movie-card"
      activeOpacity={0.7}
      
      onPress={() => onSelect(movie.id)}
    >
     
      <View >
        <Image
          source={{ uri: movie.poster }}
          
        />
        {/* 4b*/}
        {isTile && (
          <View >
            <Text >{ratingText}</Text>
          </View>
        )}
      </View>

      
      <View >
        <Text  numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>

        {/* 4a */}
        {!isTile && (
          <>
            <Text>{movie.genre}</Text>
            <Text>Năm: {movie.year}</Text>
            <Text>{ratingText}</Text>
          </>
        )}

        <Text >
          {movie.isShowing ? 'Đang chiếu' : 'Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

//  4c

// 3d
export default React.memo(MovieCard);