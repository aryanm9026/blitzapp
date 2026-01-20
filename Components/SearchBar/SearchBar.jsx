import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';



export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for “Ramba Sambha”"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a2d4a',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
});
