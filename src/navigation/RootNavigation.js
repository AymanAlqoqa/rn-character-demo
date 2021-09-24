import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CharcterDetails from "../screens/CharcterDetails";
import { SCREEN_KEYS } from "../constants";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
	return (
		<Stack.Navigator initialRouteName={SCREEN_KEYS.HOME}>
			<Stack.Screen name={SCREEN_KEYS.HOME} component={HomeScreen} />
			<Stack.Screen name={SCREEN_KEYS.DETAILS} component={CharcterDetails} />
		</Stack.Navigator>
	);
};

export default RootNavigation;
