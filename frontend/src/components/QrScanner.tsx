import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera as CameraComponent, CameraType, useCameraPermissions } from 'expo-camera';

const QRScanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) return <Text>Requesting camera permission...</Text>;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert('Scanned Data', data, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  return (
    <View style={styles.container}>
      <CameraComponent
        style={styles.camera}
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{scannedData ? `Scanned: ${scannedData}` : 'Scan a QR Code'}</Text>
        {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1, width: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  text: { fontSize: 18, color: 'white', marginBottom: 10 },
});

export default QRScanner;
