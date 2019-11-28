export function parse() {
  const args = process.argv;
  const result: { [key: string]: string | boolean } = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i] || "";
    const value = args[i + 1] || "";
    // "foo -x -y" ... { x: true, y: true };
    if (key.startsWith("-") && value.startsWith("-")) {
      i--;
      result[key] = true;
    } else
    // "foo -x"
    if (key.startsWith("-")) {

    }

    result[key] = value;
  }
  return result;
}