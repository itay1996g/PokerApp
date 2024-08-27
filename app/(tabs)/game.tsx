import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PokerSetup from '@/components/Setup';
import PokerGame from '@/components/Game';
import {
    Player,
    PokerRound,
    Stats,
    Settings,
    RoundStatus,
    Game,
} from '@/types';
import { useGameStatus } from '@/context/GameStatusContext'; // Ensure this is correctly imported

const NEW_GAME: Game = Object.values(PokerRound).reduce((acc, roundName) => {
    acc[roundName as PokerRound] = {
        players: [],
        pot: 0,
        status: RoundStatus.PENDING,
    };
    return acc;
}, {} as Game);

const DEFAULT_SETTINGS = {
    players: 9,
    blinds: { small: 10, big: 20 },
};

export default function PokerApp() {
    const [record, setRecord] = useState<Game>(NEW_GAME);
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [gameStarted, setGameStarted] = useState(false);
    const { setIsGameActive } = useGameStatus();

    const handleSetupComplete = (
        players: Player[],
        blinds: { small: number; big: number }
    ) => {
        setSettings({ players: players.length, blinds });
        setRecord({
            ...NEW_GAME,
            [PokerRound.PREFLOP]: {
                players,
                pot: 0,
                status: RoundStatus.STARTED,
            },
        });
        setGameStarted(true);
        setIsGameActive(true);
    };

    const handleAbortGame = () => {
        setGameStarted(false);
        setRecord(NEW_GAME);
        setSettings(DEFAULT_SETTINGS);
        setIsGameActive(false);
    };

    const handleRoundStatsUpdate = (
        roundStats: Stats,
        roundName: PokerRound
    ) => {
        setRecord((prevRecord) => ({
            ...prevRecord,
            [roundName]: roundStats,
        }));
    };

    return (
        <View style={styles.container}>
            {!gameStarted ? (
                <PokerSetup
                    settings={settings}
                    onSetupComplete={handleSetupComplete}
                />
            ) : (
                settings && (
                    <PokerGame
                        record={record}
                        settings={settings}
                        onRoundStatsUpdate={handleRoundStatsUpdate}
                        onAbortGame={handleAbortGame}
                    />
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
