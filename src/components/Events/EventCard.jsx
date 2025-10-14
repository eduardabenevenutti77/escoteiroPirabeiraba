import PropTypes from "prop-types";
import { parseLocalDate } from "../../utils/parseLocalDate";
import styles from "./styles/EventCard.module.css";

const EventCard = ({ event }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = parseLocalDate(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateMonth = (dateString) => {
        if (!dateString) return "";
        const date = parseLocalDate(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    };

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventImage}>
                {event.image_url ? (
                    <img src={event.image_url} alt={event.title} />
                ) : (
                    <div className={styles.placeholderImage}>
                        <span>📸</span>
                    </div>
                )}
                <div className={styles.eventBadge}>
                    <span className={styles.badgeIcon}>
                        {formatDateMonth(event.event_date)}
                    </span>
                </div>
            </div>

            <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>

                <div className={styles.eventDetails}>
                    <div className={styles.eventDetail}>
                        <span className={styles.detailIcon}>📍</span>
                        <span className={styles.detailText}>{event.location}</span>
                    </div>

                    <div className={styles.eventDetail}>
                        <span className={styles.detailIcon}>📅</span>
                        <span className={styles.detailText}>
                            {formatDate(event.event_date)}
                        </span>
                    </div>

                    <div className={styles.eventDetail}>
                        <span className={styles.detailIcon}>🕐</span>
                        <span className={styles.detailText}>
                            {formatTime(event.event_time)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        location: PropTypes.string.isRequired,
        event_date: PropTypes.string.isRequired,
        event_time: PropTypes.string,
    }).isRequired,
};

export default EventCard;
