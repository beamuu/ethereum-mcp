# Ethereum MCP

A TypeScript-based Ethereum Model Context Protocol (MCP) server.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
# Run in development mode with ts-node
npm run dev

# Build the project
npm run build

# Run the compiled JavaScript
npm start

# Watch mode (rebuild on file changes)
npm run watch

# Clean build directory
npm run clean
```

## 📁 Project Structure

```
ethereum-mcp/
├── src/           # TypeScript source files
│   └── index.ts   # Main entry point
├── dist/          # Compiled JavaScript (generated)
├── package.json   # Project configuration
├── tsconfig.json  # TypeScript configuration
└── README.md      # This file
```

## 🛠️ Development

This project is set up with:

- **TypeScript 5.x** - Type-safe JavaScript
- **ts-node** - Run TypeScript directly in development
- **@types/node** - Node.js type definitions
- **Strict TypeScript config** - Enhanced type checking

## 📝 Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode
- `npm start` - Run compiled JavaScript
- `npm run watch` - Watch for changes and rebuild
- `npm run clean` - Remove build artifacts

## 🤝 Contributing

1. Make your changes in the `src/` directory
2. Test with `npm run dev`
3. Build with `npm run build`
4. Commit your changes

## 📄 License

MIT
