export const showSectionById = (id) => {
    document.getElementById(id).classList.remove('hidden');
  };
  
  export const hideSectionById = (id) => {
    document.getElementById(id).classList.add('hidden');
  };
  