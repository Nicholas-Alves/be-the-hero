import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de R$ ${incident.value}.`

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041"/>
                </TouchableOpacity>
            </View>  

            <View style={styles.incidentItem}>
                <Text style={styles.incidentItemProperty}>ONG:</Text>
                <Text style={styles.incidentItemValue}>{incident.name} ({incident.city}/{incident.uf})</Text>
                
                <Text style={styles.incidentItemProperty}>CASO:</Text>
                <Text style={styles.incidentItemValue}>{incident.title}</Text>
                
                <Text style={styles.incidentItemProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentItemValue}>{incident.description}</Text>

                <Text style={styles.incidentItemProperty}>VALOR:</Text>
                <Text style={[styles.incidentItemValue, {marginBottom: 0}]}>{incident.value}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactBoxTitle}>Salve o dia!</Text>
                <Text style={styles.contactBoxTitle}>Seja o herói desse caso.</Text>
                
                <Text style={styles.contactBoxDescription}>Entre em contato.</Text>

                <View style={styles.groupActions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp} >
                        <Feather name="message-circle" size={36} color="#FFF"/>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail} >
                        <Feather name="mail" size={36} color="#FFF"/>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}