let timer;

export const state = () => ({
  user: null
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
    state.user = payload;
  }
};
export const actions = {
  async login(context, payload) {
    payload.returnSecureToken = true;
    const { data } = await this.$axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}`,
      payload
    );

    const expiresInMilliseconds = data.expiresIn *  1000;
    const expirationDate = new Date().getTime() + expiresInMilliseconds;

    const user = {
      ...data,
      expirationDate,
    }

    localStorage.setItem("auth", JSON.stringify(user));

    context.dispatch('autoLogout', expiresInMilliseconds);

    context.commit("setUser", data);
  },
  async signup(context, payload) {
    payload.returnSecureToken = true;
    const { data } = await this.$axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_KEY}`,
      payload
    );

    const user = {
      ...data,
      expirationDate,
    }

    localStorage.setItem("auth", JSON.stringify(user));

    context.dispatch('autoLogout', expiresInMilliseconds);

    context.commit("setUser", data);
  },
  logout(context) {
    context.commit("setUser", null);
    localStorage.removeItem('auth');
    clearTimeout(timer);
  },
  autoLogin(context) {
    if(process.browser) {
      const user = JSON.parse(localStorage.getItem("auth"));
      if(!user) {
        return;
      }
      
      const expiresInMilliseconds =  +user.expirationDate - new Date().getTime();
      if(expiresInMilliseconds < 10000) {
        return;
      }
      
      if (user?.idToken && user?.localId) {
        context.commit("setUser", user);
        context.dispatch('autoLogout', expiresInMilliseconds);
      }
    }
  },
  autoLogout(context, expiresInMilliseconds) {
    timer = setTimeout(() => {
      context.dispatch('logout');
      this.$router.replace('coaches');
    }, expiresInMilliseconds);
  },
};
