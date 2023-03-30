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
            heading: 'Pokédex',
            subHeading: 'Pokédex was invented by Professor Oak.',
            image: pokepik,
        },
        2: {
            heading: 'Pokémon Fandom',
            subHeading: 'Find every single detail of \n any pokémon you want.',
            image: charizard,
        },
        3: {
            heading: 'Set Favorites',
            subHeading: 'Create a separate section for \n your favorite pokémon.',
            image: list,
        },
    };
    const { heading, subHeading, image } = screenMap[position];

    return (
        <GestureRecognizer
            onSwipeLeft={() => onLeftSwipe()}
            onSwipeRight={() => onRightSwipe()}
            config={config}
            style={styles.gesture}
        >
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.heading}>{heading}</Text>
                    <Text style={styles.subHeading}>{subHeading}</Text>
                </View>
            </View>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    gesture: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      image: {
        width: 360,
        resizeMode: 'contain',
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        width: '100%',
      },
      heading: {
        fontSize: 28,
        fontFamily: Fonts.fontBold,
        color: '#17171B',
      },
      subHeading: {
        color: '#747476',
        marginTop: -10,
        fontSize: 18,
        fontFamily: Fonts.fontRegular,
        textAlign: 'center',
      },
});

export default OnBoardCard;
