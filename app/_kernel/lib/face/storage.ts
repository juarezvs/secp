export type Person = {
  id: string;
  name: string;
  photo: string; // dataURL
  descriptor: number[]; // Float32Array as plain array for JSON
  createdAt: number;
};

export type RecognitionLog = {
  id: string;
  personId: string;
  personName: string;
  photo: string;
  distance: number;
  at: number;
};

const PEOPLE_KEY = "faceid:people";
const LOGS_KEY = "faceid:logs";

export function getPeople(): Person[] {
  try {
    return JSON.parse(localStorage.getItem(PEOPLE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePerson(p: Person) {
  const list = getPeople();
  list.unshift(p);
  localStorage.setItem(PEOPLE_KEY, JSON.stringify(list));
}

export function deletePerson(id: string) {
  const list = getPeople().filter((p) => p.id !== id);
  localStorage.setItem(PEOPLE_KEY, JSON.stringify(list));
}

export function getLogs(): RecognitionLog[] {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addLog(log: RecognitionLog) {
  const list = getLogs();
  list.unshift(log);
  // cap to 200 entries
  localStorage.setItem(LOGS_KEY, JSON.stringify(list.slice(0, 200)));
}

export function clearLogs() {
  localStorage.removeItem(LOGS_KEY);
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
