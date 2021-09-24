import React, { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import fetchData from "../../utils/api";
import CustomListItem from "../../components/CustomListItem";
import { GRAPHQL_URL, SCREEN_KEYS, COLORS } from "../../constants";
import { GET_CHARCTER_DETAILS_QUERY } from "../../utils/query";

const index = ({ route, navigation }) => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { id } = route.params ? route.params : { id: 1 };

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Details",
			headerStyle: {
				backgroundColor: COLORS.PRIMARY,
			},
			headerTintColor: COLORS.WHITE,
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.navigate(SCREEN_KEYS.HOME)} style={{ marginRight: 10 }}>
					<MaterialIcons name="arrow-back" size={24} color={COLORS.WHITE} />
				</TouchableOpacity>
			),
		});
	}, [route]);

	const loadData = async () => {
		setIsLoading(true);
		try {
			const {
				data: { data },
			} = await fetchData(GRAPHQL_URL, GET_CHARCTER_DETAILS_QUERY(id));

			setData(data.character);
			setIsLoading(false);
		} catch (error) {
			setErrorMessage(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (id) loadData();
	}, [route]);

	const details = Object.keys(data)
		.filter((key) => key !== "id" && key !== "image")
		.map((key) =>
			key === "location" || key === "origin"
				? {
						title: key,
						subtitle: data[key].name,
				  }
				: key === "episode"
				? {
						title: key,
						subtitle: data.episode.map((eps) => `${eps.name}, `).join(""),
				  }
				: {
						title: key,
						subtitle: data[key],
				  }
		);
	return (
		<>
			{isLoading ? (
				<View style={[styles.container, styles.isLoading]}>
					<ActivityIndicator size="large" color={COLORS.PRIMARY} />
				</View>
			) : !isLoading && !!errorMessage ? (
				<View style={[styles.container]}>
					<Text style={styles.error}>{errorMessage}</Text>
				</View>
			) : Object.keys(data).length ? (
				<View style={styles.container}>
					<Avatar
						source={{ uri: data.image }}
						rounded
						size="xlarge"
						title={data?.name.slice(0, 2).toUpperCase()}
						containerStyle={styles.avatar}
					/>

					<ScrollView>
						{details.length ? (
							details?.map(({ title, subtitle }) => (
								<View key={title}>
									<CustomListItem title={title} subtitle={subtitle} />
								</View>
							))
						) : (
							<></>
						)}
					</ScrollView>
				</View>
			) : (
				<></>
			)}
		</>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
	},
	isLoading: {
		justifyContent: "center",
	},
	avatar: {
		alignSelf: "center",
		marginVertical: 20,
		borderColor: COLORS.PRIMARY,
		borderWidth: 1,
	},
	error: { color: COLORS.DANGER, textAlign: "center", margin: 20 },
});
