import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Ionicons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Main from './components/Main';
import Add from './components/Add';
import { View } from 'react-native';


const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="main" component={Main} options={{
          drawerIcon: () => <FontAwesome name="sticky-note" size={24} color="white" />,
          drawerLabel: 'Main',
          headerTitle: 'Main',
          drawerLabelStyle: { color: 'white' },
          drawerActiveBackgroundColor: 'gray',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white'
        }} />
        <Drawer.Screen name="add" component={Add} options={{
          drawerIcon: () => <Ionicons name="add-circle" size={24} color="white" />,
          drawerLabel: 'Add',
          headerTitle: 'Add',
          drawerLabelStyle: { color: 'white' },
          drawerActiveBackgroundColor: 'gray',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white'
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: 'black' }}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name="notebook" size={72} color="white" />
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Info"
        icon={() => <AntDesign name="infocirlce" size={24} color="white" />}
        onPress={() => alert("noteApp 0.0.0.0.1")}
        labelStyle={{ color: 'white' }}
        activeBackgroundColor='gray'
      />

    </DrawerContentScrollView>
  );
}