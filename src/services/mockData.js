export const mockEvents = [
    {
        id: 1,
        title: "Acampamento de Verão",
        description: "Um acampamento emocionante com atividades ao ar livre",
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias no futuro
        location: "Parque Municipal",
        image_url: "https://picsum.photos/800/400",
        registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        max_participants: 50,
        current_participants: 25
    },
    // {
    //     id: 5,
    //     title: "Acampamento de Verão",
    //     description: "Um acampamento emocionante com atividades ao ar livre",
    //     event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias no futuro
    //     location: "Parque Municipal",
    //     image_url: "https://picsum.photos/800/400",
    //     registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    //     max_participants: 50,
    //     current_participants: 25
    // },
    {
        id: 6,
        title: "Acampamento de Verão",
        description: "Um acampamento emocionante com atividades ao ar livre",
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias no futuro
        location: "Parque Municipal",
        image_url: "https://picsum.photos/800/400",
        registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        max_participants: 50,
        current_participants: 25
    },
    {
        id: 2,
        title: "Workshop de Nós",
        description: "Aprenda diferentes tipos de nós e suas aplicações",
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias no futuro
        location: "Sede do Grupo",
        image_url: "https://picsum.photos/800/401",
        registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        max_participants: 30,
        current_participants: 15
    },
    {
        id: 3,
        title: "Acampamento de Inverno",
        description: "Acampamento passado com atividades especiais",
        event_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias no passado
        location: "Serra Catarinense",
        image_url: "https://picsum.photos/800/402",
        registration_deadline: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        max_participants: 40,
        current_participants: 40
    },
    {
        id: 4,
        title: "Gincana Escoteira",
        description: "Gincana passada com diversas provas e desafios",
        event_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 dias no passado
        location: "Parque da Cidade",
        image_url: "https://picsum.photos/800/403",
        registration_deadline: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
        max_participants: 100,
        current_participants: 80
    }
]; 