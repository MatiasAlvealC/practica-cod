import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { userProp } from '../types/userProps' 

interface UserFormProps {
    formData: userProp;
    setFormData: (data: userProp) => void;
    mostrarPassword: boolean;
    setMostrarPassword: (show: boolean) => void;
    calendarioVisible: boolean;
    setCalendarioVisible: (visible: boolean) => void; 
    tooltipVisible: boolean;
    setTooltipVisible: (visible: boolean) => void;
    handleSubmit: () => void;
    handleConfirm: (date: Date) => void;
}

const UserForm: React.FC<UserFormProps> = ({
    formData,
    setFormData,
    mostrarPassword,
    setMostrarPassword,
    calendarioVisible,
    setCalendarioVisible,
    tooltipVisible,
    setTooltipVisible,
    handleSubmit,
    handleConfirm,
}): React.JSX.Element => {

     // Función para verificar los requisitos de la contraseña
    const handleEndEditing = () => {
        if (!/\d/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            // Si la contraseña no cumple los requisitos, mostrar el tooltip
            setTooltipVisible(true);
        } else {
            // Si la contraseña cumple los requisitos, ocultar el tooltip
            setTooltipVisible(false);
        }
    };

    return(
        <View style={styles.container}>
            <Image
            source={require('../assets/logo_sherut.png')} 
            style={styles.logo}
            />
            <Text style={styles.label}>Nombre de usuario:</Text>
            <TextInput
                style={styles.input}
                value={formData.nombre}
                onChangeText={text => setFormData({ ...formData, nombre: text })}
                placeholder="Ingresa tu nombre"
            />
            
            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                style={styles.input}
                value={formData.correo}
                onChangeText={text => setFormData({ ...formData, correo: text })}
                placeholder="Ingresa tu correo"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Contraseña:</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    value={formData.password ?? ''}
                    onChangeText={text => setFormData({ ...formData, password: text })}
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={!mostrarPassword}
                    onEndEditing={handleEndEditing} // Solo cuando termine de escribir
                />
                <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
                    <Image
                        source={require('../assets/eye.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setCalendarioVisible(true)}
            >
                <Text>{formData.fechaDeNacimiento ? formData.fechaDeNacimiento.toLocaleDateString() : 'Selecciona tu fecha de nacimiento'}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={calendarioVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setCalendarioVisible(false)}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
        borderRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingRight: 8, // Aumentamos padding para evitar que el botón se superponga al borde
    },
    passwordInput: {
        height: 40,
        width: '50%', // Controla el ancho de la casilla de contraseña
        paddingHorizontal: 8,
    },
    showButton: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20, // Redondea el botón
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        width: 24, // Ajusta el tamaño del ícono
        height: 24,
    },
    logo: {
        width: '100%', // Ancho de la imagen
        height: 100, // Alto de la imagen
        resizeMode: 'contain', // Asegura que la imagen se ajuste bien al tamaño
        alignSelf: 'center', // Centra la imagen horizontalmente
        marginBottom: 16, // Espacio entre la imagen y el título
    },
    dateInput: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    tooltipOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    tooltip: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tooltipText: {
        color: '#000',
        fontSize: 14,
    },
});

export default UserForm;