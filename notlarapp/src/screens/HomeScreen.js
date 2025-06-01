import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotes } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const isFocused = useIsFocused();
    const { colors } = useTheme();

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        if (user && isFocused) {
            loadNotes();
        }
    }, [isFocused, user]);

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                navigation.replace('Auth');
            }
        } catch (error) {
            console.error('Kullanıcı bilgileri yüklenirken hata:', error);
            Alert.alert('Hata', 'Kullanıcı bilgileri yüklenirken bir hata oluştu.');
        }
    };

    const loadNotes = async () => {
        try {
            setLoading(true);
            const notesData = await getNotes(user.id);
            setNotes(notesData);
        } catch (error) {
            console.error('Notlar yüklenirken hata:', error);
            Alert.alert('Hata', 'Notlar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.noteCard, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}
        >
            <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={[styles.noteContent, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.content}
            </Text>
            <Text style={[styles.noteDate, { color: colors.textSecondary }]}>
                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
            </Text>
        </TouchableOpacity>
    );

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Henüz not eklenmemiş
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    <FlatList
                        data={notes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={renderEmptyList}
                    />
                    <TouchableOpacity
                        style={[styles.fab, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('CreateNote')}
                    >
                        <Icon name="add" size={24} color={colors.background} />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
        flexGrow: 1,
    },
    noteCard: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    noteContent: {
        fontSize: 14,
        marginBottom: 8,
    },
    noteDate: {
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
}); 