import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { COLORS } from "../constants";

const CustomListItem = ({ title, subtitle }) => {
	console.log(subtitle);
	return (
		<ListItem bottomDivider topDivider containerStyle={styles.listItem}>
			<View style={styles.textWrapper}>
				<ListItem.Title>{title}</ListItem.Title>
				<Text>{":  "}</Text>
				<ListItem.Subtitle style={{ flex: 1, textAlign: "justify" }}>{subtitle}</ListItem.Subtitle>
			</View>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: COLORS.WHITE,
	},
	textWrapper: { flexDirection: "row", alignItems: "center", marginHorizontal: 12 },
});
