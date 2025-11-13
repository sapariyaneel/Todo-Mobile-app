import { View, Text } from 'react-native'
import React from 'react'

const cards = () => {
  return (
    <View className="flex space-x-2 flex-row gap-5 items-center justify-center mt-8 mx-6">
              <View className="bg-blue-300/30 p-5 rounded-xl text-center items-center flex-1">
                <Text className="font-bold text-3xl text-blue-700">12</Text>
                <Text className="text-1xl font-semibold text-blue-700">Total</Text>
              </View>
              <View className="bg-green-300/30 p-5 rounded-xl text-center items-center flex-1">
                <Text className="font-bold text-3xl text-green-700">8</Text>
                <Text className="text-1xl font-semibold text-green-700">Done</Text>
              </View>
              <View className="bg-orange-300/30 p-5 rounded-xl text-center items-center flex-1">
                <Text className="font-bold text-3xl text-orange-700">4</Text>
                <Text className="text-1xl font-semibold text-orange-700">
                  Pending
                </Text>
              </View>
            </View>
  )
}

export default cards