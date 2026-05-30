import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/config/api';

const API_URL = API_BASE_URL;

export default function GenerateTokenScreen() {
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<any>(null);

  const handleGenerateToken = async () => {
    if (!meterNumber || !amount) {
      Alert.alert('Error', 'Please enter both meter number and amount');
      return;
    }

    if (!/^\d{6}$/.test(meterNumber)) {
      Alert.alert('Error', 'Meter number must be exactly 6 digits');
      return;
    }

    const amountNum = parseInt(amount);
    if (isNaN(amountNum) || amountNum < 100) {
      Alert.alert('Error', 'Minimum amount is 100 RWF');
      return;
    }

    if (amountNum % 100 !== 0) {
      Alert.alert('Error', 'Amount must be a multiple of 100 RWF');
      return;
    }

    const days = amountNum / 100;
    if (days > 1825) {
      Alert.alert('Error', 'Maximum allowed is 1825 days (5 years)');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meterNumber, amount: amountNum }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedToken(data.data);
        Alert.alert('Success', `Token generated: ${data.data.token}\nDays: ${data.data.days}`);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMeterNumber('');
    setAmount('');
    setGeneratedToken(null);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Generate Token</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Meter Number (6 digits)</ThemedText>
          <TextInput
            style={styles.input}
            value={meterNumber}
            onChangeText={setMeterNumber}
            placeholder="Enter 6-digit meter number"
            keyboardType="numeric"
            maxLength={6}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Amount (RWF)</ThemedText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount (min 100 RWF)"
            keyboardType="numeric"
          />
          <ThemedText style={styles.hint}>100 RWF = 1 day of electricity</ThemedText>
        </ThemedView>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleGenerateToken}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Generate Token</ThemedText>
          )}
        </TouchableOpacity>

        {generatedToken && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.resultTitle}>Token Generated!</ThemedText>
            <ThemedView style={styles.tokenBox}>
              <ThemedText style={styles.tokenText}>{generatedToken.token}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.resultDetail}>Meter: {generatedToken.meterNumber}</ThemedText>
            <ThemedText style={styles.resultDetail}>Amount: {generatedToken.amount} RWF</ThemedText>
            <ThemedText style={styles.resultDetail}>Days: {generatedToken.days}</ThemedText>
            <ThemedText style={styles.resultDetail}>Status: {generatedToken.status}</ThemedText>
          </ThemedView>
        )}

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#007AFF',
  },
  tokenBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#007AFF',
  },
  resultDetail: {
    color:'#000000',
    fontSize: 16,
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
  },
});
