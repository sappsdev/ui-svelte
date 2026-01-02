import { BrowserWindow } from "electrobun/bun";

const isDev = process.env.NODE_ENV === "development" || Bun.argv.includes("--dev");

const devUrl = "http://localhost:5173";
const prodUrl = "views://mainview/index.html";

const mainWindow = new BrowserWindow({
    title: "UI Svelte Desktop",
    url: isDev ? devUrl : prodUrl,
    frame: {
        width: 1200,
        height: 800,
        x: 200,
        y: 200,
    },
});

console.log(`UI Svelte Desktop started in ${isDev ? "development" : "production"} mode`);
console.log(`Loading URL: ${isDev ? devUrl : prodUrl}`);
