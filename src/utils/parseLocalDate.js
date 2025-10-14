export const parseLocalDate = (dateString, timeString = "00:00") => {
    if (!dateString) return new Date();

    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-").map(Number);

    const [hours, minutes] = timeString.split(":").map(Number);

    return new Date(year, month - 1, day, hours || 0, minutes || 0);
};
