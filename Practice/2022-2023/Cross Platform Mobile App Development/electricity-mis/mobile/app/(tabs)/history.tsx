import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/config/api';

const API_URL = API_BASE_URL;

export default function TokenHistoryScreen() {
  const [meterNumber, setMeterNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<any[]>([]);

  const handleFetchHistory = async () => {
    if (!meterNumber) {
      Alert.alert('Error', 'Please enter a meter number');
      return;
    }

    if (!/^\d{6}$/.test(meterNumber)) {
      Alert.alert('Error', 'Meter number must be exactly 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/meter/${meterNumber}`);
      const data = await response.json();

      if (data.success) {
        setTokens(data.data);
        if (data.data.length === 0) {
          Alert.alert('Info', 'No tokens found for this meter number');
        }
      } else {
        Alert.alert('Error', data.message);
        setTokens([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return '#28a745';
      case 'USED': return '#ffc107';
      case 'EXPIRED': return '#dc3545';
      default: return '#666';
    }
  };

  const renderTokenItem = ({ item }: { item: any }) => (
    <ThemedView style={styles.tokenCard}>
      <ThemedView style={styles.tokenHeader}>
        <ThemedText style={styles.tokenValue}>{item.token}</ThemedText>
        <ThemedView style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.tokenDetails}>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Amount:</ThemedText>
          <ThemedText style={styles.detailValue}>{item.amount} RWF</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Days:</ThemedText>
          <ThemedText style={styles.detailValue}>{item.days}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>Purchased:</ThemedText>
          <ThemedText style={styles.detailValue}>
            {new Date(item.purchasedDate).toLocaleDateString()}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.searchContainer}>
        <ThemedText type="title" style={styles.title}>Token History</ThemedText>
        
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

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleFetchHistory}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>View History</ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>

      {tokens.length > 0 && (
        <ThemedView style={styles.resultsContainer}>
          <ThemedText style={styles.resultsTitle}>
            Found {tokens.length} {tokens.length === 1 ? 'token' : 'tokens'}
          </ThemedText>
          <FlatList
            data={tokens}
            renderItem={renderTokenItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
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
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  tokenCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tokenValue: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tokenDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
