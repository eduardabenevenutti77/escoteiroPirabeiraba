import PropTypes from "prop-types";
import styles from "./styles/EventListItem.module.css";
import { parseLocalDate } from "../../utils/parseLocalDate";

// 🗓️ Item da lista de eventos (compacto)
const EventListItem = ({ event }) => {
    const formatDate = (dateString) => {
        const date = parseLocalDate(dateString);
        return {
            day: date.getUTCDate().toString().padStart(2, "0"),
            month: date
                .toLocaleDateString("pt-BR", { month: "short", timeZone: "UTC" })
                .replace(".", "")
                .toUpperCase(),
            year: date.getUTCFullYear(),
        };
    };

    const formatTime = (timeString) => (timeString ? timeString.substring(0, 5) : "");

    const dateInfo = formatDate(event.event_date);

    return (
        <div className={styles.eventListItem}>
            <div className={styles.eventDateBadge}>
                <div className={styles.dateDay}>{dateInfo.day}</div>
                <div className={styles.dateMonth}>{dateInfo.month}</div>
                <div className={styles.dateYear}>{dateInfo.year}</div>
            </div>

            <div className={styles.eventInfo}>
                <h4 className={styles.eventName}>{event.title}</h4>
                <div className={styles.eventMeta}>
                    <span className={styles.eventLocation}>📍 {event.location}</span>
                    <span className={styles.eventTime}>🕐 {formatTime(event.event_time)}</span>
                </div>
            </div>
        </div>
    );
};

EventListItem.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        event_date: PropTypes.string.isRequired,
        event_time: PropTypes.string,
        location: PropTypes.string.isRequired,
    }).isRequired,
};

export default EventListItem;
