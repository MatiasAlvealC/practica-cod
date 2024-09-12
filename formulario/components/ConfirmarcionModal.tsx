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
        <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
            <Text style={styles.modalMessage}>{message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default ConfirmationModal;
