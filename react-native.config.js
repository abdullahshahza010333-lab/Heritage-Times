const disableSquareIos = process.env.DISABLE_SQUARE_IOS === '1';

module.exports = {
    dependencies: disableSquareIos
        ? {
            'mobile-payments-sdk-react-native': {
                platforms: {
                    ios: null,
                },
            },
        }
        : {},
};
