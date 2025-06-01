import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title, showBack = false, rightComponent }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            {rightComponent && (
                <View style={styles.rightContainer}>{rightComponent}</View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 8,
        padding: 8,
    },
    backButtonText: {
        fontSize: 24,
        color: '#007AFF',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
