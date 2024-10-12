import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Colors';

const TodoModal = ({ closeModal, list }) => {
 
  
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 20, right: 20 }}
                onPress={closeModal}
            >
                <AntDesign name='close' size={20} color={Colors.black} />
            </TouchableOpacity>
            <View>
                <View style={{backgroundColor:'yellow'}}>
                    <Text style={{ color: 'black',fontSize:30 }}></Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TodoModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    }
});
