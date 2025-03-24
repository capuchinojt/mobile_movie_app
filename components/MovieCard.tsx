import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  // console.log("Check poster path:: ", poster_path);
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>{title}</Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Ionicons name="star" size={16} color="yellow" />
          <Text className="text-sm text-white ml-1">{Math.round(vote_average / 2)}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium">{release_date?.split("-")[0]}</Text>
          <Text className="text-sm font-medium text-light-300 uppercase">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
