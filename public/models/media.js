export class Media
{
    mediaId;
    mediaTitle;
    mediaRating;
    mediaPosterPath;
    mediaLanguage;
    mediaPopularity;
    mediaDescription;
    mediaType;
    mediaGenres;

    constructor(mediaData)
    {
        this.mediaId = mediaData.mediaId;
        this.mediaTitle = mediaData.mediaTitle;
        this.mediaRating = (mediaData.mediaRating).toFixed(2);
        this.mediaPosterPath = mediaData.mediaPosterPath;
        this.mediaLanguage = mediaData.mediaLanguage;
        this.mediaPopularity = mediaData.mediaPopularity;
        this.mediaDescription = mediaData.mediaDescription;
        this.mediaType = mediaData.mediaType;
        this.mediaGenres = mediaData.mediaGenres;
    }

    getImageURL(path)
    {
        return `https://image.tmdb.org/t/p/original/${path}`;
    }

    formatTitle(title)
    {
        if(title.length > 35)
        {
            return this.mediaTitle.substring(0, 40) + "...";
        }
        else
        {
            return title;
        }
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