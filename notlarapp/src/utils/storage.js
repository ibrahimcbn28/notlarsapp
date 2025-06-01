import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@notes';
const USER_KEY = '@user';
const SETTINGS_KEY = '@settings';

export const storeNotes = async (notes) => {
    try {
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Notlar kaydedilirken hata oluştu:', error);
    }
};

export const getNotes = async () => {
    try {
        const notes = await AsyncStorage.getItem(NOTES_KEY);
        return notes ? JSON.parse(notes) : [];
    } catch (error) {
        console.error('Notlar yüklenirken hata oluştu:', error);
        return [];
    }
};

export const storeUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Kullanıcı bilgileri kaydedilirken hata oluştu:', error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Kullanıcı bilgileri yüklenirken hata oluştu:', error);
        return null;
    }
};

export const storeSettings = async (settings) => {
    try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Ayarlar kaydedilirken hata oluştu:', error);
    }
};

export const getSettings = async () => {
    try {
        const settings = await AsyncStorage.getItem(SETTINGS_KEY);
        return settings ? JSON.parse(settings) : {
            darkMode: false,
            notifications: true,
            autoSync: true
        };
    } catch (error) {
        console.error('Ayarlar yüklenirken hata oluştu:', error);
        return {
            darkMode: false,
            notifications: true,
            autoSync: true
        };
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Depolama temizlenirken hata oluştu:', error);
    }
}; 