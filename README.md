# AutomationEditor

**AutomationEditor** is a frontend web application built using the [Symbols.app](https://symbols.app/) design system framework and [DOMQL](https://github.com/domql/domql) v3. It functions as a visual node-based automation editor, allowing users to drag, drop, configure, and connect various nodes (representing actions, assertions, and logic) on an infinite canvas to visually construct complex automation workflows.

## Features & Use Cases

### Features
*   **Visual Node-Based Editing:** Drag and drop nodes to represent different actions, assertions, and logic operators.
*   **Infinite Canvas:** A fully interactive viewport supporting complex zoom and pan transformations.
*   **Dynamic Wiring:** Connect node sockets with real-time, dynamic Bezier wire paths.
*   **Symbols.app Integration:** Built entirely with DOMQL objects, utilizing a rich design system and token-based styling.
*   **Advanced State Management:** Leverages DOMQL's built-in state engine to handle complex multi-node interactions, active selections, and coordinate synchronization.

### Use Cases
*   Designing and visualizing complex automation workflows or data pipelines.
*   Visually mapping logic flows, assertion chains, and decision trees.
*   Prototyping interactive diagrams and connected component architectures.

## Prerequisites

Before installing, ensure you have the following requirements met:
*   **Node.js**: Recommended latest LTS version (v18+).
*   **Package Manager**: `npm` (or `bun`).
*   **Dependencies**: Defined in `package.json` (requires `smbls` for the CLI and build process, and `parcel` for bundling).
*   **Peer Dependencies**: `@supabase/supabase-js` (^2.0.0).

## Installation

Follow these steps to set up the development environment locally:

1.  **Clone the repository:**
    ```bash
    git clone [INSERT REPOSITORY URL HERE]
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd [INSERT DIRECTORY NAME HERE]
    ```

3.  **Install local dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    ```bash
    # [INSERT ENV FILE SETUP COMMAND IF APPLICABLE, e.g., cp .env.example .env]
    # Required Environment Variables:
    # - [INSERT SUPABASE_URL HERE]
    # - [INSERT SUPABASE_ANON_KEY HERE]
    # - [INSERT ANY OTHER REQUIRED ENV VARS HERE]
    ```

## Running the Application

Use the following commands to run the application locally or build it for production. These scripts utilize the Symbols CLI (`smbls`) under the hood.

**Start the Development Server:**
```bash
npm start
```
*(Internally runs `npx smbls start`)*

**Build for Production:**
```bash
npm run build
```
*(Internally runs `npx smbls build`)*

**Deploy:**
```bash
npm run deploy
```
*(Internally runs `npx smbls deploy` and will prompt for deploy targets if not already configured)*

## Testing

Instructions for running the automated test suite.

```bash
# [INSERT TESTING COMMAND HERE]
# (Note: Test scripts are currently undefined in package.json)
```

## AI Assistance
This project is configured to work with the Symbols AI assistant. You can use it via the CLI:
```bash
npx smbls ask "your question here"
```
