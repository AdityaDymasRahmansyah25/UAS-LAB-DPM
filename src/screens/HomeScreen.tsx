import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Book Tracking App!</Text>
      <Text style={styles.subtitle}>Manage your books and track your reading progress effortlessly.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e8f5e9', // Soft modern green background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#388e3c', // Deep modern green for title
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#66bb6a', // Softer complementary green
    marginTop: 10,
    lineHeight: 26,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
