import styles from "../resources/styles/rewards-activity.module.css";
import PropTypes from 'prop-types';

const RewardsMessage = (props) => {
    if (Object.keys(props).length > 0) {
        return (
            <div className={styles.rewardsTxt}>
                {(props.selectedCustomer !== '' && props.pointsPerMonth !== undefined && props.selectedMonth !== undefined) &&
                    <div className={styles.monthTxt}>
                        <i>{props.selectedCustomer}</i> earned <b>{props.pointsPerMonth}</b> <i>PTS</i> for the <i>{props.selectedMonth}</i> month
                    </div>
                }
                {(props.selectedCustomer !== '' && props.totalPoints !== undefined) &&
                    <div className={styles.totalTxt}>
                        <i>{props.selectedCustomer}</i> earned total of <b>{props.totalPoints}</b> <i>PTS</i>
                    </div>
                }

            </div>
        )
    } else {
        return '';
    }

}

RewardsMessage.propTypes = {
    selectedCustomer: PropTypes.string,
    pointsPerMonth: PropTypes.number,
    selectedMonth: PropTypes.string,
    totalPoints: PropTypes.number,
};

export default RewardsMessage;