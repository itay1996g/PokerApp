// @/components/Setup

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Player, Blinds, Settings } from '@/types';

type PokerSetupProps = {
    settings: Settings;
    onSetupComplete: (players: Player[], blinds: Blinds) => void;
};

export default function Setup({ settings, onSetupComplete }: PokerSetupProps) {
    const [numPlayers, setNumPlayers] = useState(settings.players);
    const [smallBlind, setSmallBlind] = useState(settings.blinds.small);
    const [bigBlind, setBigBlind] = useState(settings.blinds.big);
    const [buyInAmount, setBuyInAmount] = useState(1000);
    const [myPlayer, setMyPlayer] = useState(1);
    const [dealer, setDealer] = useState(1);

    const handleStartGame = () => {
        if (numPlayers < 2 || numPlayers > 10) {
            Alert.alert(
                'Invalid Number of Players',
                'Please enter a number between 2 and 10 players.'
            );
            return;
        }

        const players: Player[] = Array.from(
            { length: numPlayers },
            (_, i) => ({
                id: i + 1,
                name: `P ${i + 1}`,
                chips: buyInAmount,
                role: '',
                status: '',
                bet: 0,
                isMe: i + 1 === Number(myPlayer), // Mark this player as "me"
            })
        );

        // Assign roles: dealer, small blind, big blind
        players[dealer - 1].role = 'dealer';
        if (numPlayers > 1) players[dealer % numPlayers].role = 'small blind';
        if (numPlayers > 2)
            players[(dealer + 1) % numPlayers].role = 'big blind';

        onSetupComplete(players, { small: smallBlind, big: bigBlind });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Poker Game Setup</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Number of Players (2-10)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(numPlayers)}
                    onChangeText={(text) => setNumPlayers(Number(text))}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Buy-In Amount</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(buyInAmount)}
                    onChangeText={(text) => setBuyInAmount(Number(text))}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Small Blind</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(smallBlind)}
                    onChangeText={(text) => setSmallBlind(Number(text))}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Big Blind</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(bigBlind)}
                    onChangeText={(text) => setBigBlind(Number(text))}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.pickerGroup}>
                    <Text style={[styles.label, styles.pickerLabel]}>
                        Select Your Player
                    </Text>
                    <Picker
                        selectedValue={myPlayer}
                        onValueChange={(itemValue) => setMyPlayer(itemValue)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        {Array.from({ length: numPlayers }, (_, i) => (
                            <Picker.Item
                                key={i + 1}
                                label={`P ${i + 1}`}
                                value={i + 1}
                            />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerGroup}>
                    <Text style={[styles.label, styles.pickerLabel]}>
                        Select Dealer
                    </Text>
                    <Picker
                        selectedValue={dealer}
                        onValueChange={(itemValue) => setDealer(itemValue)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        {Array.from({ length: numPlayers }, (_, i) => (
                            <Picker.Item
                                key={i + 1}
                                label={`P ${i + 1}`}
                                value={i + 1}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Start Game" onPress={handleStartGame} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        padding: 12,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        textAlign: 'left',
    },
    pickerLabel: {
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 6,
        borderRadius: 4,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pickerGroup: {
        flex: 1,
        marginHorizontal: 4,
    },
    picker: {
        height: 30,
        width: '100%',
    },
    pickerItem: {
        fontSize: 12,
    },
    buttonContainer: {
        paddingTop: 200,
        alignItems: 'center',
        marginBottom: 20,
    },
});
