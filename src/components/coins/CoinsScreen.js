/* eslint-disable prettier/prettier */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Http from '../../libs/http';
import Colors from '../../res/colors';

import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {

  state= {
    coins: [],
    loading: false,
    allCoins: [],
  }

  componentDidMount = async () => {
    this.getCoins();
  }

  getCoins = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');

    this.setState({coins: res.data, allCoins: res.data, loading: false});
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetails', { coin });
  }

  handleSearch = (query) => {
    const { allCoins } = this.state;

    const coinsFiltered = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
    });

    this.setState({coins: coinsFiltered});
  }

  render() {

    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch}/>
        { loading ?
          <ActivityIndicator
            color="#000"
            size="large"
            style={styles.loader}
          />
          : null
        }
        <FlatList
          data={coins}
          renderItem={({ item }) => <CoinsItem
            item={item}
            onPress={() => this.handlePress(item)}
          />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 16,
    padding: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
