import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Plus } from 'lucide-react-native';

const Newtask = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAdd = () => {
    if (!task.trim()) return;
    setTasks(prev => [...prev, task.trim()]);
    setTask('');
  };

  return (
    <View className="flex flex-row items-center justify-center mt-4 gap-3">
      <TextInput
        className="bg-gray-300/50 rounded-xl h-12 px-3 border border-gray-400/40 w-3/5"
        placeholder="Add New Task"
        value={task}
        onChangeText={setTask}
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
