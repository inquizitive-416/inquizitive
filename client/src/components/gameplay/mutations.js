
import gql from "graphql-tag";

export const UPDATE_RATING = gql`
    mutation UpdateRating($_id: String, $avgRating: Int, $numOfTimesPlayed: Int ) {
        updateRating(_id: $_id, avgRating :$avgRating, numOfTimesPlayed: $numOfTimesPlayed)
    }
`;
