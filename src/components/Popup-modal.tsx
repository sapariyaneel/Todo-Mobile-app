// components/TaskDetailModal.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { X, Edit, Trash2, Save } from "lucide-react-native";

type Task = {
  id: string | number;
  text: string;
  done?: boolean;
  // add other fields you might need (createdAt, dueDate, notes, etc.)
};

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onDelete: (taskId: Task["id"]) => void;
  onSave: (updatedTask: Task) => void;
};

export default function TaskDetailModal({ visible, task, onClose, onDelete, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (task) {
      setEditText(task.text);
      setIsEditing(false);
    }
  }, [task, visible]);

  if (!task) return null;

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return; // don't save empty
    onSave({ ...task, text: trimmed });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View
            className="w-full max-w-md bg-white rounded-2xl p-5 shadow-lg"
            style={{ ...(Platform.OS === "android" ? { elevation: 10 } : {}) }}
          >
            <View className="flex-row justify-between items-start">
              <Text className="text-xl font-bold">Task Details</Text>
              <TouchableOpacity onPress={onClose} className="p-1">
                <X size={20} />
              </TouchableOpacity>
            </View>

            <View className="mt-4">
              {isEditing ? (
                <TextInput
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                  placeholder="Edit task"
                  placeholderTextColor="#9ca3af"
                  className="border border-gray-200 rounded-lg p-3 text-base min-h-[80px]"
                />
              ) : (
                <Text className="text-base text-gray-800">
                  {task.text}
                </Text>
              )}

              {/* You can show more task metadata here */}
              <Text className="text-sm text-gray-500 mt-3">Status: {task.done ? "Done" : "Pending"}</Text>
            </View>

            <View className="flex-row justify-between mt-6">
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setIsEditing(prev => !prev)}
                  className="flex-row items-center px-3 py-2 rounded-lg border border-gray-200 mr-2"
                >
                  {isEditing ? <Save size={16}/> : <Edit size={16}/>}
                  <Text className="ml-2 font-medium">{isEditing ? "Save" : "Edit"}</Text>
                </TouchableOpacity>

                {isEditing && (
                  <TouchableOpacity
                    onPress={() => {
                      setEditText(task.text);
                      setIsEditing(false);
                    }}
                    className="flex-row items-center px-3 py-2 rounded-lg border border-gray-200"
                  >
                    <Text className="font-medium">Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                onPress={handleDelete}
                className="flex-row items-center px-3 py-2 rounded-lg bg-red-600"
              >
                <Trash2 color="white" size={16}/>
                <Text className="ml-2 text-white font-semibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
