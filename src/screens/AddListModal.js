import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Colors';

const AddListModal = ({ closeModal, addlist }) => {
  const backgroundColors = ["#08a5af", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D88559", "#D85963"];
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const createTodo = () => {
    const list = { name, color, todos: [] };
    
    if (name.length > 0) {
      addlist(list);
      setName("");
      closeModal();
    } else {
      alert("List name cannot be empty");
    }
  };

  const renderColors = () => {
    return backgroundColors.map((color, index) => (
      <TouchableOpacity
        key={`${color}-${index}`}
        style={[styles.colorSelect, { backgroundColor: color }]}
        onPress={() => setColor(color)}
      />
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 20, right: 20 }}>
        <AntDesign name='close' size={20} color={Colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.title}>Create ToDo List</Text>
        <TextInput
          style={styles.input}
          placeholder='List Name'
          placeholderTextColor={Colors.black}
          onChangeText={text => setName(text)}
          value={name}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {renderColors()}
        </View>
        <TouchableOpacity style={[styles.create, { backgroundColor: color }]} onPress={createTodo}>
          <Text style={{ color: Colors.white, fontFamily: Colors.medium, fontSize: 18 }}>Create!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AddListModal;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontFamily: Colors.semiBold, color: Colors.black, marginBottom: 16, alignSelf: 'center' },
  input: { borderColor: Colors.lightblue, borderWidth: 1, height: 50, borderRadius: 6, paddingHorizontal: 16, fontSize: 16, fontFamily: Colors.regular, color: Colors.black },
  create: { marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 6 },
  colorSelect: { width: 30, height: 30, borderRadius: 4 }
});