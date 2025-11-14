import { View, Text } from 'react-native'
import React from 'react'
import { Bookmark } from 'lucide-react-native'

const header = () => {
  return (
    <View className="border-b border-gray-600/20 pb-5">
              <View className=" flex items-center justify-start ml-5 flex-row">
                <View className="bg-blue-600 p-2 rounded-lg flex flex-row items-center justify-center">
                  <Bookmark color="white" size={25} />
                </View>
                <Text className="font-bold m-3 text-3xl">Todo List</Text>
              </View>
            </View>
  )
}

export default header