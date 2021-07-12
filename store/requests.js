export const state = () => ({
  requests: []
});

export const getters = {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters['auth/getUserId'];
    return state.requests?.filter(r => r.coachId === coachId);
  },
  hasRequests(state) {
    return state.requests?.length > 0;
  }
};

export const mutations = {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  }
};

export const actions = {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.userEmail,
      message: payload.message,
      coachId: payload.coachId,
    };
    const user = context.rootGetters['auth/getUserId'] || 'anonymous';
    const { data } = await this.$axios.post(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/requests/${user}.json`,
      newRequest
    );

    newRequest.id = data.name;

    context.commit("addRequest", newRequest);
  },
  setRequests(context, payload) {
    context.commit("setRequests", payload);
  },
  async fetchRequests(context) {
    const user = context.rootGetters['auth/getUser'];

    const { data } = await this.$axios.get(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/requests/${user.localId}.json?auth=${user.idToken}`
    );
    
    const requests = [];

    for (const key in data) {
      requests.push({
        coachId: user.localId,
        userEmail: data[key].userEmail,
        message: data[key].message,
        id: key
      });
    }

    context.commit("setRequests", requests);
  },
};
