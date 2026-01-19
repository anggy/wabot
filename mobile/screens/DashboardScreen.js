import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ setIsLoggedIn }) {
    const [sessions, setSessions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
        fetchSessions();
    }, []);

    const loadUser = async () => {
        const u = await AsyncStorage.getItem('user');
        if (u) setUser(JSON.parse(u));
    };

    const fetchSessions = async () => {
        try {
            const res = await api.get('/sessions');
            setSessions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchSessions();
        setRefreshing(false);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.sessionName}>{item.name}</Text>
                <View style={[
                    styles.badge,
                    { backgroundColor: item.status === 'CONNECTED' ? '#d1fae5' : '#fee2e2' }
                ]}>
                    <Text style={[
                        styles.badgeText,
                        { color: item.status === 'CONNECTED' ? '#065f46' : '#991b1b' }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <Text style={styles.sessionInfo}>ID: {item.id}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.welcomeText}>Welcome, {user?.username}</Text>
                <Text style={styles.creditText}>Credits: {user?.credits || 0}</Text>
            </View>

            <Text style={styles.sectionTitle}>Active Sessions</Text>

            <FlatList
                data={sessions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No sessions found.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingTop: 60, // For Status Bar
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutText: {
        color: '#ef4444',
        fontWeight: 'bold',
    },
    userInfo: {
        padding: 20,
        backgroundColor: '#10b981',
    },
    welcomeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    creditText: {
        color: 'white',
        opacity: 0.9,
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 10,
        color: '#4b5563',
    },
    list: {
        padding: 20,
        paddingTop: 0,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    sessionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    sessionInfo: {
        color: '#9ca3af',
        fontSize: 12,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        color: '#9ca3af',
        marginTop: 20,
    },
});
