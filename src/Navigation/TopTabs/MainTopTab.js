// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Colors } from '../../Config/Colors';

// const Tab = createMaterialTopTabNavigator();


// const MainTopTab = (props) => {

//     return (
//         <Tab.Navigator
//             screenOptions={{

//                 tabBarStyle: {
//                     backgroundColor: 'transparent',
//                     borderRadius: 10,
//                     margin: 10,
//                     elevation: 0
//                 },
//                 tabBarLabelStyle: {
//                     fontSize: 10,
//                     color: Colors.SuccessGreen,
//                 },
//                 tabBarIndicatorStyle: {
//                     height: 48,
//                     backgroundColor: Colors.Blue,
//                     borderRadius: 30,
//                 },
//             }}>
//             {
//                 props.components?.map((component, index) => (
//                     <Tab.Screen key={index} name={component?.name} component={component?.component} options={{ tabBarLabel: component?.label }} />
//                 ))
//             }
//         </Tab.Navigator>
//     )
// }

// export default MainTopTab;