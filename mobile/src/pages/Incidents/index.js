import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function loadIncidents() {
        if(isLoading) return;

        if(totalIncidents > 0 && incidents.length == totalIncidents) return;        
        
        const res = await api.get('incidents', {
            params: { page }
        });
    
        setLoading(true);
        setIncidents([... incidents, ... res.data]);
        setTotalIncidents(res.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }    

    useEffect(() => {
        loadIncidents();
    }, []);

    function navigateToDetail(incident) {
        navigation.navigate('Details', { incident })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
                </Text>
            </View>            
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.desription}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incidentItem}>
                        <Text style={styles.incidentItemProperty}>ONG:</Text>
                        <Text style={styles.incidentItemValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentItemProperty}>CASO:</Text>
                        <Text style={styles.incidentItemValue}>{incident.title}</Text>

                        <Text style={styles.incidentItemProperty}>VALOR:</Text>
                        <Text style={styles.incidentItemValue}>
                            {incident.value}</Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View> 
                )}
            />
        </View>
    );
}