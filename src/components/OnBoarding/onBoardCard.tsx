/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Fonts } from '../../HelperStyles';
import pokepik from '../../assets/pokepik.png';
import charizard from '../../assets/charizard.png';
import list from '../../assets/list.png';

interface GestureConfig {
    velocityThreshold: number,
    directionalOffsetThreshold: number,
}

interface OnBoardCardProps {
    onLeftSwipe: Function,
    onRightSwipe: Function,
    config: GestureConfig
    position: number,
}

interface HashMap {
    [key: number]: any;
    [key: string]: any;
}

const OnBoardCard = ({onLeftSwipe, onRightSwipe, config, position}: OnBoardCardProps) => {
    const screenMap: HashMap = {
        1: {
            heading: 'Explore Pokemons',
            subHeading: 'Discover new and rare species of Pokemons and learn about their strengths, weaknesses and special abilities.',
            // image: pokepik,
        },
        2: {
            heading: 'Search Pokemons',
            subHeading: 'Find the Pokemons you want quickly and easily usng our powerful search feature with different filters.',
            // image: charizard,
        },
        3: {
            heading: 'Manage Favorites',
            subHeading: 'Keep track of your favorite Pokemons and access them easily whenever you want.',
            // image: list,
        },
    };
    const { heading, subHeading, image } = screenMap[position];

    return (
        <GestureRecognizer
            onSwipeLeft={() => onLeftSwipe()}
            onSwipeRight={() => onRightSwipe()}
            config={config}
            style={cardStyles.gesture}
        >
            <View style={cardStyles.container}>
                <View style={cardStyles.content}>
                    { heading && <Text style={cardStyles.heading}>{heading}</Text> }
                    { subHeading && <Text style={cardStyles.subHeading}>{subHeading}</Text> }
                </View>
                { image && <Image source={image} style={cardStyles.image} /> }
            </View>
        </GestureRecognizer>
    );
};

const cardStyles = StyleSheet.create({
    gesture: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    heading: {
        fontFamily: Fonts.fontBold,
        fontSize: 32,
        lineHeight:  36,
        color: '#FFF',
    },
    subHeading: {
        fontFamily: Fonts.fontRegular,
        fontSize: 18,
        lineHeight:  24,
        color: '#FFF',
    },
});

export default OnBoardCard;
