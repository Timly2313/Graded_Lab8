import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { CheckSquare, Square, Trash2, Plus } from 'lucide-react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    const text = taskText.trim();
    if (!text) {
      Alert.alert('Empty task', 'Please enter a task before adding.');
      return;
    }

    const newTask = {
      id: Date.now().toString() + Math.floor(Math.random() * 1000),
      text,
      done: false,
    };

    setTasks(prev => [...prev, newTask]);
    setTaskText('');
  };

  const toggleTask = id => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={styles.checkboxTouchable}
      >
        {item.done ? (
          <CheckSquare size={24} color={"#f97316"} />
        ) : (
          <Square size={24} color={"#a855f7"} />
        )}
      </TouchableOpacity>

      {/* Task text */}
      <TouchableOpacity
        style={styles.taskTextWrapper}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Trash2 size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <Text style={styles.title}>Volunteer Task Manager</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter new task"
            value={taskText}
            onChangeText={setTaskText}
            returnKeyType="done"
            onSubmitEditing={addTask}
          />

          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',paddingTop: 10 },
  inner: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#a855f7',
    textAlign: 'center',
  },
  inputRow: { flexDirection: 'row', marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#f97316',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  listContent: { paddingTop: 8, paddingBottom: 40 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fdf4ff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  checkboxTouchable: { marginRight: 8 },
  taskTextWrapper: { flex: 1 },
  taskText: { fontSize: 16, color: '#1f2937' },
  taskTextDone: { textDecorationLine: 'line-through', color: '#9ca3af' },
});