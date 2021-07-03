import * as React from 'react';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let latitudeNumber = "";
  let longitudeNumber = "";
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    longitudeNumber = JSON.stringify(location.coords.longitude);
    latitudeNumber = JSON.stringify(location.coords.latitude);
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      region ={{
        latitude: Number(latitudeNumber),
        longitude: Number(longitudeNumber),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      >
        <MapView.Marker
          coordinate = {{
            latitude: Number(latitudeNumber),
            longitude: Number(longitudeNumber)
          }}
        >
          <MapView.Callout>
            <Text>Tú estas aqui</Text>
          </MapView.Callout>
        </MapView.Marker>

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});