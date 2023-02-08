import { useState } from "react";
import PropTypes from 'prop-types';
import { getOptionsList, calculateRewardPoints, calculateTotalPoints } from '../utils/transaction-utils';
import Select from 'react-select';
import { monthsList } from '../constants/constants';
import styles from "../resources/styles/rewards-activity.module.css";
import RewardsMessage from './RewardsMessage';

const RewardsActivity = (props) => {
    const optionsList = getOptionsList(props.transactionsList);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isRewardsCalculated, setRewardsCalculated] = useState(false);
    const [pointsPerMonth, setPointsPerMonth] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const onChangeDD = (e, isCustomer) => {
        isCustomer ? setSelectedCustomer(e.label) : setSelectedMonth(e.label);
        setRewardsCalculated(false);
    }

    const onClickCalcRewards = (e) => {
        setRewardsCalculated(true);
        setPointsPerMonth(calculateRewardPoints(props.transactionsList, selectedCustomer, selectedMonth));
        setTotalPoints(calculateTotalPoints(props.transactionsList, selectedCustomer));
    }

    const customerCustomStyles = {
        container: (provided) => ({
            ...provided,
            borderRadius: 4,
            borderWidth: 1,
            borderStyle: 'solid',
            width: '200px',
            float: 'left'
        })
    }

    const monthCustomStyles = {
        container: (provided) => ({
            ...provided,
            borderRadius: 4,
            borderWidth: 1,
            borderStyle: 'solid',
            width: '200px',
            float: 'left'
        })
    }

    return ((!!props.transactionsList && props.transactionsList.length > 0) ?
        (<div className={styles.activity} data-testid="rewardsActivity">
            <div className={styles.ddSection}>
                <div className={styles.row}>
                    <div className={styles.customerLbl}>Select Customer</div>
                    <div className={styles.customerLbl}>
                        <Select
                            name='Customers'
                            placeholder='Select Customer'
                            value={optionsList.filter(function (option) {
                                return option.value === selectedCustomer;
                            })}
                            options={optionsList}
                            onChange={(e) => onChangeDD(e, true)}
                            styles={customerCustomStyles} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.monthLbl}>Select Month</div>
                    <div className={styles.customerLbl}>
                        <Select
                            name='Month'
                            placeholder='Select Month'
                            value={monthsList.filter(function (option) {
                                return option.value === selectedMonth;
                            })}
                            options={monthsList}
                            onChange={(e) => onChangeDD(e, false)}
                            styles={monthCustomStyles} />
                    </div>
                </div>
            </div>
            <div className={styles.calcBtnDiv}>
                <button type="button"
                    className={styles.calcBtn}
                    onClick={(e) => onClickCalcRewards(e)}>
                    Calculate Reward Points
                </button>
            </div>
            {
                isRewardsCalculated && (
                    <RewardsMessage
                        selectedCustomer={selectedCustomer}
                        pointsPerMonth={pointsPerMonth}
                        selectedMonth={selectedMonth}
                        totalPoints={totalPoints}
                    />
                )
            }
        </div>) : (
            <div className={styles.noTransAvail}>No Transactions Available</div>
        )
    );
}

RewardsActivity.propTypes = {
    transactionsList: PropTypes.array
};

export default RewardsActivity;
