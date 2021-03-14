import { format, startOfMonth } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import apiClient from '../apiClient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

type Consultation = {
  dateTime: string,
  patientName: string,
  doctorName: string,
  consultationFee: number,
  diagnosis: string,
  medication: string,
}

function mapConsultaionsToAgendaItems(consultationsByMonth: Map<string, Consultation[]>): import("react-native-calendars").AgendaItemsMap<unknown> | undefined {
  const results = {};
  consultationsByMonth.forEach(
    (consultations) => {
      consultations.forEach(
        consultation => {
          const {
            dateTime: consultationDateTime
          } = consultation;
          const consultationDate = format(new Date(consultationDateTime), "yyyy-MM-dd");

          consultation.height = 80;
          results[consultationDate] = results[consultationDate] ? results[consultationDate].concat(consultation) : [consultation];
        }
      )
    }
  );
  return results 
}

export default function ConsultationsScreen({ navigation }) {
  const currentDate = new Date();
  const [consultationsByMonth, setConsultations] = React.useState(new Map())
  const searchConsultationsByDate = (date: Date) => () => {
    apiClient.post(
      "/consultations/search",
      {
        dateTime: {
          lt: endOfMonth(date),
          gt: startOfMonth(date),
        }
      }
    ).then(({ data }) => {
      const yearAndMonth = format(date, "yyyy-MM")
      consultationsByMonth.set(yearAndMonth, data.consultations);
      setConsultations(new Map(consultationsByMonth));
    });
  };
  React.useEffect(
    searchConsultationsByDate(currentDate),
    []
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultations</Text>
      {/* not finished */}
      {/* <Button title="Create" onPress={() => navigation.navigate("CreateConsultation")}/> */}
      <Agenda 
      selected={currentDate}
      items={mapConsultaionsToAgendaItems(consultationsByMonth)}
      loadItemsForMonth={(month) => {
        console.log('trigger items loading', month)
        searchConsultationsByDate(new Date(month.timestamp))();
        }}
  renderItem={(item, firstItemInDay) => {
    return (
    <View style={styles.consultationContainer}>
      <Text>Time: {format(new Date(item.dateTime), "HH:mm aa")}</Text>
      <Text>Patient: {item.patientName}</Text>
      <Text>Doctor: {item.doctorName}</Text>
      <Text>Diagnosis: {item.diagnosis}</Text>
      <Text>Medicataion: {item.medication}</Text>
      <Text>consultation Fee: ${item.consultationFee}</Text>
    </View>
    )
  }}
  // Agenda container style
  style={{
    width: "100%", height: "100%"
  }}
      />
    </View>
  );
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
  }
});


