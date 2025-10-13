import api from "./api"

const isDevelopment = import.meta.env.MODE === "development"

// 🧭 Função que garante que a data seja interpretada exatamente como enviada (sem offset)
const parseLocalDate = (dateString, timeString = "00:00") => {
    if (!dateString) return new Date()
    const [year, month, day] = dateString.split("-").map(Number)
    const [hours, minutes] = timeString.split(":").map(Number)
    // Cria uma data UTC exata sem aplicar o fuso horário local
    return new Date(Date.UTC(year, month - 1, day, hours, minutes))
}

const formatEventData = (event) => {
    // Garante formato de hora
    const eventTime = event.event_time || "00:00"

    // Usa UTC para manter a data idêntica ao backend
    const eventDate = parseLocalDate(event.event_date, eventTime)

    return {
        ...event,
        // Mantém a data original (sem timezone shift)
        event_date: event.event_date,
        event_time: eventTime,
        // Data/hora combinadas em UTC para comparações seguras
        event_datetime: eventDate,
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

            // 🧩 Normaliza e corrige fuso horário
            const formattedEvents = events.map(formatEventData)

            // 🔥 Data atual em UTC para comparação justa
            const now = new Date()
            const nowUTC = new Date(
                Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes())
            )

            // 🔎 Separa futuros e passados (ignora cancelados)
            const upcoming = formattedEvents.filter(
                (event) => event.event_datetime >= nowUTC && event.status !== "cancelado"
            )

            const past = formattedEvents.filter(
                (event) => event.event_datetime < nowUTC && event.status !== "cancelado"
            )

            // 📅 Ordenação coerente
            upcoming.sort((a, b) => a.event_datetime - b.event_datetime)
            past.sort((a, b) => b.event_datetime - a.event_datetime)

            return {
                upcoming: upcoming.slice(0, 6), // próximos 6
                past: past.slice(0, 10), // últimos 10
            }
        } catch (error) {
            console.error("Erro ao buscar eventos:", error)
            throw error
        }
    },
}
