export interface PlacementCoords {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TextSettings {
    x: number;
    y: number;
    width: number;
    height: number;
    font: string;
    size: number;
    color: string;
}

export interface Dimensions {
    width: number;
    height: number;
}

export interface Frame {
    _id?: string;
    name: string;
    imageUrl: string;
    dimensions: Dimensions;
    placementCoords: PlacementCoords;
    textSettings: TextSettings;
    isActive?: boolean;
    usageCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}