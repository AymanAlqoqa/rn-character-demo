import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./src/navigation/RootNavigation";
import { SCREEN_KEYS } from "./src/constants";

const prefix = Linking.createURL("/");
export default function App() {
	const [data, setData] = useState(null);
	const linking = {
		prefixes: [prefix],
		config: {
			screens: {
				[SCREEN_KEYS.HOME]: "home",
				[SCREEN_KEYS.DETAILS]: "details",
			},
		},
	};

	const handleDeepLink = (event) => {
		let data = Link.parse(event.url);
		setData(data);
	};

	useEffect(() => {
		const getInitialURL = async () => {
			let initialUrl = await Linking.getInitialURL();
			if (initialUrl) setData(Linking.parse(initialUrl));
		};

		Linking.addEventListener("url", handleDeepLink);
		if (!data) getInitialURL();

		return () => Linking.removeEventListener("url");
	}, []);

	return (
		<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
			<RootNavigation />
		</NavigationContainer>
	);
}
