import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity, Text, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('https://my-aircnc.herokuapp.com', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        });
    }, []);

    function handleBack() {
        navigation.navigate('Login', { back: true });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList tech={tech} />)}
            </ScrollView>

            <TouchableOpacity onPress={handleBack} style={styles.button}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontSize: 15
    },
});