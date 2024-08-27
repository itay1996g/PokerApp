import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    TapGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { ACTION, Player, PokerRound, Stats, RoundStatus } from '@/types';
import {
    findNextActivePlayer,
    updatePlayerBet,
    calculateTotalPot,
} from '@/utils/helpers';

export type PokerGameProps = {
    record: Record<PokerRound, Stats>;
    settings: {
        blinds: {
            small: number;
            big: number;
        };
    };
    onRoundStatsUpdate: (roundStats: Stats, roundName: PokerRound) => void;
    onAbortGame: () => void;
};

export default function PokerGame({
    record,
    settings,
    onRoundStatsUpdate,
    onAbortGame,
}: PokerGameProps) {
    const [currentPhase, setCurrentPhase] = useState<PokerRound>(
        PokerRound.PREFLOP
    );
    const [players, setPlayers] = useState<Player[]>(
        record[currentPhase].players
    );
    const [pot, setPot] = useState<number>(0);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [currentBet, setCurrentBet] = useState<number>(0);
    const [lastRaiseIndex, setLastRaiseIndex] = useState<number | null>(null);
    const [isSliderVisible, setSliderVisible] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(0);

    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasFolded = useRef(new Set<number>()); // Track players who have already folded

    useEffect(() => {
        preflop();
    }, []);

    const resetBetsForNewRound = () => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) => ({
                ...player,
                bet: 0,
                status: '',
            }))
        );
        setCurrentBet(0);
    };

    const prepareMewRound = () => {
        resetBetsForNewRound();
        const nextPlayerIndex = findNextActivePlayer(players, 0); // Start with the first active player
        setCurrentPlayerIndex(nextPlayerIndex);
        setLastRaiseIndex(null);
        updateRoundStatus(currentPhase, RoundStatus.STARTED);
    };

    const advancePhase = () => {
        const phaseStats: Stats = {
            players,
            pot,
            status: RoundStatus.FINISHED,
        };

        onRoundStatsUpdate(phaseStats, currentPhase);

        if (currentPhase === PokerRound.RIVER) {
            // Handle the showdown or end game logic and save to DB
            return;
        }

        // we want the start the round with the same stats as in previous round
        const nextPhase = getNextPhase(currentPhase);
        onRoundStatsUpdate(
            { ...phaseStats, status: RoundStatus.STARTED },
            nextPhase
        );
        setCurrentPhase(nextPhase);

        prepareMewRound();
    };

    const getNextPhase = (phase: PokerRound): PokerRound => {
        switch (phase) {
            case PokerRound.PREFLOP:
                return PokerRound.FLOP;
            case PokerRound.FLOP:
                return PokerRound.TURN;
            case PokerRound.TURN:
                return PokerRound.RIVER;
            default:
                return PokerRound.RIVER;
        }
    };

    const checkForPhaseCompletion = () => {
        const activePlayers = players.filter(
            (player) => player.status !== ACTION.FOLD && player.chips > 0
        );

        const allPlayersCalledOrFolded = activePlayers.every(
            (player) =>
                player.bet === currentBet || player.status === ACTION.FOLD
        );

        if (allPlayersCalledOrFolded) {
            advancePhase();
        } else {
            const nextPlayerIndex = findNextActivePlayer(
                players,
                currentPlayerIndex
            );
            setCurrentPlayerIndex(nextPlayerIndex);
        }
    };

    const handlePlayerAction = (
        playerId: number,
        action: ACTION,
        amount: number = 0
    ) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.map((player) => {
                if (player.id !== playerId) return player;

                let newPlayer = updatePlayerBet(player, action, amount);

                if (action === ACTION.BET || action === ACTION.ALLIN) {
                    if (newPlayer.bet > currentBet) {
                        setCurrentBet(newPlayer.bet);
                        setLastRaiseIndex(currentPlayerIndex);
                    }
                }

                return newPlayer;
            });

            const totalPot = calculateTotalPot(updatedPlayers);
            setPot(totalPot);

            return updatedPlayers;
        });

        updateRoundStatus(currentPhase, RoundStatus.STARTED);
        checkForPhaseCompletion();
    };

    const assignBlinds = (players: Player[]) => {
        const playersBlinds = players.map((player) => {
            if (player.role === 'small blind') {
                return {
                    ...player,
                    chips: player.chips - settings.blinds.small,
                    bet: settings.blinds.small,
                };
            } else if (player.role === 'big blind') {
                return {
                    ...player,
                    chips: player.chips - settings.blinds.big,
                    bet: settings.blinds.big,
                };
            }
            return player;
        });

        setPlayers(playersBlinds);
    };

    const preflop = () => {
        const adjustedPot = settings.blinds.small + settings.blinds.big;
        setPot(adjustedPot);
        assignBlinds(players);
        setCurrentBet(settings.blinds.big);

        // Set the next player's index (the player after the big blind)
        const bigBlindIndex = players.findIndex(
            (player) => player.role === 'big blind'
        );
        const nextPlayerIndex = findNextActivePlayer(players, bigBlindIndex);

        setCurrentPlayerIndex(nextPlayerIndex);

        setLastRaiseIndex(null);
    };

    const updateRoundStatus = (roundName: PokerRound, status: RoundStatus) => {
        onRoundStatsUpdate({ ...record[roundName], status }, roundName);
    };

    const getPlayerRoleShort = (role: string) => {
        switch (role) {
            case 'small blind':
                return 'SB';
            case 'big blind':
                return 'BB';
            case 'dealer':
                return 'D';
            default:
                return '';
        }
    };

    const endGame = () => {
        // Logic to determine the winner, if needed
        Alert.alert(
            'Game Over',
            'Implement the logic to calculate the winner here.'
        );
        // Reset the game
        onAbortGame();
    };

    const currentPlayer = players[currentPlayerIndex];

    const onGestureEvent = (event) => {
        if (event.nativeEvent.numberOfPointers === 1) {
            if (event.nativeEvent.translationY < -50) {
                // Scroll up gesture detected
                console.log('SHOW SLIDER');
                setSliderVisible(true);
            } else if (event.nativeEvent.translationY > 50) {
                console.log('HIDE SLIDER');
                setSliderVisible(false);
            }
        } else if (
            event.nativeEvent.translationY > 50 &&
            event.nativeEvent.numberOfPointers === 2
        ) {
            console.log('FOLD GESTURE');
            // Clear the previous timeout if it exists
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            // Set a new timeout to debounce the gesture
            debounceTimeout.current = setTimeout(() => {
                handlePlayerAction(currentPlayer.id, ACTION.FOLD);
                hasFolded.current.add(currentPlayer.id); // Mark the player as folded
            }, 300); // 300ms delay for debouncing
        }
    };

    const onTwoTap = (event) => {
        if (event.nativeEvent.state === State.END) {
            console.log('TWO TAP GESTURE');
            handlePlayerAction(
                currentPlayer.id,
                currentBet === currentPlayer.bet ? ACTION.CHECK : ACTION.CALL
            );
        }
    };

    const onThreeTap = (event) => {
        if (event.nativeEvent.state === State.END) {
            console.log('THREE TAP GESTURE');
            handlePlayerAction(currentPlayer.id, ACTION.ALLIN);
        }
    };

    const threeTapRef = useRef();
    const twoTapRef = useRef();

    const handleSliderComplete = () => {
        console.log('Slider Complete: ', sliderValue);

        if (sliderValue > 0) {
            handlePlayerAction(currentPlayer.id, ACTION.BET, sliderValue);
        }

        // Dissolve the slider
        setSliderVisible(false);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <TapGestureHandler
                    ref={threeTapRef}
                    numberOfTaps={3}
                    onHandlerStateChange={onThreeTap}
                >
                    <TapGestureHandler
                        ref={twoTapRef}
                        numberOfTaps={2}
                        onHandlerStateChange={onTwoTap}
                        waitFor={threeTapRef}
                    >
                        <View style={styles.scrollContainer}>
                            <View>
                                <View style={styles.header}>
                                    <Text style={styles.pot}>Pot: {pot}</Text>
                                </View>
                                {Object.entries(record)
                                    .filter(
                                        ([, roundStats]) =>
                                            roundStats.status !==
                                            RoundStatus.PENDING
                                    )
                                    .map(([roundName, roundStats]) => (
                                        <View
                                            key={roundName}
                                            style={styles.roundContainer}
                                        >
                                            <View
                                                style={styles.playersContainer}
                                            >
                                                {players.map(
                                                    (player, index) => (
                                                        <View
                                                            key={player.id}
                                                            style={[
                                                                styles.player,
                                                                index ===
                                                                    currentPlayerIndex &&
                                                                    styles.activePlayer,
                                                                player.isMe &&
                                                                    styles.myPlayer,
                                                                player.status ===
                                                                    ACTION.CHECK &&
                                                                    styles.checkPlayer,
                                                                player.status ===
                                                                    ACTION.FOLD &&
                                                                    styles.foldPlayer,
                                                                player.status ===
                                                                    ACTION.ALLIN &&
                                                                    styles.allInPlayer,
                                                            ]}
                                                        >
                                                            <Text>
                                                                {player.isMe
                                                                    ? 'Me'
                                                                    : player.name}{' '}
                                                                {getPlayerRoleShort(
                                                                    player.role
                                                                )}{' '}
                                                                - {player.chips}{' '}
                                                                - {player.bet}
                                                            </Text>
                                                        </View>
                                                    )
                                                )}
                                            </View>
                                            {[
                                                RoundStatus.STARTED,
                                                RoundStatus.FINISHED,
                                            ].includes(roundStats.status) && (
                                                <Text
                                                    style={styles.verticalText}
                                                >
                                                    {roundName}
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                            </View>
                            {isSliderVisible && (
                                <BlurView
                                    intensity={50}
                                    tint="light"
                                    style={styles.sliderContainer}
                                >
                                    <Slider
                                        style={{
                                            width: 40,
                                            height: 900, // Increase the height to span most of the screen
                                            transform: [{ rotate: '-90deg' }],
                                            backgroundColor: 'transparent',
                                        }}
                                        minimumValue={0}
                                        maximumValue={currentPlayer.chips}
                                        value={sliderValue}
                                        onValueChange={setSliderValue}
                                        onSlidingComplete={handleSliderComplete}
                                        step={1} // Adjust value by 1 unit
                                    />
                                    <Text style={styles.sliderValue}>
                                        Bet: {sliderValue}
                                    </Text>
                                </BlurView>
                            )}
                        </View>
                    </TapGestureHandler>
                </TapGestureHandler>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f7f7f7',
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 4,
        paddingTop: 40,
    },
    roundContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: 10,
    },
    playersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    player: {
        width: '26%', // Adjust the width for each player box
        marginBottom: 4,
        marginRight: '2%', // Space between columns
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        fontSize: 10, // Smaller font size for each player
    },
    activePlayer: {
        backgroundColor: '#e8f5e9',
    },
    myPlayer: {
        backgroundColor: '#d1ecf1',
    },
    checkPlayer: {
        backgroundColor: '#ccffcc', // Light green
        color: '#006600', // Dark green
    },
    foldPlayer: {
        backgroundColor: '#ffcccc', // Light red
        color: '#990000', // Dark red
    },
    allInPlayer: {
        backgroundColor: '#e6ccff', // Light purple
        color: '#660099', // Dark purple
    },
    sliderContainer: {
        position: 'absolute',
        top: '10%', // Adjust to better fit your design
        left: '50%',
        transform: [{ translateX: -20 }],
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 8,
        elevation: 5,
    },
    sliderValue: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    verticalText: {
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        position: 'absolute',
        right: 0,
        top: '50%',
        textAlign: 'right',
        color: '#333',
        textShadowColor: '#ccc',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    header: {
        padding: 10,
    },
    pot: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
        color: '#333',
    },
});
