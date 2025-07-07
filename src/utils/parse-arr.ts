/**
 * Splits a loose-style JSON-like array literal into an array of tokens
 * without using eval.  Handles quoted strings and escaped quotes.
 */
function tokenize(input: string): string[] {
    const trimmed = input.trim();
    if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
        throw new Error('Input must start with "[" and end with "]"');
    }

    const inner = trimmed.slice(1, -1); // remove brackets
    const tokens: string[] = [];

    let buf = "";
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < inner.length; i++) {
        const ch = inner[i];
        const prev = inner[i - 1];

        if (inQuotes) {
            // End of quoted section (ignore escaped quotes)
            if (ch === quoteChar && prev !== "\\") {
                inQuotes = false;
            }
            buf += ch;
            continue;
        }

        if (ch === '"' || ch === "'") {
            inQuotes = true;
            quoteChar = ch;
            buf += ch;
            continue;
        }

        if (ch === ",") {
            tokens.push(buf.trim());
            buf = "";
            continue;
        }

        buf += ch;
    }

    if (buf.trim().length > 0) {
        tokens.push(buf.trim());
    }

    return tokens;
}

/* Helpers to decide primitive types */
const isDecimal = (value: string) => /^-?\d+(?:\.\d+)?$/.test(value);
const isBoolean = (value: string) => value === "true" || value === "false";

/**
 * Converts a token string into its proper JS value.
 * • Strings keep their content but surrounding quotes are removed.
 * • true / false → boolean
 * • null → null
 * • decimal numbers → number
 * • everything else stays a string (hex, identifiers, etc.)
 */
function castToken(token: string): any {
    // Quoted string
    if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'"))
    ) {
        const unquoted = token.slice(1, -1);
        return unquoted.replace(/\\(['"])/g, "$1"); // un-escape quotes
    }

    if (isBoolean(token)) return token === "true";
    if (token === "null") return null;
    if (isDecimal(token)) return Number(token);

    // Fallback: treat as string (covers 0xdeadbeef, identifiers, etc.)
    return token;
}

/**
 * Main entry: turn a loose array literal into a typed JS array.
 *
 * @example
 *   parseLooseArray('["true", true, 1234, 0xabc]')
 *   // → [ "true", true, 1234, "0xabc" ]
 */
export function parseLooseArray(input: string): any[] {
    return tokenize(input).map(castToken);
}
