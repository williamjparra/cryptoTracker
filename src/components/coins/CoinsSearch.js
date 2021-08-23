/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from '../../res/colors';

class CoinSearch extends React.Component {
    state = {
        query: '',
    }

    handleText = (query) => {
        this.setState({query});

        if (this.props.onChange) {
            this.props.onChange(query);
        }
    }

    render() {

        const { query } = this.state;

        return (
            <View>
                <TextInput
                    styles={[
                        styles.textInput,
                        Platform.OS === 'ios' ?
                            styles.textInputIOS :
                            styles.textInputAndroid,
                    ]}
                    onChangeText={this.handleText}
                    value={query}
                    placeholder="Search coin"
                    placeholderTextColor="#fff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: '#fff',
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon,
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    },
});

export default CoinSearch;
