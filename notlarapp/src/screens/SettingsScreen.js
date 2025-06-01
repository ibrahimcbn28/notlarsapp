import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { colors, isDark, toggleTheme } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Görünüm
                </Text>
                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>
                        Karanlık Mod
                    </Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={colors.background}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Bildirimler
                </Text>
                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>
                        Bildirimler
                    </Text>
                    <Switch
                        value={true}
                        onValueChange={() => { }}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={colors.background}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Hakkında
                </Text>
                <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>
                        Uygulama Versiyonu
                    </Text>
                    <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                        1.0.0
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    settingLabel: {
        fontSize: 16,
    },
    settingValue: {
        fontSize: 16,
    },
}); 