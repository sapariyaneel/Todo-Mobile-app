import { View } from 'react-native';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import popup from './components/Popup-modal'
import Header from './components/header';
import Cards from './components/cards';
import Filter from './components/filter'
import Newtask from './components/Newtask';
import TaskCard from './components/TaskCard';

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
