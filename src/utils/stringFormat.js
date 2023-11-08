export function toPascalCase(text, trimSpace = false) {
  return text
    .split("_")
    .map((t) => t[0].toUpperCase() + t.slice(1).toLowerCase())
    .join(trimSpace ? "" : " ");
}
