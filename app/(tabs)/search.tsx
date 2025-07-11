import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";

import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "center", gap: 20, marginVertical: 5 }}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center">
              <Image source={icons.logo} className="w-12 h-10"/>
            </View>

            <View className="my-5">
              <SearchBar placeholder="Search movies..." value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)} />
            </View>

            {
              loading && (
                <ActivityIndicator size="large" color="#0000ff" className="my-3" />
              )
            }

            {
              error && (
                <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>
              )
            }

            {
              !loading && !error && searchQuery.trim() && movies?.length > 0 && (
                <Text className="text-lg text-white font-bold">
                  Search Results for{' '}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )
            }
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-300">
                {searchQuery.trim() ? "No movies found" : "Search for a movie or TV show"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
