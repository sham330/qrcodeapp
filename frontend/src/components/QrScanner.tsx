import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

const QRScanner: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert('Scanned Data', data, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        flashMode={RNCamera.Constants.FlashMode.auto}
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
