export type Player = {
    id: number;
    name: string;
    chips: number;
    role: string;
    status: string;
    bet: number;
    isMe: boolean;
};

export type Blinds = {
    small: number;
    big: number;
};

export enum PokerRound {
    PREFLOP = 'PRE-FLOP',
    FLOP = 'FLOP',
    TURN = 'TURN',
    RIVER = 'RIVER',
}

export type Settings = {
    players: number;
    blinds: Blinds;
};

export type Stats = {
    players: Player[];
    pot: number;
    status: RoundStatus;
};

export enum ACTION {
    BET = 'bet',
    CHECK = 'check',
    CALL = 'call',
    ALLIN = 'all-in',
    FOLD = 'fold',
}

export type Round = {
    name: PokerRound;
    players: Player[];
    pot: number;
};

export enum RoundStatus {
    PENDING = 'pending',
    STARTED = 'started',
    FINISHED = 'finished',
}

export type Game = Record<PokerRound, Stats>;
