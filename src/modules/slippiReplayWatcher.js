
const { SlippiGame } = require("@slippi/slippi-js");
const chokidar = require("chokidar");
const _ = require("lodash");
const fs = require('fs');

let watcher;
let running = false;

exports.start = async (slippiReplayDir, gameStartCallback, gameEndCallback) => {

    if (!fs.existsSync(slippiReplayDir)) {
        return false;
    }

    if (running) return true;

    watcher = chokidar.watch(slippiReplayDir, {
        ignored: "!*.slp", // TODO: This doesn't work. Use regex?
        depth: 0,
        persistent: true,
        usePolling: true,
        ignoreInitial: true,
    });

    const gameByPath = {};

    watcher.on("change", (path) => {
        let gameState, gameSettings, stats, frames, latestFrame, gameEnd
        try {
            let game = _.get(gameByPath, [path, "game"]);
            if (!game) {
                game = new SlippiGame(path, { processOnTheFly: true })
                gameByPath[path] = {
                    game: game,
                    state: {
                        settings: null,
                        detectedPunishes: {},
                    },
                }
            }

            gameState = _.get(gameByPath, [path, "state"]);
            gameSettings = game.getSettings();
            frames = game.getFrames();
            latestFrame = game.getLatestFrame();
            gameEnd = game.getGameEnd();

            if (gameEnd) stats = game.getStats()
        } catch (err) {
            console.error(err);
            return false;
        }

        if (!gameState.settings && gameSettings) {
            gameState.settings = gameSettings;
            gameStartCallback(gameSettings);
        }

        if (gameEnd) {
            gameEndCallback(gameSettings, stats);
        }
    });

    running = true;
    return true;
}

exports.stop = () => {
    if (watcher != undefined) watcher.close();
    running = false;
}