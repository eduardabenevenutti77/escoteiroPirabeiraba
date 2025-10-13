import PropTypes from "prop-types"
import styles from "./styles/EventCard.module.css"

// 🧭 Função que garante exibição correta da data independente do fuso horário
const parseLocalDate = (dateString) => {
    // Cria a data como se fosse UTC, evitando offset de timezone local
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(Date.UTC(year, month - 1, day))
}

const EventCard = ({ event }) => {
    // 📅 Formata a data completa (ex: 13 de outubro de 2025)
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = parseLocalDate(dateString)
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    // 📆 Mostra apenas dia e mês (ex: 13/10)
    const formatDateMonth = (dateString) => {
        if (!dateString) return ""
        const date = parseLocalDate(dateString)
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        })
    }

    // ⏰ Formata o horário (mantém HH:MM)
    const formatTime = (timeString) => {
        return timeString ? timeString.substring(0, 5) : ""
    }

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
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        location: PropTypes.string.isRequired,
        event_date: PropTypes.string.isRequired,
        event_time: PropTypes.string,
    }).isRequired,
}

export default EventCard
