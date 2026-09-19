export type Answers = Record<string, string>

const STORAGE_KEY = 'relic_answers'

export function loadAnswers(): Answers {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveAnswers(partial: Answers) {
  const current = loadAnswers()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }))
}
