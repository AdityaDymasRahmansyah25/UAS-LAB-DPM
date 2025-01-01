import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import ProfileStackNavigator from '../screens/ProfileStackNavigator';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Books':
              iconName = 'book-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2f7a55', // Hijau aktif
        tabBarInactiveTintColor: '#a3d6c2', // Hijau lembut untuk tidak aktif
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarBadge: 5,
          tabBarBadgeStyle: styles.badge,
        }}
      />
      <Tab.Screen name="Books" component={BookListScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#e8f5e9', // Hijau lembut sebagai latar belakang
    borderTopWidth: 1,
    borderTopColor: '#c8e6c9',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  header: {
    backgroundColor: '#c8e6c9', // Hijau lembut pada header
    borderBottomWidth: 1,
    borderBottomColor: '#a5d6a7',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    color: '#2f7a55', // Hijau yang lebih gelap untuk judul header
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.8,
  },
  badge: {
    backgroundColor: '#2f7a55', // Hijau gelap untuk badge
    color: '#e8f5e9', // Hijau lembut untuk teks
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
