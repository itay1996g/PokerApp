import { Player, ACTION } from '@/types';

export function findNextActivePlayer(
    players: Player[],
    startIndex: number
): number {
    let nextIndex = startIndex;
    do {
        nextIndex = (nextIndex + 1) % players.length;
    } while (
        players[nextIndex].status === ACTION.FOLD ||
        players[nextIndex].status === ACTION.ALLIN ||
        players[nextIndex].chips === 0
    );
    return nextIndex;
}

export function updatePlayerBet(
    player: Player,
    action: ACTION,
    amount: number
): Player {
    let newChips = player.chips;
    let newBet = player.bet;

    switch (action) {
        case ACTION.BET:
        case ACTION.ALLIN:
            const betAmount = Math.min(amount, player.chips);
            newChips -= betAmount;
            newBet += betAmount;
            break;
        case ACTION.CALL:
            const callAmount = Math.min(amount - player.bet, player.chips);
            newChips -= callAmount;
            newBet += callAmount;
            break;
        case ACTION.CHECK:
            break;
        case ACTION.FOLD:
            newBet = player.bet; // Keeps the bet as is, player just folds.
            break;
    }

    return { ...player, chips: newChips, bet: newBet, status: action };
}

export function calculateTotalPot(players: Player[]): number {
    return players.reduce((total, player) => total + player.bet, 0);
}
