import { View, Text } from 'react-native'
import React from 'react'
import { Bookmark } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

const header = () => {

  const {t} = useTranslation()

  return (
    <View className="border-b border-gray-600/20">
              <View className=" flex items-center justify-start ml-5 flex-row my-3">
                <View className="bg-blue-600 p-2 rounded-lg flex flex-row items-center justify-center">
                  <Bookmark color="white" size={25} />
                </View>
                <Text className="font-bold m-3 text-3xl w-full">{t('headerTitle')}</Text>
              </View>
            </View>
  )
}

export default header