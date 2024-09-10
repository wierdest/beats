import { defaultGlobalColors } from "@/app/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1, 
    padding: 10 
  },
  noContent: {
    flex: 1,  // Para ocupar a altura total da tela
    justifyContent: 'center',  // Alinha o conteúdo verticalmente no centro
    alignItems: 'center',      // Alinha o conteúdo horizontalmente no centro
    textAlign: 'center',       // Centraliza o texto (não necessário, mas mantido para garantir)
  },
  text:{
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center'
  },
  icon:{
    
  }
});
