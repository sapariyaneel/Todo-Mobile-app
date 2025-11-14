import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Plus } from 'lucide-react-native';

type Props = {
  onAdd: (text: string) => void;
};

const Newtask: React.FC<Props> = ({onAdd}) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    const trimmed = task.trim();
    if(!trimmed) return;
    onAdd(trimmed)
    setTask('')
    Keyboard.dismiss();
  }

  return (
    <View className="flex flex-row items-center justify-center mt-5 gap-3">
      <TextInput
        className="bg-gray-300/50 rounded-xl h-12 px-3 border border-gray-400/40 w-3/5"
        placeholder="Add New Task"
        value={task}
        onChangeText={setTask}
        returnKeyType='done'
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity
        onPress={handleAdd}
        className="bg-blue-600 p-2 rounded-lg w-1/4 h-12 flex flex-row items-center justify-center"
      >
        <Plus color="white" size={23} />
        <Text className="text-white ml-1 text-lg font-bold">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Newtask;
