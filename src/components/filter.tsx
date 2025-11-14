import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
  selected: 'All' | 'Completed' | 'Pending'
  onSelect: (v: 'All' | 'Completed' | 'Pending') => void
}

const filter: React.FC<Props> = ({selected, onSelect}) => {
  
  const tabs: {key: Props['selected']; label: string}[] = [
    {key: 'All', label: 'All'},
    {key: 'Completed', label: 'Completed'},
    {key: 'Pending', label: 'Pending'},
  ]

  return (
    <View className="flex flex-row mt-5 ml-8 gap-4 ">
      {tabs.map(t => {
        const active = t.key === selected;
        return (
          <TouchableOpacity 
            key={t.key}
            onPress={() => onSelect(t.key)}
            className={`px-5 py-2 rounded-3xl ${active ? 'bg-blue-700' : 'bg-gray-300/50'}`}
          >
            <Text className={`${active ? 'text-white' : 'text-black'}`}>
              {t.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default filter