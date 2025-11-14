import { View, Text } from 'react-native'
import React from 'react'

const filter = () => {
  return (
    <View className="flex flex-row mt-5 ml-8 gap-4 ">
              <Text className="px-5 py-2 bg-gray-300/50 rounded-3xl">All</Text>
              <Text className="px-5 py-2 bg-gray-300/50 rounded-3xl">Completed</Text>
              <Text className="px-5 py-2 bg-gray-300/50 rounded-3xl">Pending</Text>
    </View>
  )
}

export default filter