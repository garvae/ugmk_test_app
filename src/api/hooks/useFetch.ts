import useSWR from 'swr';

/**
 * Основной фетчер с расширенным функционалом.
 * Реэкспортируем таким образом, чтобы использовать именованный экспорт
 */
export const useFetch = useSWR;