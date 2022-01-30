const Store = require('electron-store');

let store = new Store();

exports.generateSelectedStats = (stats, gameSettings) => {
    let generatedStats = [];
    let statsSettings = store.get('statsSettings');

    for (var i = 0; i < gameSettings.players; i++) {
        let playerStats = [];
        if (statsSettings.showLCancelPercent) {
            let lCancelPercentStat = {
                label: 'LCancel percent',
                value: '12%'
            };
            playerStats.push(lCancelPercentStat);
        }
    
        if (statsSettings.showAnalogAPM) {
            let analogAPMStat = {
                label: 'Analog APM',
                value: '120'
            };
            playerStats.push(analogAPMStat);
        }
    
        if (statsSettings.showDigitalAPM) {
            let digitalAPMStat = {
                label: 'Digital APM',
                value: '120'
            };
            playerStats.push(digitalAPMStat);
        }
        generatedStats.push(playerStats);
    }
    return generatedStats;
};