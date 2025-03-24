import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ value, placeholder, onPress, onChangeText }: SearchBarProps) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-1'>
      <Ionicons
        name="search-outline"
        color="#fff"
        size={24}
        className=""
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#fff'}
        className='flex-1 text-base text-white ml-2'
      />
    </View>
  )
}

export default SearchBar