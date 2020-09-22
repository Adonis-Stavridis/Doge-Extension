export const characters = new Set([
  "abomination",
  "bigbro",
  "caeser",
  "cheems",
  "doge",
  "dogelas",
  "engineer",
  "heavy",
  "henry",
  "isabelle",
  "jim",
  "karen",
  "kiddoge",
  "kyle",
  "kylie",
  "lilbro",
  "loafe",
  "milton",
  "monke",
  "murphy",
  "perro",
  "petyr",
  "phishe",
  "phoebe",
  "rupert",
  "soldier",
  "spym",
  "stuff",
  "swagcat",
  "walter"
]);

export function characterMarkdown(name: string, path: string) {
  return '![' + name + '](' + path + '/out/img/' + name + '.png "' + name + '")';
}
