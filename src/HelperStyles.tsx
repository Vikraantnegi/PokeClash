/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const Fonts = {
    fontBlack: 'Poppins-Black',
    fontBold: 'Poppins-Bold',
    fontExtraBold: 'Poppins-ExtraBold',
    fontMedium: 'Poppins-Medium',
    fontSemi: 'Poppins-SemiBold',
    fontLight: 'Poppins-Light',
    fontRegular: 'Poppins-Regular',
    fontThin: 'Poppins-Thin',
  };

export const HelperStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#d53f27',
        position: 'relative',
    },
});

export const AuthStyles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 20,
    },
    headerText: {
        fontFamily: Fonts.fontBold,
        fontSize: 24,
        lineHeight: 28,
        color: '#FFF',
        textAlign: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    subText: {
        fontFamily: Fonts.fontRegular,
        fontSize: 16,
        lineHeight: 20,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 8,
        alignSelf: 'center',
        width: '90%',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    formContainer: {
        flex: 3,
        gap: 20,
        paddingHorizontal: 12,
        paddingTop: 32,
    },
    actionCenter: {
        flex: 1,
        gap: 8,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    submitCTA: {
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 8,
        alignSelf: 'center',
    },
    submitCTAText: {
        fontSize: 20,
        color: '#d53f27',
        textAlign: 'center',
        fontFamily: Fonts.fontBold,
    },
    secondaryCTA: {
        borderRadius: 8,
        width: '100%',
        backgroundColor: '#d53f27',
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 8,
        alignSelf: 'center',
    },
    secondaryCTAText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontFamily: Fonts.fontBold,
    },
    errorText: {
        fontFamily: Fonts.fontRegular,
        fontSize: 16,
        lineHeight: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    forgotText: {
        fontFamily: Fonts.fontSemi,
        fontSize: 14,
        lineHeight: 16,
        color: '#FFF',
        marginTop: -8,
        textAlign: 'right',
    },
});
