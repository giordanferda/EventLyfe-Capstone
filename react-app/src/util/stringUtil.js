export function capitalizeWord(word) {
  const trimmedWord = word.trim();
  return trimmedWord[0].toUpperCase() + trimmedWord.slice(1).toLowerCase();
}
