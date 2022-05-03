import {when} from "jest-when";
import featureToggleService from './FeatureToggleService'
import apiService from "../../../helpers/apiService";

jest.mock('../../../helpers/apiService');

describe('Show Service', () => {

    it('should return all shows', async () => {
        const data = {
            "MOVIE_SCHEDULE": true,
            "CHANGE_PASSWORD": true,
            "CUSTOMER_SIGN_UP" : true,
            "VIEW_USER_PROFILE" : true
        };
        apiService.get.mockResolvedValue({data: data});
        
        const features = await featureToggleService.fetch();

        expect(Object.values(features)).toHaveLength(4);
        expect(features).toEqual({ 
                "MOVIE_SCHEDULE": true,
                "CHANGE_PASSWORD": true,
                "CUSTOMER_SIGN_UP" : true,
                "VIEW_USER_PROFILE" : true
        });
    });
});
