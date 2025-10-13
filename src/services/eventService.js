import api from './api';

const isDevelopment = import.meta.env.MODE === 'development';

const formatEventData = (event) => {
    const eventDate = new Date(event.event_date);
    const eventTime = event.event_time || '00:00:00';

    // Combina a data e hora do evento
    const [hours, minutes] = eventTime.split(':');
    eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    return {
        ...event,
        event_date: eventDate.toISOString(),
        // Garante que todos os campos necessários existam
        image_url: event.image_url || '/placeholder.svg',
        location: event.location || 'Local a definir',
        status: event.status || 'pendente'
    };
};

export const eventService = {
    async getEvents() {
        try {
            // if (isDevelopment) {
            //     // Simular um pequeno delay para simular uma chamada de API
            //     await new Promise(resolve => setTimeout(resolve, 500));

            //     const now = new Date();

            //     // Separar eventos futuros e passados, excluindo os cancelados
            //     const upcoming = mockEvents.filter((event) =>
            //         new Date(event.event_date) >= now && event.status !== 'cancelado'
            //     );
            //     const past = mockEvents.filter((event) =>
            //         new Date(event.event_date) < now && event.status !== 'cancelado'
            //     );

            //     // Ordenar eventos
            //     upcoming.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
            //     past.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

            //     return {
            //         upcoming: upcoming.slice(0, 6), // Mostrar apenas os próximos 6
            //         past: past.slice(0, 10) // Mostrar apenas os últimos 10
            //     };
            // }

            const response = await api.get('/api/events', {
                // headers: {
                //     'x-api-key': import.meta.env.VITE_API_KEY,
                // }
            });

            const { events } = response.data;

            if (!Array.isArray(events)) {
                throw new Error("Formato de resposta inválido da API");
            }

            // Formata os dados dos eventos
            const formattedEvents = events.map(formatEventData);

            const now = new Date();

            // Separar eventos futuros e passados, excluindo os cancelados
            const upcoming = formattedEvents.filter((event) =>
                new Date(event.event_date) >= now && event.status !== 'cancelado'
            );
            const past = formattedEvents.filter((event) =>
                new Date(event.event_date) < now && event.status !== 'cancelado'
            );

            // Ordenar eventos
            upcoming.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
            past.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

            return {
                upcoming: upcoming.slice(0, 6), // Mostrar apenas os próximos 6
                past: past.slice(0, 10) // Mostrar apenas os últimos 10
            };
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            throw error;
        }
    }
}; 