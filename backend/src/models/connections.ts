import { Category } from "./Category";
import { Interests } from "./Interests";
import { Match } from "./Match";
import { Picture } from "./Picture";
import { Profile } from "./Profile";
import { User } from "./User";
import { UserInterest } from "./UserInterest";

// User 1:1 Profile
User.hasOne(Profile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Profile N:M Interest через user_interest
Profile.belongsToMany(Interests, {
    through: UserInterest,
    foreignKey: 'profile_id',
    otherKey: 'interest_id', 
    onDelete: 'CASCADE'
});
Interests.belongsToMany(Profile, {
    through: UserInterest,
    foreignKey: 'interest_id',
    otherKey: 'profile_id',
    onDelete: 'CASCADE'
});

// Interest -> Category
Interests.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Category.hasMany(Interests, { foreignKey: 'category_id', onDelete: 'CASCADE' });

// Profile 1:M Picture
Profile.hasMany(Picture, { foreignKey: 'profile_id', onDelete: 'CASCADE' });
Picture.belongsTo(Profile, { foreignKey: 'profile_id', onDelete: 'CASCADE' });

//Profle N:M Match
Match.belongsTo(Profile, { as: 'FirstPartner', foreignKey: 'first_partner', onDelete: 'CASCADE' });
Match.belongsTo(Profile, { as: 'SecondPartner', foreignKey: 'second_partner', onDelete: 'CASCADE' });

Profile.hasMany(Match, { as: 'MatchesAsFirst', foreignKey: 'first_partner', onDelete: 'CASCADE' });
Profile.hasMany(Match, { as: 'MatchesAsSecond', foreignKey: 'second_partner', onDelete: 'CASCADE' });




















