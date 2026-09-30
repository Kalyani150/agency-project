export function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

export function nextId(items) {
  if (!items.length) {
    return 1;
  }

  return (
    Math.max(
      ...items.map(
        (item) => Number(item.id) || 0
      )
    ) + 1
  );
}