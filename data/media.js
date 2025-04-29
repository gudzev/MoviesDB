export class Media
{
    mediaId;
    mediaTitle;
    mediaRating;
    mediaPosterPath;
    mediaLanguage;
    mediaPopularity;
    mediaDescription;

    constructor(mediaData)
    {
        this.mediaId = mediaData.mediaId;
        this.mediaTitle = mediaData.mediaTitle;
        this.mediaRating = (mediaData.mediaRating).toFixed(2);
        this.mediaPosterPath = mediaData.mediaPosterPath;
        this.mediaLanguage = mediaData.mediaLanguage;
        this.mediaPopularity = mediaData.mediaPopularity;
        this.mediaDescription = mediaData.mediaDescription;
    }
}

export class Movie extends Media
{
    constructor(mediaData)
    {
        super(mediaData);
    }
}

export class Series extends Media
{
    constructor(mediaData)
    {
        super(mediaData);
    }
}