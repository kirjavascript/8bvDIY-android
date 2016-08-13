import React, { Component } from 'react';
import { 

    StyleSheet,
    Text

} from 'react-native';

const styles = StyleSheet.create({
    debug: {
        color: '#eff1f5',
        backgroundColor: '#bf616a',
        padding: 5,
        fontSize: 8
    },
});

let Debug = (props) => {

    return props.enabled ? <Text style={styles.debug}>
        {JSON.stringify(props.data,null,4)}
    </Text> : null;

}

export default Debug;