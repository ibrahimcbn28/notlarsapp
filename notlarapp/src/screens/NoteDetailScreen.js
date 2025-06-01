import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { getNote, deleteNote } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NoteDetailScreen({ route, navigation }) {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const { noteId } = route.params;
    const { colors } = useTheme();

    useEffect(() => {
        loadNote();
    }, [noteId]);

    const loadNote = async () => {
        try {
            const noteData = await getNote(noteId);
            setNote(noteData);
        } catch (error) {
            console.error('Not yüklenirken hata:', error);
            Alert.alert('Hata', 'Not yüklenirken bir hata oluştu.');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigation.navigate('EditNote', { note });
    };

    const handleDelete = () => {
        if (!noteId) {
            console.error('Not ID\'si bulunamadı');
            Alert.alert('Hata', 'Not ID\'si bulunamadı');
            return;
        }

        Alert.alert(
            'Notu Sil',
            'Bu notu silmek istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            console.log('Not siliniyor:', noteId);
                            const result = await deleteNote(noteId);
                            console.log('Silme sonucu:', result);
                            if (result) {
                                Alert.alert('Başarılı', 'Not başarıyla silindi', [
                                    {
                                        text: 'Tamam',
                                        onPress: () => navigation.goBack()
                                    }
                                ]);
                            } else {
                                throw new Error('Not silinemedi');
                            }
                        } catch (error) {
                            console.error('Not silinirken hata:', error);
                            Alert.alert('Hata', error.message || 'Not silinirken bir hata oluştu.');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleEdit}
                        disabled={loading}
                    >
                        <Icon name="edit" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.headerButton, { marginLeft: 15 }]}
                        onPress={() => {
                            console.log('Silme butonuna tıklandı');
                            handleDelete();
                        }}
                        disabled={loading}
                    >
                        <Icon name="delete" size={24} color={colors.error} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, loading, colors, note]);

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!note) {
        return null;
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {note.title}
                </Text>
                <Text style={[styles.date, { color: colors.textSecondary }]}>
                    {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                </Text>
                <Text style={[styles.noteContent, { color: colors.text }]}>
                    {note.content}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        marginBottom: 20,
    },
    noteContent: {
        fontSize: 16,
        lineHeight: 24,
    },
    headerButtons: {
        flexDirection: 'row',
        marginRight: 10,
    },
    headerButton: {
        marginLeft: 15,
    },
}); 