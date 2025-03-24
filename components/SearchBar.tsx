import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: SearchBarProps) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Ionicons
        name="search-outline"
        color="#fff"
        size={24}
        className=""
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {console.log('changed')}}
        placeholderTextColor={'#fff'}
        className='flex-1 text-base text-white ml-2'
      />
    </View>
  )
}

export default SearchBar