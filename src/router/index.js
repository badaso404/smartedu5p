import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Splash,
  Login,
  Signin,
  LupaPassword,
  Register,
  Project,
  TambahProject,
  DetailProject,
  EditProject,
  Profile,
  Save,
  Logbook,
  DetailLogBook,
  EditLogbook,
  Public,
  Group,
  AddPeople,
  Search,
  Upload,
  HomeT
} from '../pages';
import {BottomNavigation} from '../components';
import TambahLogbook from '../pages/Home/LogBook/TambahLogBook';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Save" component={Save} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const MainApp1 = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="HomeT" component={HomeT} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Save" component={Save} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp1"
        component={MainApp1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Daftar"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LupaPassword"
        component={LupaPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Project"
        component={Project}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahProject"
        component={TambahProject}
        options={{title: 'Tambah Project'}}
      />
      <Stack.Screen
        name="DetailProject"
        component={DetailProject}
        options={{title: 'Detail Project'}}
      />
      <Stack.Screen
        name="EditProject"
        component={EditProject}
        options={{title: 'Edit Project'}}
      />
      <Stack.Screen
        name="Logbook"
        component={Logbook}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahLogbook"
        component={TambahLogbook}
        options={{title: 'Tambah Logbook'}}
      />
      <Stack.Screen
        name="DetailLogBook"
        component={DetailLogBook}
        options={{title: 'Detail Logbook'}}
      />
      <Stack.Screen
        name="EditLogbook"
        component={EditLogbook}
        options={{title: 'Edit Logbook'}}
      />
      <Stack.Screen name="Public" component={Public} />

      <Stack.Screen
        name="Group"
        component={Group}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPeople"
        component={AddPeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Upload"
        component={Upload}
      />


    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
