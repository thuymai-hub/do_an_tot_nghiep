const LocalStorage = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token: string) => localStorage.setItem('token', token),
    removeToken: () => localStorage.removeItem('token'),

    getUserName: () => localStorage.getItem('username'),
    setUsername: (username: string) => localStorage.setItem('username', username),
    removeUsername: () => localStorage.removeItem('username'),

    getUserType: () => localStorage.getItem('type'),
    setUserType: (type: string) => localStorage.setItem('type', type),
    removeUserType: () => localStorage.removeItem('type'),


};

export default LocalStorage;
