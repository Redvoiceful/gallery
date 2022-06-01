export interface uUrls {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
}

export interface uLinks {
    self: string
    html: string
    download: string
    download_location: string
}

export interface uUser {
    id: string,
    updated_at: string,
    username: string,
    name: string,
    first_name: string,
    last_name: string,
    twitter_username: string,
    portfolio_url: string,
    bio: string,
    location: string,
    links: uUserLinks,
    profile_image: uUserProfileImage,
    instagram_username: string,
    total_collections: number,
    total_likes: number,
    total_photos: number,
    accepted_tos: boolean,
    for_hire: boolean,
    social: object
}

export interface uUserLinks {
    self: string,
    html: string,
    photos: string,
    likes: string,
    portfolio: string,
    following: string,
    followers: string
}

export interface uUserProfileImage {
    small: string
    medium: string
    large: string
}

export interface uPhotos {
    id: string
    created_at: string,
    updated_at: string,
    promoted_at: string,
    width: number,
    height: number,
    color: string,
    blur_hash: string,
    description: string,
    alt_description: string,
    urls: uUrls,
    links: uLinks,
    categories: any,
    likes: number,
    liked_by_user: boolean,
    current_user_collections: any,
    sponsorship: object,
    topic_submissions: object,
    user: uUser
    price: number
}