import { View, Text } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  total: number;
  completed: number;
  pending: number;
};

const cards: React.FC<Props> = ({ total, completed, pending }) => {

  const {t} = useTranslation()

  return (
    <View className="flex space-x-2 flex-row gap-5 items-center justify-center mt-8 mx-6">
      <View className="bg-blue-300/30 p-5 rounded-xl text-center items-center flex-1">
        <Text className="font-bold text-3xl text-blue-700">{total}</Text>
        <Text className="text-1xl font-semibold text-blue-700">{t('cards.total')}</Text>
      </View>
      <View className="bg-green-300/30 p-5 rounded-xl text-center items-center flex-1">
        <Text className="font-bold text-3xl text-green-700">{completed}</Text>
        <Text className="text-1xl font-semibold text-green-700">{t('cards.done')}</Text>
      </View>
      <View className="bg-orange-300/30 p-5 rounded-xl text-center items-center flex-1">
        <Text className="font-bold text-3xl text-orange-700">{pending}</Text>
        <Text className="text-1xl font-semibold text-orange-700">{t('cards.pending')}</Text>
      </View>
    </View>
  );
};

export default cards;
