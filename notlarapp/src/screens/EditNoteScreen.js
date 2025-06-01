import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { updateNote } from '../services/api';

export default function EditNoteScreen({ route, navigation }) {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Uyarı', 'Başlık ve içerik alanları zorunludur.');
            return;
        }

        try {
            setLoading(true);
            await updateNote(note.id, {
                ...note,
                title: title.trim(),
                content: content.trim(),
                updatedAt: new Date().toISOString(),
            });

            Alert.alert('Başarılı', 'Not başarıyla güncellendi.', [
                { text: 'Tamam', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Not güncellenirken hata:', error);
            Alert.alert('Hata', 'Not güncellenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.form}>
                <Text style={[styles.label, { color: colors.text }]}>Başlık</Text>
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Not başlığı"
                    placeholderTextColor={colors.textSecondary}
                    editable={!loading}
                />

                <Text style={[styles.label, { color: colors.text }]}>İçerik</Text>
                <TextInput
                    style={[styles.contentInput, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Not içeriği"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    textAlignVertical="top"
                    editable={!loading}
                />

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    contentInput: {
        height: 200,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    saveButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 