import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import Reserva from './src/components/Reserva';
import Formulario from './src/components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './src/utils/Colors';

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerReservasStorage = async () => {
      try {
        const reservasStorage = await AsyncStorage.getItem('reservas');
        if (reservasStorage) {
          setReservas(JSON.parse(reservasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerReservasStorage();
  }, []);

  const eliminarReserva = id => {
    const reservasFiltradas = reservas.filter(reserva => reserva.id !== id);
    setReservas(reservasFiltradas);
    guardarReservasStorage(JSON.stringify(reservasFiltradas));
  };

  const guardarReservasStorage = async reservasJSON => {
    try {
      await AsyncStorage.setItem('reservas', reservasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Bienvenido Al Restaurante</Text>
        <View>
          <TouchableHighlight
            onPress={() => guardarMostrarForm(!mostrarForm)}
            style={styles.btnMostrarForm}
          >
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? 'Cancelar Crear Reserva' : 'Crear Nueva Reserva'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Reserva</Text>
              <Formulario
                reservas={reservas}
                setReservas={setReservas}
                guardarMostrarForm={guardarMostrarForm}
                guardarReservasStorage={guardarReservasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {reservas.length > 0 ? 'Administra tus reservas' : 'No hay reservas, agrega una'}
              </Text>
              

              <ScrollView style={styles.listado}>
                {reservas.map(reserva => (
                  <Reserva key={reserva.id} item={reserva} eliminarReserva={eliminarReserva} />
                ))}
              </ScrollView>
              
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: '#ffffff',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex:1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: "#5eff00",
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#505050',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
