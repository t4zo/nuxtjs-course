// import myPlugin from 'myPlugin'

// export const plugins = [myPlugin]

export const state = () => ({
  userId: 'c3'
})

export const getters = {
  getUserId(state) {
    return state.userId;
  }
}