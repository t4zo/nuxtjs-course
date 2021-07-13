export const state = () => ({
  requests: []
});

export const getters = {
  requests(state, getters, rootState, rootGetters) {
    const userId = rootGetters["auth/getUserId"];
    return state.requests?.filter(r => r.coachId === userId);
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
      coachId: payload.coachId
    };

    const { data } = await this.$axios.post(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      newRequest
    );

    newRequest.id = data.name;

    context.commit("addRequest", newRequest);
  },
  setRequests(context, payload) {
    context.commit("setRequests", payload);
  },
  async fetchRequests(context) {
    const user = context.rootGetters["auth/getUser"];

    const { data } = await this.$axios.get(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/requests/${user.localId}.json?auth=${user.idToken}`
    );

    if (!data) {
      return;
    }

    const firebaseRequestsMap = Object.entries(data).map(e => ({
      id: e[0],
      data: e[1]
    }));

    const requests = [];
    for (const firebaseRequestMap of firebaseRequestsMap) {
      requests.push({
        coachId: firebaseRequestMap.data.coachId,
        userEmail: firebaseRequestMap.data.userEmail,
        message: firebaseRequestMap.data.message,
        id: firebaseRequestMap.id
      });
    }

    context.commit("setRequests", requests);
  }
};
