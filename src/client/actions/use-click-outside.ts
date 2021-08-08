const clickOutside = (node: HTMLElement) => {
  const state: ClickOutsideState = {
    isPointerDown: false;
  }

  const onPointerDown = () => {

  };

  document.addEventListener('mousedown', onPointerDown, true)
};