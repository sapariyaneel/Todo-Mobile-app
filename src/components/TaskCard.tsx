import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { Check, Edit2, EllipsisVertical, Trash } from 'lucide-react-native';
import type { Task } from '../../App';
import { useTranslation } from 'react-i18next';

type Props = {
  task: Task;
  onDelete: () => void;
  onSave: (newText: string) => void;
  onToggle: () => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCard: React.FC<Props> = ({ task, onDelete, onSave, onToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const [confirmOpen, setConfirmOpen] = useState(false)

  React.useEffect(() => {
    setDraft(task.text);
  }, [task.text]);

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMenuOpen(v => !v);
  };

  const startEdit = () => {
    setMenuOpen(false);
    setEditing(true);
  };
  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(task.text);
    setEditing(false);
  };

  const handleToggleCompleted = () => {
    setMenuOpen(false);
    onToggle();
  };

  const {t} = useTranslation()

  return (
    <View className="mx-auto w-[87%] mt-5">
      <View className="flex flex-row items-center justify-between h-13 border border-gray-400/50 p-5 rounded-xl bg-gray-300/20">
        <View className="flex-1">
          {editing ? (
            <TextInput
              value={draft}
              onChangeText={setDraft}
              className="text-lg bg-white/0 px-2 py-1 rounded"
              multiline
              autoFocus
            />
          ) : (
            <Text
              className={`text-xl ${
                task.completed ? 'line-through text-gray-400' : 'text-black'
              }`}
            >
              {task.text}
            </Text>
          )}
        </View>

        <View className='ml-3'>
          <TouchableOpacity onPress={toggleMenu} className='p-1'>
            <EllipsisVertical />
          </TouchableOpacity>
        </View>
        </View>

        {menuOpen && !editing && (
          <View className='bg-white border border-gray-200 rounded-xl mt-2 w-[87%] self-center p-2 shadow'>
            <TouchableOpacity
              onPress={handleToggleCompleted}
              className='flex flex-row items-center px-3 py-2 rounded hover:opacity-90'
              >
                <Check size={18}/>
                <Text className='ml-3 text-base w-full'>
                  {task.completed ? t('taskcard.markIncomplete') : t('taskcard.markComplete')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={startEdit}
                className='flex flex-row items-center px-3 py-2 rounded mt-1'
              >
                <Edit2 size={18} />
                <Text className='ml-3 text-base w-full'>
                  {t('taskcard.edit')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMenuOpen(false)
                  setConfirmOpen(true)
                }}
                className='flex flex-row items-center px-3 py-2 rounded mt-1'
              >
                <Trash size={18} color='red' />
                <Text className='ml-3 text-base text-red-600'>
                  {t('taskcard.delete')}
                </Text>
              </TouchableOpacity>
          </View>
        )}

        {editing && (
          <View className='flex-row items-center justify-end mt-2 gap-2 space-x-2 w-[87%] self-center'>
            <TouchableOpacity
              onPress={saveEdit}
              className='bg-green-600 px-4 py-2 rounded-lg'
            >
              <Text className='text-white font-semibold'>
                {t('taskcard.save')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelEdit}
              className='bg-gray-300 px-4 py-2 rounded-lg'
            >
              <Text className='text-black font-semibold'>
                {t('taskcard.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={confirmOpen}
          transparent
          animationType='fade'
          onRequestClose={() => setConfirmOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setConfirmOpen(false)}>
            <View className='flex-1 bg-black/40 justify-center items-center '>
              <View className='bg-white w-11/12 max-w-md p-4 rounded-xl'>
                <Text className='text-lg font-semibold'>
                  {t('taskcard.confirmTitle')}
                </Text>
                <Text className='mt-2 text-gray-600'>
                  {t('taskcard.confirmBody')}
                </Text>

                <View className='flex-row justify-end mt-4'>
                  <TouchableOpacity
                    onPress={() => setConfirmOpen(false)}
                    className='px-4 py-2 rounded-lg bg-gray-300 mr-2'
                  >
                    <Text>
                      {t('taskcard.cancel')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setConfirmOpen(false)
                      onDelete()
                    }}
                    className='px-4 py-2 rounded-lg bg-red-600'
                  >
                    <Text className='text-white'>
                      {t('taskcard.delete')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
  );
};

export default TaskCard;
