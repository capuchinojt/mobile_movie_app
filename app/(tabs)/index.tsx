import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { FlatList } from "react-native";

import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetch(() => fetchPopularMovies());

  const ListHeaderComponent = () => (
    <>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
      <SearchBar
        onPress={() => router.push('/search')}
        placeholder="Search for a movie or TV show"
      />
      {
        popularMovies && (
          <View>
            <View className="mt-10">
              <Text className="text-lg text-white font-bold">Popular Movies</Text>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-3" />}
              data={popularMovies}
              renderItem={({ item, index }) => {
              console.log("Check item:: ", item);
                return (
                  <TrendingCard movie={item} index={index} />
                )
              }}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )
      }
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0 h-full" />
      <View className="flex-1 px-5">
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : moviesError ? (
          <Text>{moviesError.message}</Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "flex-start", gap: 20, paddingRight: 5, marginBottom: 10 }}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{ paddingBottom: 100 }}
            className="mt-2 pb-32"
            scrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}