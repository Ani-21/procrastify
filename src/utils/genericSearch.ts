// функциональность поиска, которая может быть переиспользована:
// может быть применена к любому типу данных

// важно реализовать поиск ключевого слова (query)
// и вернуть массив данных, которые соответствуют свойствам объекта
export function genericSearch<T>(
  object: T,
  properties: Array<keyof T>,
  query: string
): boolean {
  if (query === "") {
    return true;
  }

  return properties.some((property) => {
    // сохраняем строковое свойство объекта в отдельную переменную
    const value = object[property];
    if (typeof value === "string") {
      // проверяем тип и возвращаем значение из списка TODO,
      // которое соответсвует запросу
      return value.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  });
}
