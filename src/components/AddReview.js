import React, {Component} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import { Container } from './styles';

export default class components extends Component {
  state = {
    name: '',
    rating: 0,
    comment: '',
    submitting: false,
  };

  close = () => {
    console.log('Close pressed');
    this.props.navigation.goBack();
  };

  componentDidMount() {
    AsyncStorage.getItem('reviewer_name').then(name => {
      if (name !== null && name !== undefined) {
        this.setState({name});
      }
    });
  }

  submitReview = async () => {
    this.setState({submitting: true});
    if (this.state.name !== null && this.state.name !== undefined) {
      await AsyncStorage.setItem('reviewer_name', this.state.name);
    }
    fetch('http://localhost:3000/review', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        rating: this.state.rating,
        comment: this.state.comment,
      }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({submitting: false}, () => {
          this.props.navigation.goBack();
        });
      })
      .catch(error => {
        this.setState({submitting: false});
      });
  };
  render() {
    return (
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <SafeAreaView style={styles.root}>
          <TouchableOpacity style={styles.button} onPress={this.close}>
            <Icon name="close" size={30} color="#0066CC" />
          </TouchableOpacity>
          <Text style={styles.addReview}>Add Review</Text>
          <TextInput
            style={styles.input}
            placeholder="Name (Optional)"
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />
          <Text style={styles.rating}>Your Rating:</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => {
              return (
                <TouchableOpacity
                  onPress={() => this.setState({rating: i})}
                  style={styles.starButton}
                  key={i}>
                  <Icon
                    name={'star'}
                    color={this.state.rating >= i ? '#FFD64C' : '#CCCCCC'}
                    size={40}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={[styles.input, {height: 100}]}
            placeholder="Review"
            value={this.state.review}
            onChangeText={review => this.setState({review})}
            multiline={true}
            numberOfLines={5}
          />
          {this.state.submitting && (
            <ActivityIndicator
              size="large"
              color="#0066CC"
              style={{padding: 10}}
            />
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.submitReview}
            disabled={this.state.submitting}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  addReview: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 15,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
  rating: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});
