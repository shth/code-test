import { format, startOfMonth } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import Picker from 'react-native-picker-select';
import apiClient from '../apiClient';
import DatePicker from '@react-native-community/datetimepicker'

import { Text, View } from '../components/Themed';

export default function CreateConsultationScreen() {
  const currentDate = new Date();
  const [doctorName, setDoctorName] = React.useState("")
  const [patientName, setPatientName] = React.useState("")
  const [diagnosis, setDiagnosis] = React.useState("")
  const [medication, setMedication] = React.useState("")
  const [consultationFee, setConsultationFee] = React.useState("")
  const [hasFollowUp, setHasFollowUp] = React.useState()
  const [dateTime, setDateTime] = React.useState(currentDate)
  
  return (
    <View style={styles.container}>
      <Text>Create consultation</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Doctor Name</Text>
        <TextInput style={styles.input} onChangeText={setDoctorName}></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput style={styles.input} onChangeText={setPatientName}></TextInput>
      </View> 
      <View style={styles.field}>
        <Text style={styles.label}>Diagnosis</Text>
        <TextInput style={styles.input} onChangeText={setDiagnosis}></TextInput>
      </View> 
      <View style={styles.field}>
        <Text style={styles.label}>Medication</Text>
        <TextInput style={styles.input} onChangeText={setMedication}></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Consultation Fee</Text>
        <TextInput style={styles.input} onChangeText={setConsultationFee} keyboardType="decimal-pad"></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Has Follow Up?</Text>
        <Picker items={[{ label: "Yes", value: true, inputLabel: "Yes" }, {label: "No", value: false}]} onValueChange={setHasFollowUp} value={hasFollowUp} style={styles.selectField}/>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.label}>{format(dateTime, 'yyyy-MM-dd HH:mm')}</Text>
        <DatePicker mode={'datetime'} value={currentDate} onChange={(event, selectedDate) => setDateTime(selectedDate)}/>  
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  consultationContainer: {
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 48,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  label: {
    textAlign: 'left',
  },
  field: {
    width: "80%",
    marginBottom: 10,
  },
  selectField: {
    color: "black"
  }
});


