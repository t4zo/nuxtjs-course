export default function ({ store, redirect }) {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const isCoach = store.getters['coaches/isCoach'];

  if (!isAuthenticated) {
    return redirect('/auth');
  }
  
  if (isAuthenticated && !isCoach) {
    return redirect('/register');
  }
}