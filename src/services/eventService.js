import { parseLocalDate } from "../utils/parseLocalDate";
import api from "./api";

const isDevelopment = import.meta.env.MODE === "development";

// 📅 Garante que os eventos tenham campos de data válidos e consistentes
const formatEventData = (event) => {
    const eventTime = event.event_time || "00:00";
    const eventDate = parseLocalDate(event.event_date, eventTime);

    const isValid = !isNaN(eventDate.getTime());

    // Normaliza para formato visível (YYYY-MM-DD)
    const normalizedDate = isValid
        ? `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`
        : "";

    return {
        ...event,
        event_date: normalizedDate,
        event_time: eventTime,
        event_datetime: isValid ? eventDate : null,
        image_url: event.image_url || "/placeholder.svg",
        location: event.location || "Local a definir",
        status: event.status || "pendente",
    };
};

export const eventService = {
    async getEvents() {
        try {
            const response = await api.get("/api/events");
            const { events } = response.data;

            if (!Array.isArray(events)) {
                throw new Error("Formato de resposta inválido da API");
            }

            // Normaliza todas as datas
            const formattedEvents = events.map(formatEventData);

            // Data/hora atual
            const now = new Date();

            // Separa próximos e passados
            const upcoming = formattedEvents.filter(
                (e) =>
                    e.event_datetime &&
                    e.event_datetime >= now &&
                    e.status !== "cancelado"
            );
            const past = formattedEvents.filter(
                (e) =>
                    e.event_datetime &&
                    e.event_datetime < now &&
                    e.status !== "cancelado"
            );

            // Ordena
            upcoming.sort((a, b) => a.event_datetime - b.event_datetime);
            past.sort((a, b) => b.event_datetime - a.event_datetime);

            return {
                upcoming: upcoming.slice(0, 6),
                past: past.slice(0, 10),
                all: formattedEvents,
            };
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            throw error;
        }
    },
};
