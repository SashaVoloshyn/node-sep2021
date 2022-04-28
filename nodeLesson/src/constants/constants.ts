export const constants = {
    AUTHORIZATION: 'Authorization',
    ACCESS: 'access',
    REFRESH: 'refresh',
    ACTION: 'action',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTO_MIMETYPE: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],
    VIDEO_MIMETYPE: [
        'video/mp4', // MP4
        'video/x-msvideo', // AVI
    ],
};
