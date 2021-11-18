export const dateFormatter = (value, date: dateStyle = 'short', time: timeStyle = 'short') => Intl.DateTimeFormat('pt-BR', {
    dateStyle: date,
    timeStyle: time,
}).format(new Date(value));

export const dateWithoutTimeFormatter = (value, date: dateStyle = 'short') => Intl.DateTimeFormat('pt-BR', {
    dateStyle: date,
}).format(new Date(value));
