const getTransactionsList = async () => {
    try {
        // Simulated an asynchronous api with my mock data.
        const response = await fetch("https://api-generator.retool.com/xAER9x/transactionslist");
        const data = await response.json();
        console.log("data -- " + JSON.stringify(data));
        return data;
    } catch {
        throw new Error("Invalid response");
    }
};

export default getTransactionsList;