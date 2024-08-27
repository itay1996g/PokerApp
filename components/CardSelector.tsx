import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cardsSVGMap } from '@/utils/cardsSVGMap';
import PlaceCard from '@/assets/images/cards/placecard';

const suits = [
    { name: 'Hearts', emoji: '♥️' },
    { name: 'Diamonds', emoji: '♦️' },
    { name: 'Clubs', emoji: '♣️' },
    { name: 'Spades', emoji: '♠️' },
];

const ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
];

const cardHeight = 250; // The height of the card
const marginVertical = 4; // Vertical margin for each card
const snapToInterval = cardHeight + 1 * marginVertical; // Card height + total vertical margin

const CardSelector = ({ onSelectCard, suit, rank, selectedCards }) => {
    const [selectedSuit, setSelectedSuit] = useState(suit || undefined);
    const [selectedRank, setSelectedRank] = useState(rank || undefined);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        onSelectCard(selectedSuit, selectedRank);
    }, [selectedRank, selectedSuit]);

    const handleMomentumScrollEnd = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        // Calculate the index of the closest card to the center
        const index = Math.round(offsetY / snapToInterval);

        // Automatically set the selected rank based on the snapped index
        if (selectedSuit) {
            const filteredRanks = filterRanks(selectedSuit);
            const newRank =
                filteredRanks[Math.min(index, filteredRanks.length - 1)];
            setSelectedRank(newRank);

            // Ensure the card is fully centered after selection
            scrollToIndex(index);
        }
    };

    const scrollToIndex = (index) => {
        if (scrollViewRef.current) {
            // Calculate the center offset
            const containerHeight = 200; // Fixed height of the ScrollView container
            const yOffset =
                index * snapToInterval - (containerHeight - snapToInterval) / 2;
            scrollViewRef.current.scrollTo({
                y: yOffset,
                animated: true,
            });
        }
    };

    const filterRanks = (selectedSuit) => {
        return ranks.filter((rank) => {
            const cardKey = `${rank}-${selectedSuit}`;
            return (
                !selectedCards.includes(cardKey) ||
                cardKey === `${selectedRank}-${selectedSuit}`
            );
        });
    };

    return (
        <View style={styles.cardSelectorContainer}>
            <ScrollView
                style={styles.suitScrollView}
                showsVerticalScrollIndicator={false}
            >
                {suits.map((suit) => (
                    <TouchableOpacity
                        key={suit.name}
                        onPress={() => setSelectedSuit(suit.name)}
                        style={[
                            styles.suitButton,
                            selectedSuit === suit.name &&
                                styles.selectedSuitButton,
                        ]}
                    >
                        <Text style={styles.suitEmoji}>{suit.emoji}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.scrollViewContainer}>
                <LinearGradient
                    colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
                    style={styles.topGradient}
                />
                {selectedSuit ? (
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.cardScrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.cardContentContainer}
                        snapToInterval={snapToInterval} // Adjusted snapping interval
                        snapToAlignment="center"
                        decelerationRate="normal" // Make snapping feel more responsive
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                    >
                        {filterRanks(selectedSuit).map((rank, index) => {
                            const cardKey = `${rank}-${selectedSuit}`;
                            const CardSVG = cardsSVGMap[cardKey];

                            return (
                                <View
                                    key={cardKey}
                                    style={styles.cardTouchable}
                                >
                                    {CardSVG && (
                                        <CardSVG
                                            style={styles.cardImage}
                                            width={150}
                                            height={cardHeight}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : (
                    <PlaceCard
                        style={styles.cardImage}
                        width={150}
                        height={cardHeight}
                    />
                )}
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                    style={styles.bottomGradient}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardSelectorContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    suitScrollView: {
        width: 50,
        height: 200,
        marginRight: 16,
    },
    suitButton: {
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSuitButton: {
        backgroundColor: '#D0D0D0',
    },
    suitEmoji: {
        fontSize: 24,
    },
    scrollViewContainer: {
        flex: 1,
        position: 'relative',
        height: 200,
    },
    cardScrollView: {
        flex: 1,
        height: 200,
    },
    cardContentContainer: {
        paddingVertical: marginVertical,
    },
    cardTouchable: {
        opacity: 0.7,
        marginVertical: marginVertical,
        alignItems: 'center',
    },
    cardImage: {
        marginTop: -25,
    },
    topGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        zIndex: 1,
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        zIndex: 1,
    },
});

export default CardSelector;
