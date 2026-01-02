import packageJson from "./package.json" assert { type: "json" };

export default {
    app: {
        name: "UI Svelte Desktop",
        identifier: "dev.ui-svelte.desktop",
        version: packageJson.version,
    },
    build: {
        bun: {
            entrypoint: "src/bun/index.ts",
            external: [],
        },
        views: {},
        copy: {
            "dist/": "views/mainview/",
        },
        mac: {
            bundleCEF: false,
        },
        linux: {
            bundleCEF: false,
        },
        win: {
            bundleCEF: false,
        },
    },
};