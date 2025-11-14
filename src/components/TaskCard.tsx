import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import { Trash } from 'lucide-react-native'

const TaskCard = () => {
  return (
    <View className='flex flex-row mt-8 mx-auto w-4/5 bg-gray-400 p-5 rounded-lg'>
       <Text className='font-semibold text-xl'>This is the test</Text>
       <TouchableOpacity className='flex justify-self-end'>
       <Trash />
       </TouchableOpacity>
    </View>
  )
}

export default TaskCard