import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoteCard({ note }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.content} numberOfLines={2}>
                {note.content}
            </Text>
            <Text style={styles.date}>
                {new Date(note.createdAt).toLocaleDateString('tr-TR')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
}); 