const Store = require('electron-store');

let store = new Store();

exports.generateSelectedStats = (stats, gameSettings) => {
    let generatedStats = [];
    let statsSettings = store.get('statsSettings');

    for (var i = 0; i < gameSettings.players.length; i++) {
        let playerStats = [];
        if (statsSettings.showLCancelPercent) {
            let lCancelPercentStat = {
                label: 'LCancel percent',
                value: Math.floor((stats.actionCounts[i].lCancelCount.success / (stats.actionCounts[i].lCancelCount.success + stats.actionCounts[i].lCancelCount.fail)) * 100)
            };
            playerStats.push(lCancelPercentStat);
        }
    
        if (statsSettings.showAnalogAPM) {
            let analogAPMStat = {
                label: 'Analog APM',
                value: Math.floor(stats.overall[i].inputsPerMinute.ratio)
            };
            playerStats.push(analogAPMStat);
        }
    
        if (statsSettings.showDigitalAPM) {
            let digitalAPMStat = {
                label: 'Digital APM',
                value: Math.floor(stats.overall[i].digitalInputsPerMinute.ratio)
            };
            playerStats.push(digitalAPMStat);
        }
        generatedStats.push(playerStats);
    }
    return generatedStats;
};