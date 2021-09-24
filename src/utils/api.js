import axios from "axios";

const fetchData = async (url, query) =>
	axios.post(url, {
		query,
	});

export default fetchData;
