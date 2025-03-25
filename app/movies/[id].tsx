import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetail } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';

const MovieInfo = ({ label, value }: { label: string, value?: string | number | undefined }) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className="text-md text-light-300">{label}</Text>
    <Text className='text-sm text-light-100 font-bold mt-2'>{value}</Text>
  </View>
)

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: movie,
    loading,
    error
  } = useFetch(() => fetchMovieDetail(id as string));

  console.log("Check movie detail:: ", movie);

  return (
    <View className='flex-1 bg-primary'>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[500px]' resizeMode='cover' />
        </View>

        <View className='flex-col items-start justify-center mt-3 mb-20'>
          <Text className='text-xl text-white font-bold'>{movie?.title}</Text>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-sm text-light-300'>{movie?.release_date?.split("-")[0]}</Text>
            <Text className='text-sm text-light-300'>{movie?.runtime} min</Text>
          </View>

          <View className='flex-row items-center gap-x-1 bg-dark-100 px-2 py-1 rounded-md mt-2'>
            <Ionicons name="star" size={16} color="yellow" />
            <Text className='text-sm text-white font-bold'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-sm text-light-200'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <View>
            <MovieInfo label='Overview' value={movie?.overview} />
            <MovieInfo label='Production Countries' value={movie?.production_countries?.map((country: any) => country.name).join(' - ') || "N/A"} />
            <MovieInfo label='Genres' value={movie?.genres?.map((genre: any) => genre.name).join(' - ') || "N/A"} />
            <View className=''>
              <MovieInfo label='Budget' value={`$${(movie?.budget || 0) / 1_000_000} million`} />
              <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue || 0) / 1_000_000} million`} />
              <MovieInfo label='Production Companies' value={movie?.production_companies?.map((company: any) => company.name).join(' - ') || "N/A"} />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={router.back} className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className='text-sm text-white font-semibold'>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetail