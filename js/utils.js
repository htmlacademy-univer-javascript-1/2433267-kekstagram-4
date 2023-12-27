export const closeModal = (evt, closeFunc) => {
  if (evt.key === 'Escape') {
    closeFunc(evt);
  }
};
