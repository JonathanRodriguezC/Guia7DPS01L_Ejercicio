import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import colors from '../utils/Colors.js';

const Formulario = ({ reservas, setReservas, guardarMostrarForm, guardarReservasStorage }) => {
  const [nombre, guardarNombre] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [cantidadPersonas, guardarCantidadPersonas] = useState('');
  const [seccion, guardarSeccion] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
    guardarHora(hora.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  const crearNuevaReserva = () => {
    if (nombre.trim() === '' || fecha.trim() === '' || hora.trim() === '' || cantidadPersonas.trim() === '' || seccion.trim() === '') {
      mostrarAlerta();
      return;
    }

    const reserva = { id: uuid.v4(), nombre, fecha, hora, cantidadPersonas, seccion };
    const nuevasReservas = [...reservas, reserva];
    setReservas(nuevasReservas);
    guardarReservasStorage(JSON.stringify(nuevasReservas));
    guardarMostrarForm(false);

    // Limpiar los campos
    guardarNombre('');
    guardarFecha('');
    guardarHora('');
    guardarCantidadPersonas('');
    guardarSeccion('');
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }]);
  };

  return (
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={texto => guardarNombre(texto)}
          placeholder="Ingrese el nombre"
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale="es_ES"
        />
        <Text>{fecha || 'No seleccionada'}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={hideTimePicker}
          locale="es_ES"
        />
        <Text>{hora || 'No seleccionada'}</Text>
      </View>
      <View>
        <Text style={styles.label}>Cantidad de Personas:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cantidadPersonas}
          onChangeText={texto => guardarCantidadPersonas(texto)}
          placeholder="Ingrese cantidad de personas"
        />
      </View>
      <View>
        <Text style={styles.label}>Sección:</Text>
        <View style={styles.seccionContainer}>
          <TouchableOpacity
            style={[styles.seccionButton, seccion === 'Fumadores' && styles.seleccionado]}
            onPress={() => guardarSeccion('Fumadores')}
          >
            <Text style={styles.seccionText}>Fumadores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.seccionButton, seccion === 'No Fumadores' && styles.seleccionado]}
            onPress={() => guardarSeccion('No Fumadores')}
          >
            <Text style={styles.seccionText}>No Fumadores</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableHighlight onPress={crearNuevaReserva} style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Crear Nueva Reserva</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  seccionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  seccionButton: {
    flex: 1,
    padding: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  seleccionado: {
    backgroundColor: colors.BUTTON_COLOR,
  },
  seccionText: {
    fontSize: 16,
    color: '#000',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
    borderRadius: 5,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
