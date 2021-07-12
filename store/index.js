// import myPlugin from 'myPlugin'

// export const plugins = [myPlugin]

export const state = () => ({
  userId: "c3",
  lastFetch: false,
});

export const mutations = {
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};

export const getters = {
  getUserId(state) {
    return state.userId;
  },
  shouldUpdate(state) {
    const { lastFetch } = state;
    console.log(`lastFetch, ${lastFetch}`)
    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();

    // Returns true if its more than a minute ago
    // console.log(currentTimestamp);
    // console.log(lastFetch);
    return ((currentTimestamp - lastFetch) / 1000) > 60;
  },
};
