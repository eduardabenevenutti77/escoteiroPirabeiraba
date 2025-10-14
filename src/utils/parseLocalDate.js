export const parseLocalDate = (dateString) => {
    if (!dateString) return new Date();

    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-").map(Number);
    
    return new Date(year, month - 1, day);
};
