import api from "./api"

const isDevelopment = import.meta.env.MODE === "development"

// 🧭 Converte a string de data para UTC sem deslocar o dia
const parseLocalDate = (dateString, timeString = "00:00") => {
    if (!dateString) return new Date()
    const [year, month, day] = dateString.split("-").map(Number)
    const [hours, minutes] = timeString.split(":").map(Number)

    // Garante que todos os números são válidos
    if (
        !year ||
        !month ||
        !day ||
        Number.isNaN(year) ||
        Number.isNaN(month) ||
        Number.isNaN(day)
    ) {
        return new Date("Invalid Date")
    }

    return new Date(Date.UTC(year, month - 1, day, hours || 0, minutes || 0))
}

// 📅 Garante que os eventos tenham campos de data válidos e consistentes
const formatEventData = (event) => {
    const eventTime = event.event_time || "00:00"
    const eventDate = parseLocalDate(event.event_date, eventTime)

    // ⚙️ Proteção: se a data for inválida, evita .toISOString()
    let normalizedDate = event.event_date
    if (!isNaN(eventDate.getTime())) {
        normalizedDate = eventDate.toISOString().split("T")[0]
    } else {
        console.warn("⚠️ Data inválida detectada:", event.event_date)
    }

    return {
        ...event,
        event_date: normalizedDate || "",
        event_time: eventTime,
        event_datetime: isNaN(eventDate.getTime()) ? null : eventDate, // evita erro de Date inválida
        image_url: event.image_url || "/placeholder.svg",
        location: event.location || "Local a definir",
        status: event.status || "pendente",
    }
}

export const eventService = {
    async getEvents() {
        try {
            const response = await api.get("/api/events")

            const { events } = response.data

            if (!Array.isArray(events)) {
                throw new Error("Formato de resposta inválido da API")
            }

            // 🧩 Normaliza todas as datas
            const formattedEvents = events.map(formatEventData)

            // 🔥 Cria referência de "agora" em UTC
            const now = new Date()
            const nowUTC = new Date(
                Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                    now.getUTCHours(),
                    now.getUTCMinutes()
                )
            )

            // 🕐 Separa próximos e passados (ignora cancelados)
            const upcoming = formattedEvents.filter(
                (event) =>
                    event.event_datetime &&
                    event.event_datetime >= nowUTC &&
                    event.status !== "cancelado"
            )

            const past = formattedEvents.filter(
                (event) =>
                    event.event_datetime &&
                    event.event_datetime < nowUTC &&
                    event.status !== "cancelado"
            )

            // 🗓️ Ordenação coerente
            upcoming.sort((a, b) => a.event_datetime - b.event_datetime)
            past.sort((a, b) => b.event_datetime - a.event_datetime)

            // ✅ Retorna com a data correta no payload
            return {
                upcoming: upcoming.slice(0, 6),
                past: past.slice(0, 10),
                all: formattedEvents, // útil para debug
            }
        } catch (error) {
            console.error("Erro ao buscar eventos:", error)
            throw error
        }
    },
}
