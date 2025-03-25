import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

interface TrendingCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  index: number;
}

const TrendingCard = ({
  movie: { id, title, poster_path },
  index,
}: TrendingCardProps) => {
  console.log("Check movie:: ", title);
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-2.5 rounded-full px-2 py-1">
          <MaskedView
            maskElement={
              <Text className="text-6xl text-white font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.bgGradient}
              className="w-16 h-16 rounded-lg"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text className="text-sm text-light-200 font-bold mt-2" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
