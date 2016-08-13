import React, { Component } from 'react';
import { 

    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    Picker

} from 'react-native';

import ChemType from './ChemType.js';
import NumberInput from './NumberInput.js';
import Debug from './Debug.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    columns: {
        flexDirection: 'column',
    },
    hr: {
        height: 2,
        backgroundColor: '#CCF',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 5,
        flex: 1,
        justifyContent: 'space-between'
    },
    text: {
        color: '#FFF',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#CCF',
        padding: 5,
        color: '#444',
        textAlign: 'center',
    },
    remove: {
        backgroundColor: '#CCF',
        borderColor: '#CAC',
        borderWidth: 2,
        borderRadius: 3,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
});

class Mixer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bottleSize: 30,
            pg: 20,
            vg: 80,
            nicBase: 72,
            nicType: 'vg',
            nicMg: 10,
            items: [],
        }

        // base values

        this.setValue = (name, value) => {
            let obj = {[name]: value};

            if (name == 'pg') {
                obj.vg = 100-value;
            }
            else if (name == 'vg') {
                obj.pg = 100-value;
            }
            else if (name == 'nicPct') {
                obj = {nicMg: String(parseInt(value*10))}
            }

            this.setState(obj);
        }

        // items

        this.addItem = () => {
            let items = this.state.items;
            items.push({
                ml: 3,
                type: 'pg'
            });
            this.setState({items});
        }

        this.removeItem = (index) => {
            let items = this.state.items;
            items.splice(index, 1);
            this.setState({items});
        }

        this.setItemValue = (index, value) => {
            let items = this.state.items;
            items[index].ml = +value;
            this.setState({items});
        }

        this.setItemType = (index, value) => {
            let items = this.state.items;
            items[index].type = value;
            this.setState({items});
        }

        // calculation

        this.getAmt = (num) => {
            return (num * this.state.bottleSize / 100).toFixed(2);
        }
        this.getItemPct = (ml) => {
            return (ml / this.state.bottleSize * 100).toFixed(2);
        }
        this.getItemAmt = (ml) => {
            return this.getAmt(this.getItemPct(ml));
        }
    }

    render() {

        let state = this.state;

        let nicPct = (state.nicMg / state.nicBase * 100).toFixed(2);

        let baseLiq = {
            pg: state.pg,
            vg: state.vg,
        }

        baseLiq[state.nicType] -= nicPct;

        // remove flavour liquid from base liquids
        state.items.forEach((item) => {

            baseLiq[item.type] -= this.getItemPct(item.ml);

        })

        return <View style={styles.container}>

            <Debug
                enabled={false}
                data={state}/>

            <View style={styles.columns}>

                <View style={styles.item}>
                    <Text style={styles.text}>
                        Nicotine 
                    </Text>
                    <Text style={styles.text}>
                        {(+nicPct).toFixed(2)}% {this.getAmt(nicPct)}ml
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.text}>
                        PG
                    </Text>
                    <Text style={styles.text}>
                        {baseLiq.pg.toFixed(2)}% {this.getAmt(baseLiq.pg)}ml
                    </Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.text}>
                        VG
                    </Text>
                    <Text style={styles.text}>
                        {baseLiq.vg.toFixed(2)}% {this.getAmt(baseLiq.vg)}ml
                    </Text>
                </View>

                {state.items.map((item, i) => (
                    <View 
                        key={i}
                        style={styles.item}>
                        
                        <NumberInput
                            index={i}
                            unit="ml"
                            step="1"
                            min="0"
                            value={item.ml}
                            setValue={this.setItemValue}/>

                        <ChemType
                            index={i}
                            value={item.type}
                            setValue={this.setItemType}/>

                        <Text style={styles.text}>
                            {this.getItemPct(item.ml)}% {this.getItemAmt(item.ml)}ml
                        </Text>

                        <TouchableNativeFeedback 
                            onPress={
                                this.removeItem.bind(this, i)
                            }>
                            <View style={styles.remove}>
                                <Text style={{
                                    marginTop: -2
                                }}>
                                    x
                                </Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                ))}

            </View>

            <View style={styles.hr}/>

            <View style={styles.row}>

                <NumberInput
                    label="Bottle Size"
                    unit="ml"
                    valueName="bottleSize"
                    step="10"
                    min="0"
                    value={state.bottleSize}
                    setValue={this.setValue}/>

            </View>

            <View style={styles.row}>

                <NumberInput
                    label="PG"
                    valueName="pg"
                    step="10"
                    min="0"
                    max="100"
                    value={state.pg}
                    setValue={this.setValue}/>

                <NumberInput
                    label="VG"
                    valueName="vg"
                    step="10"
                    min="0"
                    max="100"
                    value={state.vg}
                    setValue={this.setValue}/>

            </View>

            <View style={styles.row}>

                <NumberInput
                    label="Nicotine"
                    unit="mg/ml"
                    valueName="nicMg"
                    step="2"
                    min="0"
                    value={state.nicMg}
                    setValue={this.setValue}/>

                <NumberInput
                    label="( Or"
                    unit="% )"
                    valueName="nicPct"
                    step="0.2"
                    min="0"
                    max="100"
                    value={state.nicMg/10}
                    setValue={this.setValue}/>

            </View>

            <View style={styles.row}>

                <NumberInput
                    label="Nicotine Base"
                    unit="mg/ml"
                    valueName="nicBase"
                    step="5"
                    min="0"
                    max="72"
                    value={state.nicBase}
                    setValue={this.setValue}/>

                <ChemType
                    valueName="nicType"
                    value={state.nicType}
                    setValue={this.setValue}/>

            </View>

            <TouchableHighlight 
                onPress={this.addItem}>
                <Text style={styles.button}>
                    Add Flavour
                </Text>
            </TouchableHighlight>
        </View>;
    }

}
export default Mixer;