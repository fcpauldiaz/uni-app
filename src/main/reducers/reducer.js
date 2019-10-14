export const reducer = (state, action) => {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        schools: action.schools
      };

    default:
      return state;
  }
};
