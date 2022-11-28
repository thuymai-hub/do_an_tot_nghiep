const LocalStorage = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token: string) => localStorage.setItem('token', token),
    removeToken: () => localStorage.removeItem('token'),

    getUserName: () => localStorage.getItem('username'),
    setUsername: (username: string) => localStorage.setItem('username', username),
    removeUsername: () => localStorage.removeItem('username'),
};

export default LocalStorage;
