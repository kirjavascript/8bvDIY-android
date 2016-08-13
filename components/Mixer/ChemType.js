import React, { Component } from 'react';
import { 

    StyleSheet,
    Picker

} from 'react-native';

const styles = StyleSheet.create({
    pick: {
        width: 60,
        padding: 0,
        color: '#CFC',
        marginTop: -15,
        marginBottom: -15,
    },
});

let ChemType = (props) => {

    function setValue(value) {
        if (props.valueName && props.setValue) {
            props.setValue(props.valueName, value)
        }
        else if (props.setValue
                && typeof props.index != 'undefined') {
            props.setValue(props.index, value)
        }
    }

    return <Picker 
        mode="dropdown"
        selectedValue={props.value}
        onValueChange={setValue}
        style={styles.pick}
        itemStyle={styles.item}>
        <Picker.Item label="PG" value="pg" />
        <Picker.Item label="VG" value="vg" />
    </Picker>

}

export default ChemType;