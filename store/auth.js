export const state = () => ({
  user: null,
});

export const getters = {
  getUser(state) {
    return state.user;
  },
  getUserId(state) {
    return state.user?.localId;
  },
  getToken(state) {
    return state.user?.idToken;
  },
  isAuthenticated(state) {
    return !!state.user?.idToken;
  }
};
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
};
export const actions = {
  async login(context, payload) {
    payload.returnSecureToken = true;
    const { data } = await this.$axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}`, payload);
    context.commit('setUser', data);
  },
  logout(context) {
    context.commit('setUser', null);
  },
  async signup(context, payload) {
    payload.returnSecureToken = true;
    const { data } = await this.$axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_KEY}`, payload);
    context.commit('setUser', data);
  },
};
