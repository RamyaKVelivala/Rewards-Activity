export function getOptionsList(transactionsList) {
    let customersList = [];
    const optionsList = [];

    // loop through the transactions list and get only customer names into an array
    if (!!transactionsList && transactionsList.length > 0) {
        transactionsList.forEach(ele => {
            customersList.push(ele.customerName);
        });
    }

    // remove duplicate customer names from the list
    customersList = [...new Set(customersList)];

    // convert array of customers into options list with key,value pair objects for the drop down
    if (customersList.length > 0) {
        customersList.forEach(ele => {
            optionsList.push({
                value: ele,
                label: ele
            })
        });
    }

    return optionsList;
}

export function calculateRewardPoints(transactionsList, selectedCustomer, selectedMonth) {
    let filteredList = [];
    let points = 0;
    let additionalPoints = 0;

    // filter the trasactions list based on selected customer and selected month
    if (!!transactionsList && transactionsList.length > 0) {
        filteredList = transactionsList.filter(ele => {
            const dateObj = new Date(ele.transactionDate);
            const month = dateObj.toLocaleString('default', { month: 'long' });

            return (ele.customerName === selectedCustomer && month === selectedMonth);
        });
    }

    // loop through each transaction of filtered list and calculate points
    filteredList.forEach(transaction => {
        const eachTransAmt = parseInt(transaction.amount);

        // 2 points for every dollar spent over $100 in each transaction.
        points += (eachTransAmt > 100) ? 2 * (eachTransAmt - 100) + 50 : 0;

        // 1 point for every dollar spent between $50 and $100 in each transaction.
        if ((eachTransAmt > 50) && (eachTransAmt <= 100)) {
            additionalPoints = 1 * (eachTransAmt - 50);
            points += additionalPoints;
        }

    });

    return points;
}

export function calculateTotalPoints(transactionsList, selectedCustomer) {
    let filteredCustomerList = [];
    let totalAmount = 0;

    // filter the trasactions list based on selected customer
    if (!!transactionsList && transactionsList.length > 0) {
        filteredCustomerList = transactionsList.filter(ele => {
            return (ele.customerName === selectedCustomer);
        });
    }

    // sum the total amount of all transactions from the trasactions list for the selected customer
    if (!!filteredCustomerList && filteredCustomerList.length > 0) {
        totalAmount = filteredCustomerList.reduce((acc, currVal) => acc + parseInt(currVal.amount), 0);
    }

    return totalAmount;
}
