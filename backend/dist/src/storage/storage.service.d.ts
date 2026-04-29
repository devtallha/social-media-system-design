export declare class StorageService {
    private s3Client;
    private bucket;
    constructor();
    getPresignedUrl(fileType: string): Promise<{
        uploadUrl: string;
        key: string;
        imageUrl: string;
    }>;
}
