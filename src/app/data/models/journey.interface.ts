
export interface Journey {
    name: string;
    x_axis: number;
    y_axis: number;
    radius: number;
    color: string;
    next: Array<Journey>;
}
