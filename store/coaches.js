// import mutations from './mutations';
// import actions from './actions';
// import getters from './gettersns';

export const state = () => ({
  coaches: null
});

export const getters = {
  // fullName(state) {
  //   return `${state.firstName} ${state.lastName}`;
  // },
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches?.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = rootGetters["coaches/coaches"];
    const userId = rootGetters["auth/getUserId"];

    return coaches?.some(coach => coach.id === userId);
  },
  getCoachById: state => id => {
    return state.coaches?.find(c => c.id === id);
  }
};

export const mutations = {
  addCoach(state, payload) {
    state.coaches?.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  }
};

export const actions = {
  async fetchCoaches(context) {
    // console.log(!context.rootGetters.shouldUpdate)
    // if(!context.rootGetters.shouldUpdate) {
    //   console.log('not updated')
    //   return;
    // }

    const { data } = await this.$axios.get(
      "https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/coaches.json"
    );

    const coaches = [];
    for (const coach in data) {
      coaches.push({
        firstName: data[coach].firstName,
        lastName: data[coach].lastName,
        areas: data[coach].areas,
        description: data[coach].description,
        hourlyRate: data[coach].hourlyRate,
        id: coach
      });
    }

    context.commit("setCoaches", coaches);
    // context.commit("setFetchTimestamp");
  },
  setCoaches(context, payload) {
    context.commit("setCoaches", payload);
  },
  async addCoach(context, payload) {
    const userId = context.rootGetters["auth/getUserId"];
    const token = context.rootGetters["auth/getToken"];
    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    await this.$axios.put(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      newCoach
    );

    context.commit("addCoach", {
      ...newCoach,
      id: userId
    });
  }
};
