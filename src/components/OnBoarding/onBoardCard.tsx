/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Fonts } from '../../HelperStyles';
import { onBoardingScreenMap } from '../../utils/constants';

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

const OnBoardCard = ({onLeftSwipe, onRightSwipe, config, position}: OnBoardCardProps) => {
    const { heading, subHeading, image } = onBoardingScreenMap[position];

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
        gap: 48,
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
