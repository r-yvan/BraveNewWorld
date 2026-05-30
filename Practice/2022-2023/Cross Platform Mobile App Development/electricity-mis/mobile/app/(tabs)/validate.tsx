import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/config/api';

const API_URL = API_BASE_URL;

export default function ValidateTokenScreen() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);

  const handleValidateToken = async () => {
    if (!token) {
      Alert.alert('Error', 'Please enter a token');
      return;
    }

    if (!/^\d{8}$/.test(token)) {
      Alert.alert('Error', 'Token must be exactly 8 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        setTokenData(data.data);
      } else {
        Alert.alert('Error', data.message);
        setTokenData(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
      setTokenData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setToken('');
    setTokenData(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return '#28a745';
      case 'USED': return '#ffc107';
      case 'EXPIRED': return '#dc3545';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Validate Token</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Token (8 digits)</ThemedText>
          <TextInput
            style={styles.input}
            value={token}
            onChangeText={setToken}
            placeholder="Enter 8-digit token"
            keyboardType="numeric"
            maxLength={8}
          />
        </ThemedView>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleValidateToken}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Validate Token</ThemedText>
          )}
        </TouchableOpacity>

        {tokenData && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.resultTitle}>Token Details</ThemedText>
            
            <ThemedView style={styles.tokenBox}>
              <ThemedText style={styles.tokenText}>{tokenData.token}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Meter Number:</ThemedText>
              <ThemedText style={styles.detailValue}>{tokenData.meterNumber}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Amount:</ThemedText>
              <ThemedText style={styles.detailValue}>{tokenData.amount} RWF</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Days of Electricity:</ThemedText>
              <ThemedText style={[styles.detailValue, styles.daysHighlight]}>
                {tokenData.days} {tokenData.days === 1 ? 'day' : 'days'}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Status:</ThemedText>
              <ThemedText style={[styles.detailValue, { color: getStatusColor(tokenData.status) }]}>
                {tokenData.status}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Purchased Date:</ThemedText>
              <ThemedText style={styles.detailValue}>
                {new Date(tokenData.purchasedDate).toLocaleString()}
              </ThemedText>
            </ThemedView>
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
  button: {
    backgroundColor: '#28a745',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tokenBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  tokenText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#28a745',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  daysHighlight: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
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
