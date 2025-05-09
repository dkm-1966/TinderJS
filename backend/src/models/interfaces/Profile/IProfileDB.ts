export default interface IProfileDB {
    id: number,
    name: string,
    age: number,
    info: string,
    country: string,
    city: string,
    user_id: number,
    profile_id: number,
    // interest_id: number,
    interests: string[],
    // category_id: number,
    // category: string,
    picture_url: string
}