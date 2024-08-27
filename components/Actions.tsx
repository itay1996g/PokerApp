// @/components/Actions

import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { Player, ACTION } from '@/types';

type ActionsProps = {
    currentPlayer: Player;
    currentBet: number;
    onAction: (action: ACTION, amount?: number) => void;
    isDisabled: boolean;
};

export default function Actions({
    currentPlayer,
    currentBet,
    onAction,
    isDisabled,
}: ActionsProps) {
    const [betAmount, setBetAmount] = useState<number>(0);

    const handleBet = () => {
        const amount = Math.min(betAmount, currentPlayer.chips);
        onAction(ACTION.BET, amount);
        setBetAmount(0);
    };

    const handleCall = () => {
        const callAmount = Math.min(
            currentBet - currentPlayer.bet,
            currentPlayer.chips
        );
        onAction(ACTION.CALL, callAmount);
    };

    const handleCheck = () => {
        onAction(ACTION.CHECK);
    };

    const handleAllIn = () => {
        onAction(ACTION.ALLIN, currentPlayer.chips);
    };

    const handleFold = () => {
        onAction(ACTION.FOLD);
    };

    const handleBetAmountChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        setBetAmount(Number(numericValue));
    };

    const canRaise = currentPlayer.chips > currentBet;
    const minRaiseAmount = currentBet - currentPlayer.bet;
    const canCheck = currentBet === currentPlayer.bet;
    const canCall = !canCheck && currentPlayer.chips >= minRaiseAmount;

    return (
        <View style={styles.container}>
            {canRaise && (
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(betAmount)}
                    onChangeText={handleBetAmountChange}
                    placeholder="Enter Bet Amount"
                    editable={!isDisabled}
                />
            )}
            <View style={styles.buttonRow}>
                {canCheck && (
                    <Button
                        title="Check"
                        onPress={handleCheck}
                        disabled={isDisabled}
                    />
                )}
                {canCall && (
                    <Button
                        title="Call"
                        onPress={handleCall}
                        disabled={isDisabled}
                    />
                )}
                {canRaise && (
                    <Button
                        title="Raise"
                        onPress={handleBet}
                        disabled={
                            isDisabled ||
                            betAmount <= minRaiseAmount ||
                            betAmount > currentPlayer.chips
                        }
                    />
                )}
                {currentPlayer.chips > 0 && (
                    <Button
                        title="All-In"
                        onPress={handleAllIn}
                        disabled={isDisabled}
                    />
                )}
                <Button
                    title="Fold"
                    onPress={handleFold}
                    disabled={isDisabled}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
