import React, {
    Component
}
from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput
}
from 'react-native';

import Logo from './components/Logo/index.js';
import Mixer from './components/Mixer/index.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#404',
    }
});

let ReactNativeDemo = (props) => {
    return <View style={styles.container}>
        <Logo/>
        <Mixer/>
    </View>;
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);