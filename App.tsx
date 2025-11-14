import { FlatList, StatusBar, Text, View } from 'react-native';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/components/header';
import Cards from './src/components/cards';
import Filter from './src/components/filter'
import Newtask from './src/components/Newtask';
import TaskCard from './src/components/TaskCard';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [ refreshing, setRefreshing ] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All')

  const addTask = (text: string) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,9)}`,
      text,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (id: string, newText: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? {...t, text: newText} : t)));
  };

  const toggleCompleted = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? {...t, completed: !t.completed} : t)));
  };

  const STORAGE_KEY = 'TASKS_V1'

  const loadTasks = useCallback(async () => {
    try{
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      if(raw) {
        const parsed: Task[] = JSON.parse(raw)
        setTasks(parsed)
      }
    } catch (err) {
      console.warn('Failed to load tasks from storage', err)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!loaded) return

    const save = async () => {
      try{
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      } catch (err) {
        console.warn('Failed to save tasks to storage', err)
      }
    }
    save()
  }, [tasks, loaded])

  useEffect(() => {
    loadTasks();
  }, [loadTasks])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadTasks()
    setTimeout(() => setRefreshing(false), 300)
  }, [loadTasks])

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return t.completed === true
    return t.completed === false;
  })

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle='dark-content'/>
      <View className='flex-1 bg-white'>
        <Header />
        <Cards 
          total={tasks.length}
          completed={tasks.filter(t => t.completed).length}
          pending={tasks.filter(t => !t.completed).length}
        />
        <Filter selected={filter} onSelect={setFilter} />
        <Newtask onAdd={addTask} />
        {tasks.length === 0 ? (
          <View className='mt-10 items-center'>
            <Text className='text-gray-400 text-lg'>No tasks yet</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{paddingBottom: 120}}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({item}) => (
              <TaskCard
              task={item}
              onDelete={() => deleteTask(item.id)}
              onSave={(newText: string) => updateTask(item.id, newText)}
              onToggle={() => toggleCompleted(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
