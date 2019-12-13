import React, {Component} from 'react';
import {Text, View } from 'react-native';
import { Card } from 'react-native-elements'
import getRatingAPI from "../API/hasuraAPI/getRatingAPI";

export default class Reviews extends Component {
    constructor(props){
        super(props)
        this.state ={
            updated: false,
        }
        this.ratings = [];
        if (this.loadRatings()) {
        }
    }
    // This function calls the rating api and fetches the ratings, storing them in the state.
    loadRatings = async () => {
    
        this.ratings = [];
        const ratingsInfo = {
          user_id: 1
        };
        // Calling the getRatingAPI API
        let getRatingResponse = await getRatingAPI(ratingsInfo);
        if (getRatingResponse.status != 200) {
          this.ShowDatabaseError();
          return;
        }
        const resultResponseGetRating = await getRatingResponse.json();
        for (const key in resultResponseGetRating) {
          this.ratings.push({
            user_id: resultResponseGetRating[key].user_id,
            product_id: resultResponseGetRating[key].product_id,
            /*Join*/
            product_name: resultResponseGetRating[key].product_name,
            id: resultResponseGetRating[key].id,
            ratingLevel: resultResponseGetRating[key].ratinglevel,
            ratingDescription: resultResponseGetRating[key].ratingDescription
          });
        }
        this.forceUpdate(); //Force the page to rerender with the changes
      }

      render() {
        // The render method maps the reviews that were fetched and keeps rendering them until it reaches the end of the list
        let review = this.ratings.map((rev, index) => {
            return(
                
              <View key = {[index]}>
               {rev.product_name === this.props.prodName ?
                  (
                    <Card
                      title={rev.product_name}
                    >
                      <Text style={{marginBottom: 10}}>
                        {rev.ratingDescription}
                      </Text>
                      
                      <Text style={{fontWeight: 'bold'}}>
                        Rating: {rev.ratingLevel}
                      </Text>
                    </Card>
                  ) : (null)}
              </View>
            )
        })
        return(
            <View style = {{flex: 1, flexDirection: "row", backgroundColor: 'white'}}>
            {review}
            </View>
        )
    }
}

//added by Jordan Dickerson
