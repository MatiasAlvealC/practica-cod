import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { userProp } from '../types/userProps'; 

import { formatoRUT} from '../utils/rutUtils'; 

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
            setTooltipVisible(true);
        } else {
            setTooltipVisible(false);
        }
    };


    return(
        <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-8">
            <Image
                source={require('../assets/logo_sherut.png')} 
                className="w-full h-24 mb-4"
                resizeMode="contain"
            />
            
            {/* Nombre de usuario */}
            <Text className="text-lg mb-2 text-left w-full text-black dark:text-white">Nombre de usuario:</Text>
            <TextInput
                className="h-10 w-11/12 border border-black dark:border-white px-2 mb-4 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                value={formData.nombre}
                onChangeText={text => setFormData({ ...formData, nombre: text })}
                placeholder="Ingresa tu nombre"
                placeholderTextColor={formData.nombre ? undefined : 'gray'} // Cambia el color del placeholder en modo oscuro
            />

            {/* RUT*/}
            <Text className="text-lg mb-2 text-left w-full text-black dark:text-white">RUT:</Text>
            <TextInput
                className="h-10 w-11/12 border border-black dark:border-white px-2 mb-4 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                value={formData.rut}
                onChangeText={text => setFormData({ ...formData, rut: formatoRUT(text) })}
                placeholder="11111111-1"
                maxLength={10}  // Para limitar a 9 dígitos + guion
                placeholderTextColor="gray"
            />

            {/* Correo Electrónico */}
            <Text className="text-lg mb-2 text-left w-full text-black dark:text-white">Correo Electrónico:</Text>
            <TextInput
                className="h-10 w-11/12 border border-black dark:border-white px-2 mb-4 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                value={formData.correo}
                onChangeText={text => setFormData({ ...formData, correo: text })}
                placeholder="Ingresa tu correo"
                keyboardType="email-address"
                placeholderTextColor={formData.correo ? undefined : 'gray'}
            />

            {/* Contraseña */}
            <Text className="text-lg mb-2 text-left w-full text-black dark:text-white">Contraseña:</Text>
            <View className="flex-row items-center w-11/12 border border-black dark:border-white rounded mb-4 pr-2 bg-white dark:bg-gray-800">
                <TextInput
                    className="h-10 w-11/12 px-2 text-black dark:text-white"
                    value={formData.password ?? ''}
                    onChangeText={text => setFormData({ ...formData, password: text })}
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={!mostrarPassword}
                    onEndEditing={handleEndEditing}
                    placeholderTextColor={formData.password ? undefined : 'gray'}
                />
                <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
                    <Image
                        source={require('../assets/eye.png')}
                        className="w-6 h-6"
                    />
                </TouchableOpacity>
            </View>

            {/* Fecha de Nacimiento */}
            <Text className="text-lg mb-2 text-left w-full text-black dark:text-white">Fecha de Nacimiento:</Text>
            <TouchableOpacity
                className="h-10 w-11/12 border border-black dark:border-white rounded justify-center px-2 mb-4 bg-white dark:bg-gray-800"
                onPress={() => setCalendarioVisible(true)}
            >
            <Text className="text-black dark:text-white">{formData.fechaDeNacimiento ? formData.fechaDeNacimiento.toLocaleDateString() : 'Selecciona tu fecha de nacimiento'}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={calendarioVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setCalendarioVisible(false)}
            />

            {/* Botón de Enviar */}
            <TouchableOpacity className="bg-blue-500 dark:bg-blue-900 py-2 px-4 rounded-full mt-4 w-11/12" onPress={handleSubmit}>
                <Text className="text-white text-lg font-bold text-center">Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserForm;