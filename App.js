import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import List from "./components/List";

export default function App() {
  const [list, setList] = useState();
  const [item, setItem] = useState([]);

  const handleAdd = () => {
    Keyboard.dismiss();
    setItem([...item, list]);
    setList(null);
  };

  const completeItem = (index) => {
    let itemsCopy = [...item];
    itemsCopy.splice(index, 1);
    setItem(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Agregando scroll */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* tareas generadas */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Listas Generadas</Text>
          <View style={styles.items}>
            {/*mapeo de tareas 
            TouchableOpacity  efecto boton presionado
            */}
            {item.map((newItem, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => completeItem(i)}>
                  <List text={newItem} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Escribir un nuevo elemento*/}
      {/*Utiliza una vista de evitación de teclado que garantiza que el teclado no cubra los elementos en pantalla 
      npm -i --save react-native-keyboard-aware-scroll-view
      */}
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Escribe un elemento"}
          value={list}
          onChangeText={(text) => setList(text)}
        />
        <TouchableOpacity onPress={() => handleAdd()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
