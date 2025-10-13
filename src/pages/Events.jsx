import { useState, useEffect } from "react"
import EventListItem from "../components/Events/EventListItem"
import styles from "./styles/Events.module.css"
import { eventService } from '../services/eventService';
import EventSlider from "../components/General/Slider";

const Events = () => {
    const [pastEvents, setPastEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const { past } = await eventService.getEvents()
            setPastEvents(past)
        } catch (err) {
            setError(err.message)
            console.error("Erro ao buscar eventos:", err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.eventsPage}>
                <div className="container">
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Carregando eventos...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.eventsPage}>
                <div className="container">
                    <div className={styles.error}>
                        <p>Erro ao carregar eventos: {error}</p>
                        <button onClick={fetchEvents} className={styles.retryButton}>
                            Tentar novamente
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.eventsPage}>
            <div className="container">
                {/* Seção de Eventos Próximos */}
                <section className={styles.projectsSlider}>
                    <EventSlider />
                </section>

                {/* Seção de Eventos Anteriores */}
                {pastEvents.length > 0 && (
                    <section className={styles.pastEvents}>
                        <div className={styles.sectionHeader}>
                            <h2>Eventos Anteriores</h2>
                            <p>1 lista de eventos</p>
                        </div>

                        <div className={styles.eventsList}>
                            {pastEvents.map((event) => (
                                <EventListItem key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Events