import { StyleSheet, Text, TouchableOpacity, View, Modal, SafeAreaView, FlatList, KeyboardAvoidingView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ToDoList = ({ list, updateList }) => {
    const [todoVisible, setTodoVisible] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    const completedCount = list.todos.filter(todo => todo.completed).length;
    const taskCount = list.todos.length;
    
    const toggleTodoCompleted = (index) => {
        const updatedTodos = list.todos.map((todo, idx) => 
            idx === index ? { ...todo, completed: !todo.completed } : todo
        );
        updateList({ ...list, todos: updatedTodos });
    };

    const addTodo = () => {
        if (newTodo.trim().length > 0) {
            const updatedTodos = [...list.todos,{ title: newTodo, completed: false }];
            updateList({ ...list, todos: updatedTodos });
            setNewTodo("");
        } else {
            alert("Task name cannot be empty");
        }
    };

    return (
        <View>
            <Modal animationType='slide' visible={todoVisible}>
                <TouchableOpacity style={{ alignItems: 'flex-end', backgroundColor: Colors.white }} onPress={() => setTodoVisible(false)}>
                    <AntDesign name='close' size={20} color={Colors.black} style={{ margin: 8 }} />
                </TouchableOpacity>
                <SafeAreaView style={styles.container}>
                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.listCount}>{completedCount} of {taskCount} completed</Text>
                        </View>
                    </View>
                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todos}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            renderItem={({ item, index }) => (
                                <View style={styles.todoContainer}>
                                    <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
                                        <Ionicons name={item.completed ? 'square' : 'square-outline'} color={'grey'} size={30} style={{ width: 32 }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: item.completed ? 'grey' : Colors.black, fontFamily: Colors.medium, fontSize: 18, textDecorationLine: item.completed ? "line-through" : "none" }}>
                                        {item.title}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior='padding'>
                        <TextInput 
                            style={[styles.input, { borderColor: list.color ,fontFamily:Colors.medium}]} 
                            value={newTodo} 
                            onChangeText={text => setNewTodo(text)} 
                            placeholder="Add a new task"
                            placeholderTextColor={Colors.black}
                        />
                        <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={addTodo}>
                            <AntDesign name={'plus'} size={30} color={Colors.white} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
            <TouchableOpacity
                style={[styles.listContainer, { backgroundColor: list.color }]}
                onPress={() => setTodoVisible(true)}
            >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                <View >
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{taskCount - completedCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ToDoList;

const styles = StyleSheet.create({
    listContainer: {paddingVertical: 32, paddingHorizontal: 16, borderRadius: 6, marginHorizontal: 12, alignItems: 'center', width: 200},
    listTitle: { fontSize: 24,fontFamily: Colors.semiBold, color: Colors.white, marginBottom: 18},
    count: {fontSize: 40,fontFamily: Colors.semiBold,color: Colors.white},
    subtitle: { fontSize: 12, fontFamily: Colors.medium, color: Colors.white},
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white},
    section: { flex: 1,alignSelf: 'stretch'},
    header: { justifyContent: 'flex-end', marginLeft: 64, borderBottomWidth: 3 },
    title: { fontSize: 24, fontFamily: Colors.semiBold, color: Colors.black, marginBottom: 8 },
    listCount: { fontSize: 16, fontFamily: Colors.regular, color: Colors.black },
    footer: { paddingHorizontal: 32, flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, height: 50, borderWidth: StyleSheet.hairlineWidth, borderRadius: 6, marginRight: 8, paddingHorizontal: 8, padding: 16,color:Colors.black },
    addTodo: { borderRadius: 4, padding: 10, alignItems: 'center', justifyContent: 'center' },
    todoContainer: { paddingVertical: 16, flexDirection: 'row', alignItems: 'center' }
})
