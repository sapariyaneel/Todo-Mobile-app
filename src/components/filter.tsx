import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  selected: 'All' | 'Completed' | 'Pending'
  onSelect: (v: 'All' | 'Completed' | 'Pending') => void
}

const filter: React.FC<Props> = ({selected, onSelect}) => {
  
  const {t} = useTranslation()

  const tabs: {key: Props['selected']; labelKey: string}[] = [
    {key: 'All', labelKey: 'filter.all'},
    {key: 'Completed', labelKey: 'filter.completed'},
    {key: 'Pending', labelKey: 'filter.pending'},
  ]


  return (
    <View className="flex flex-row mt-5 ml-8 gap-4 ">
      {tabs.map(tab => {
        const active = tab.key === selected;
        return (
          <TouchableOpacity 
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            className={`px-5 py-2 rounded-3xl ${active ? 'bg-blue-700' : 'bg-gray-300/50'}`}
          >
            <Text className={`${active ? 'text-white' : 'text-black'}`}>
              {t(tab.labelKey)}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default filter