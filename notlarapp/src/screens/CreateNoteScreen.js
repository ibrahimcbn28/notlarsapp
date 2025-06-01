import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { createNote } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function CreateNoteScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Uyarı', 'Başlık ve içerik alanları zorunludur.');
            return;
        }

        try {
            setLoading(true);
            const userData = await AsyncStorage.getItem('user');
            const user = JSON.parse(userData);

            await createNote({
                title: title.trim(),
                content: content.trim(),
            }, user.id);

            navigation.goBack();
        } catch (error) {
            console.error('Not oluşturulurken hata:', error);
            Alert.alert('Hata', 'Not oluşturulurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.scrollView}>
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    placeholder="Not Başlığı"
                    placeholderTextColor={colors.textSecondary}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                    editable={!loading}
                />

                <TextInput
                    style={[styles.contentInput, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    placeholder="Not İçeriği"
                    placeholderTextColor={colors.textSecondary}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                    editable={!loading}
                />
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.saveButton,
                    { backgroundColor: colors.primary },
                    loading && { opacity: 0.7 }
                ]}
                onPress={handleSave}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={colors.background} />
                ) : (
                    <Text style={[styles.saveButtonText, { color: colors.background }]}>
                        Kaydet
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    contentInput: {
        height: 300,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    saveButton: {
        margin: 16,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 