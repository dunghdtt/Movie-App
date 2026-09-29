import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// 3a
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
  const ratingText = `⭐ ${Number(movie.rating).toFixed(1)}`;

  return (
    // 3c
    <TouchableOpacity
      testID="movie-card"
      activeOpacity={0.7}
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
     
      <View style={isTile && styles.posterWrapTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile ? styles.posterTile : styles.posterRow]}
        />
        {/* 4b*/}
        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      
      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>

        {/* 4a */}
        {!isTile && (
          <>
            <Text style={styles.genre}>{movie.genre}</Text>
            <Text style={styles.year}>Năm: {movie.year}</Text>
            <Text style={styles.rating}>{ratingText}</Text>
          </>
        )}

        <Text style={styles.status}>
          {movie.isShowing ? 'Đang chiếu' : 'Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

//  4c
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTile: {
    flexDirection: 'column',
    width: '48%', 
    padding: 0,
    overflow: 'hidden',
  },
  poster: {
    backgroundColor: '#ddd',
  },
  posterRow: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  posterWrapTile: {
    width: '100%',
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  infoTile: {
    flex: 0,
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  genre: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  year: {
    fontSize: 13,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
  },
});

// 3d
export default React.memo(MovieCard);