import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmationModalProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-5 rounded-lg shadow-lg">
                    <Text className="text-base mb-5">{message}</Text>
                    <TouchableOpacity  className="bg-blue-500 py-2 px-4 rounded-lg items-center"  onPress={onClose}>
                        <Text className="text-white text-lg">Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


export default ConfirmationModal;
