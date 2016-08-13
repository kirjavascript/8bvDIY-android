import React, { Component } from 'react';
import { 

    StyleSheet,
    Image,
    View,
    TextInput,
    Text,
    TouchableNativeFeedback

} from 'react-native';

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        width: 40,
        marginLeft: 0,
        marginRight: 0,
        color: '#CFC',
        marginTop: -10,
        marginBottom: -10,
        padding: 0,
        textAlign: 'center',
    },
    label: {
        color: '#FFF',
        fontSize: 14
    },
    boxWrap: {
        flexDirection: 'row',
    },
    box: {
        backgroundColor: '#EEE',
        borderColor: '#CCC',
        borderWidth: 2,
        borderRadius: 3,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: -10,
        marginBottom: -10,
    },
    boxText: {
        color: '#666',
        fontSize: 20,
        marginTop: -2,
        fontWeight: 'bold'
    }
});

class NumberInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.focus = () => {
            this.setState({open: true})
        }

        this.blur = () => {
            this.setState({open: false})
        }

        this.submit = () => {
            this.refs.input.blur();
        }

        this.setValue = (value) => {

            // base value
            if (this.props.setValue
                && this.props.valueName) {
                if (this.props.min && +value < this.props.min) {
                    value = this.props.min;
                }
                if (this.props.max && +value > this.props.max) {
                    value = this.props.max;
                }
                this.props.setValue(this.props.valueName, +value);
            }
            // item value
            else if (this.props.setValue
                && typeof this.props.index != 'undefined') {
                this.props.setValue(this.props.index, +value);
            }
        }

        this.getStep = () => {
            return parseFloat(this.props.step || 10);
        }

        this.stepDown = () => {
            let value = +this.props.value - this.getStep();
            this.setValue(value);
        }

        this.stepUp = () => {
            this.setValue(+this.props.value + this.getStep());
        }

        this.onChange = (value) => {
            this.setValue(value);
        }
    }

    render() {

        let props = this.props;

        return <View style={styles.wrap}>
        {!this.state.open ? 

            <Text style={styles.label}>
                {props.label}
            </Text>

        : null }

        <TextInput
            ref="input"
            onFocus={this.focus}
            onBlur={this.blur}
            onSubmitEditing={this.submit}
            onChangeText={this.onChange}
            value={String(props.value)}
            keyboardType="numeric"
            style={styles.input}/>

        {this.state.open ? 
            <View  style={styles.boxWrap}>
                <TouchableNativeFeedback 
                    onPress={this.stepDown}>
                    <View style={styles.box}>
                        <Text style={styles.boxText}>-</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback 
                    onPress={this.stepUp}>
                    <View style={styles.box}>
                        <Text style={styles.boxText}>+</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        : null}

        {!this.state.open ? 

            <Text style={styles.label}>
                {props.unit}
            </Text>

        : null }
    </View>;
    }
}

export default NumberInput;