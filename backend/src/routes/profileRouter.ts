import {Router} from 'express';
import UserProfileController from '../controllers/UserProfileController';

const profileRouter = Router();

profileRouter.get('/profile', UserProfileController.getUserProfile);
profileRouter.post('/profile', UserProfileController.createUserProfile);
profileRouter.put('/profile', UserProfileController.updateUserProfile);
profileRouter.delete('/profile', UserProfileController.deleteUserProfile);
//get user
profileRouter.get('/user', UserProfileController.getUser);

export default profileRouter;