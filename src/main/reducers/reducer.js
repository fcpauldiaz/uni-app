export const reducer = (state, action) => {
  switch (action.type) {
    case 'setSchools':
      return {
        ...state,
        schools: action.schools
      };
    case 'setCategories':
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state;
  }
};
