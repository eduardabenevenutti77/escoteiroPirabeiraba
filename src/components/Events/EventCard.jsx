import PropTypes from "prop-types";
import styles from "./styles/EventCard.module.css";
import { parseLocalDate } from "../../utils/parseLocalDate";

// 🗓️ Componente que exibe um evento em formato de card
const EventCard = ({ event }) => {
    // 📅 Data completa (ex: 13 de outubro de 2025)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = parseLocalDate(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        });
    };

    // 📆 Dia e mês abreviado (ex: 13/10)
    const formatDateMonth = (dateString) => {
        if (!dateString) return "";
        const date = parseLocalDate(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            timeZone: "UTC",
        });
    };

    // ⏰ Apenas hora e minuto
    const formatTime = (timeString) => (timeString ? timeString.substring(0, 5) : "");

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
                        <span className={styles.detailText}>{formatDate(event.event_date)}</span>
                    </div>

                    <div className={styles.eventDetail}>
                        <span className={styles.detailIcon}>🕐</span>
                        <span className={styles.detailText}>{formatTime(event.event_time)}</span>
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
