"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock } from "lucide-react"
import styles from "./styles/Slider.module.css"
import { eventService } from '../../services/eventService'

export default function EventSlider() {
    const [events, setEvents] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [slidesToShow, setSlidesToShow] = useState(3)

    // Refs
    const sliderRef = useRef(null)

    // Load events
    useEffect(() => {
        let isMounted = true

        const loadEvents = async () => {
            try {
                setLoading(true)
                setError(null)
                const { upcoming } = await eventService.getEvents()

                if (isMounted) {
                    // Transformar os dados para o formato esperado pelo slider
                    const formattedEvents = upcoming.map(event => ({
                        id: event.id,
                        title: event.title,
                        location: event.location,
                        description: event.description,
                        date: new Date(event.event_date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }),
                        time: new Date(event.event_date).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        dayMonth: new Date(event.event_date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit'
                        }),
                        image_url: event.image_url || "/placeholder.svg?height=300&width=400",
                        status: event.status
                    }))
                    setEvents(formattedEvents)
                }
            } catch (err) {
                if (isMounted) {
                    setError("Erro ao carregar eventos")
                    console.error("Erro ao buscar eventos:", err)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadEvents()

        return () => {
            isMounted = false
        }
    }, [])

    // Handle resize
    useEffect(() => {
        if (typeof window === "undefined") return

        const handleResize = () => {
            const width = window.innerWidth

            if (width < 768) {
                setSlidesToShow(1)
            } else if (width < 1024) {
                setSlidesToShow(2)
            } else {
                setSlidesToShow(3)
            }
        }

        // Set initial values
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Reset slide when slidesToShow changes
    useEffect(() => {
        if (events.length > 0) {
            const maxSlide = Math.max(0, events.length - slidesToShow)
            if (currentSlide > maxSlide) {
                setCurrentSlide(maxSlide)
            }
        }
    }, [slidesToShow, events.length, currentSlide])

    const maxSlide = Math.max(0, events.length - slidesToShow)

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
    }, [maxSlide])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }, [])

    const goToSlide = useCallback(
        (index) => {
            const targetSlide = Math.max(0, Math.min(index, maxSlide))
            setCurrentSlide(targetSlide)
        },
        [maxSlide],
    )

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Nossos Eventos</h1>
                    <p className={styles.subtitle}>Próximos eventos</p>
                </div>
                <div className={styles.loading} role="status" aria-label="Carregando eventos">
                    <div className={styles.spinner} aria-hidden="true"></div>
                    <p>Carregando eventos...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Nossos Eventos</h1>
                    <p className={styles.subtitle}>Próximos eventos</p>
                </div>
                <div className={styles.error} role="alert">
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    if (events.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Nossos Eventos</h1>
                    <p className={styles.subtitle}>Próximos eventos</p>
                </div>
                <div className={styles.empty}>
                    <p>Nenhum evento encontrado</p>
                </div>
            </div>
        )
    }

    const showNavigation = events.length > slidesToShow;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Nossos Eventos</h1>
                <p className={styles.subtitle}>Próximos eventos</p>
            </div>

            <div className={styles.sliderContainer}>
                <div className={styles.slider} ref={sliderRef}>
                    <div
                        className={styles.slidesTrack}
                        style={{
                            transform: showNavigation ? `translateX(-${currentSlide * (100 / slidesToShow)}%)` : 'none',
                            gridTemplateColumns: showNavigation
                                ? `repeat(${events.length}, ${100 / slidesToShow}%)`
                                : `repeat(${events.length}, 1fr)`,
                            gap: showNavigation ? '0' : '20px'
                        }}
                    >
                        {events.map((event) => (
                            <div key={event.id} className={styles.slide}>
                                <article className={styles.eventCard}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={event.image_url}
                                            alt={`Imagem do evento: ${event.title}`}
                                            className={styles.image}
                                            loading="lazy"
                                        />
                                        <div className={styles.dateBadge}>
                                            <span className={styles.dateText}>{event.dayMonth}</span>
                                        </div>
                                    </div>

                                    <div className={styles.content}>
                                        <h3 className={styles.eventTitle}>{event.title}</h3>

                                        <div className={styles.eventDetails}>
                                            <div className={styles.detail}>
                                                <MapPin size={16} className={styles.icon} />
                                                <span className={styles.detailText}>{event.location}</span>
                                            </div>

                                            <div className={styles.detail}>
                                                <Calendar size={16} className={styles.icon} />
                                                <span className={styles.detailText}>{event.date}</span>
                                            </div>

                                            <div className={styles.detail}>
                                                <Clock size={16} className={styles.icon} />
                                                <span className={styles.detailText}>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {showNavigation && currentSlide > 0 && (
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={prevSlide}
                            aria-label="Slide anterior"
                        >
                            <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                    )}

                    {showNavigation && currentSlide < maxSlide && (
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={nextSlide}
                            aria-label="Próximo slide"
                        >
                            <ChevronRight size={20} aria-hidden="true" />
                        </button>
                    )}

                    {/* Indicators */}
                    {showNavigation && maxSlide > 0 && (
                        <div className={styles.indicators} role="tablist" aria-label="Indicadores de slide">
                            {Array.from({ length: maxSlide + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.indicator} ${index === currentSlide ? styles.active : ""}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Ir para slide ${index + 1}`}
                                    aria-selected={index === currentSlide}
                                    role="tab"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
