import AsyncStorage from '@react-native-async-storage/async-storage';

export const headers = {
  headerFormData: async () => {
    // let token = await AsyncStorage.getItem('@token');
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Cookie: token,
      },
    };
  },

  headerUrlEncoded: async () => {
    // let token = await AsyncStorage.getItem('@token');
    return {
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        // Cookie: token,
      },
    };
  },
};
