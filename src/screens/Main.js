import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tempData from './tempData';
import ToDoList from '../components/ToDoList';
import AddListModal from './AddListModal';

const Main = () => {
    const [addTodoVisible, setAddTodoVisible] = useState(false);
    
    const [data, setData] = useState(tempData);
    const toggleAddTodoModal = () => {
        setAddTodoVisible(!addTodoVisible);
    };
    const addlist = (list) => {
        setData([...data, list]);
        toggleAddTodoModal();
    };
    const updateList = (updatedList) => {
        setData(data.map(list => list.name === updatedList.name ? updatedList : list));
    };

    return (
        <View style={styles.container}>
            <Modal animationType='slide' visible={addTodoVisible}>
                <AddListModal closeModal={toggleAddTodoModal} data={data} setData={setData} addlist={addlist}/>
            </Modal>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.divider} />
                <Text style={styles.title}>ToDo <Text style={{ color: Colors.lightblue, fontSize: 32, fontFamily: Colors.semiBold }}>Lists</Text></Text>
                <View style={styles.divider} />
            </View>
            <View style={{ marginVertical: 48 }}>
                <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
                    <AntDesign name={'plus'} color={Colors.lightblue} size={16} />
                </TouchableOpacity>
                <Text style={styles.add}>Add List</Text>
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => <ToDoList list={item} updateList={updateList} />}
                />
            </View>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
    divider: { backgroundColor: Colors.lightblue, flex: 1, height: 1, alignSelf: 'center' },
    title: { fontSize: 32, fontFamily: Colors.semiBold, color: Colors.black, paddingHorizontal: 40 },
    addList: { borderWidth: 2, borderColor: Colors.lightblue, borderRadius: 4, padding: 16, justifyContent: 'center', alignItems: 'center' },
    add: { color: Colors.blue, fontFamily: Colors.medium, fontSize: 14, marginTop: 8 }
});
