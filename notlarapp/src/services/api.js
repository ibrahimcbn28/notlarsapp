import axios from 'axios';

const API_URL = 'http://localhost:3001'; // JSON Server adresi

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Kimlik doğrulama işlemleri
export const loginUser = async (credentials) => {
    try {
        const response = await api.get('/users', {
            params: { email: credentials.email }
        });

        const users = response.data;
        const user = users.find(u => u.email === credentials.email);

        if (user && user.password === credentials.password) {
            const { password, ...userData } = user;
            return userData;
        }
        throw new Error('Geçersiz kullanıcı adı veya şifre');
    } catch (error) {
        console.error('Giriş hatası:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        // Önce e-posta adresi ile kayıtlı kullanıcı var mı kontrol et
        const response = await api.get('/users', {
            params: { email: userData.email }
        });

        const users = response.data;
        const existingUser = users.find(u => u.email === userData.email);

        if (existingUser) {
            throw new Error('Bu e-posta adresi zaten kullanımda');
        }

        // Yeni kullanıcıyı kaydet
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            avatar: 'https://via.placeholder.com/150',
            createdAt: new Date().toISOString()
        };

        const createResponse = await api.post('/users', newUser);
        const { password, ...user } = createResponse.data;
        return user;
    } catch (error) {
        if (error.message === 'Bu e-posta adresi zaten kullanımda') {
            throw error;
        }
        console.error('Kayıt hatası:', error);
        throw new Error('Kayıt işlemi sırasında bir hata oluştu');
    }
};

export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await api.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        throw error;
    }
};

// Not işlemleri
export const getNotes = async (userId) => {
    try {
        const response = await api.get('/notes', {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Notlar alınırken hata:', error);
        throw error;
    }
};

export const getNote = async (id) => {
    try {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Not detayı alınırken hata:', error);
        throw error;
    }
};

export const createNote = async (data, userId) => {
    try {
        const noteData = {
            ...data,
            userId,
            createdAt: new Date().toISOString()
        };
        const response = await api.post('/notes', noteData);
        return response.data;
    } catch (error) {
        console.error('Not oluşturulurken hata:', error);
        throw error;
    }
};

export const updateNote = async (noteId, updatedNote) => {
    try {
        const response = await api.put(`/notes/${noteId}`, updatedNote);
        return response.data;
    } catch (error) {
        console.error('updateNote error:', error);
        throw error;
    }
};

export const deleteNote = async (noteId) => {
    if (!noteId) {
        throw new Error('Not ID\'si gerekli');
    }

    try {
        console.log('API - Not silme isteği:', noteId);
        const response = await api.delete(`/notes/${noteId}`);
        console.log('API - Silme yanıtı:', response.status);

        if (response.status === 200 || response.status === 204) {
            return true;
        }
        throw new Error(`Not silinemedi (HTTP ${response.status})`);
    } catch (error) {
        console.error('API - Silme hatası:', error);
        if (error.response) {
            throw new Error(`Silme hatası: HTTP ${error.response.status}`);
        }
        throw new Error(error.message || 'Sunucu hatası');
    }
};

export default api; 