import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { GRAPHQL_URL, SCREEN_KEYS, COLORS } from "../../constants";
import { GET_CHARCTERS_QUERY } from "../../utils/query";
import fetchData from "../../utils/api";

const index = ({ route, navigation }) => {
	//states
	const [dataSet, setDataSet] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [page, setPage] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");

	const loadData = async () => {
		try {
			const {
				data: { data },
			} = await fetchData(GRAPHQL_URL, GET_CHARCTERS_QUERY(page));
			if (data.characters.results.length) setDataSet([...dataSet, ...data.characters.results]);
			if (isLoading) setIsLoading(false);
			setIsRefreshing(false);
		} catch (error) {
			setErrorMessage(error.message);
			if (isLoading) setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	useEffect(() => {
		loadData(page);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Characters List",
			headerStyle: {
				backgroundColor: COLORS.PRIMARY,
			},
			headerTintColor: COLORS.WHITE,
			headerLeft: () => <></>,
		});
	}, [route]);

	const handleLoadMore = () => {
		setPage(page + 1);
		setIsRefreshing(true);
		loadData();
	};

	const renderItem = ({ item }) => (
		<ListItem
			bottomDivider
			containerStyle={styles.listItem}
			onPress={() => navigation.navigate(SCREEN_KEYS.DETAILS, { id: item.id })}
			Component={TouchableOpacity}
			friction={90}
			tension={100}
			activeScale={0.95}
		>
			<Avatar source={{ uri: item.image }} rounded size="large" title={item.name.slice(0, 2).toUpperCase()} />
			<ListItem.Content>
				<ListItem.Title>{item.name}</ListItem.Title>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	);

	return (
		<View style={styles.container}>
			{isLoading && page === 1 ? (
				<ActivityIndicator size="large" color={COLORS.PRIMARY} />
			) : !isLoading && !!errorMessage ? (
				<Text style={styles.error}>{errorMessage}</Text>
			) : (
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					data={dataSet}
					renderItem={renderItem}
					onEndReachedThreshold={0.4}
					onEndReached={handleLoadMore}
					refreshing={isRefreshing}
					ListFooterComponent={() => {
						if (!isLoading) return <></>;
						return <ActivityIndicator size="large" color={COLORS.PRIMARY} />;
					}}
					refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleLoadMore} />}
				/>
			)}
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center" },
	error: { color: COLORS.DANGER, textAlign: "center", margin: 20 },
	listItem: { backgroundColor: COLORS.WHITE },
});
