// isso aqui tem que eventualmente ser um type
// a ideia é deixar em aberto por causa do material 3 com cores dinâmicas, que é a implementação ideal do feature
export const defaultGlobalColors = {
  primary: '#6c1f7a',
  secondary: '#571363',
  accent: '#5a8d2e',
};

export type GlobalColorType = 'primary' | 'secondary' | 'accent'

export const darkTheme = {
  primary: 'rgb(30 30 30)',
  secondary: "#333",
  tertiary: "black",
  accent: '#FFFFFF',
  backgroundModal: 'rgba(0, 0, 0, 0.90)',
};

export const lightTheme = {
  primary: 'rgba(0, 0, 0, 0.00)',
  secondary: "white",
  tertiary: 'white',
  accent: '#000000',
  backgroundModal: 'rgba(255, 255, 255, 0.97)',
};
