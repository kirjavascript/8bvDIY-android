import React, { Component } from 'react';
import { 

    Image,
    Text,
    View,
    StyleSheet,
    Linking,
    TouchableHighlight

} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        margin: 10
    },
    textWrap: {
        margin: 20,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    sub: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    
    link: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'steelblue',
        textDecorationLine: 'underline',
    }
});

function openURL() {
    Linking.openURL('http://8bitvape.co.uk');
}

let Logo = props => {

    return <View style={styles.container}>
        <View style={styles.textWrap}>
            <Text style={styles.main}>
                8BitVape
            </Text>
            <Text style={styles.sub}>
                Mixing Calculator
            </Text>
            <TouchableHighlight 
                onPress={openURL}>
                <Text style={styles.link}>
                    8bitvape.co.uk
                </Text>
            </TouchableHighlight>
        </View>
        <Image 
            style={styles.image}
            source={require('./logo.png')}/>
    </View>;

}

export default Logo;