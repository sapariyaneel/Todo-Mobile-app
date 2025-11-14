import { View } from 'react-native';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import popup from './src/components/Popup-modal'
import Header from './src/components/header';
import Cards from './src/components/cards';
import Filter from './src/components/filter'
import Newtask from './src/components/Newtask';
import TaskCard from './src/components/TaskCard';

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Header></Header>
        <Cards></Cards>
        <Filter></Filter>
        <Newtask></Newtask>
        <TaskCard></TaskCard>
      </View>
    </SafeAreaView>
  );
};

export default App;
