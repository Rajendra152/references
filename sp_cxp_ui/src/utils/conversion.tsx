export const INCH = 'in'
export const MM = 'mm'
export const POINTS = 'pt'

export const INCH_MAX = 0.750;
export const INCH_MIN = 0.005;
export const INCH_STEP = 0.005;

export const MM_MAX = 10.0;
export const MM_MIN = 0.1;
export const MM_STEP = 0.1;

export const POINT_MAX = 20.0;
export const POINT_MIN = 1.0;
export const POINT_STEP = 1.6;

export const PIXEL_PER_INCH = 96
export const PIXEL_PER_MM = 3.779
export const PIXEL_PER_POINT = 1.333


export const get_Step = (unit:string = 'in') => {
    switch(unit){
        case INCH:
            return INCH_STEP

        case MM:
            return MM_STEP

        case POINTS:
            return POINT_STEP

        default:
            return INCH_STEP
    }
}

export const get_MIN_MAX = (unit:string = 'in') => {
    switch(unit){
        case INCH:
            return [INCH_MAX, INCH_MIN]

        case MM:
            return [MM_MAX, MM_MIN]

        case POINTS:
            return [POINT_MAX, POINT_MIN]

        default:
            return [INCH_MAX, INCH_MIN]
    }
}

export const convert_To_Pixel = (unit:string = 'in', value:number) => {
    switch(unit){
        case INCH:
            return inch_To_Pixel(value)

        case MM:
            return mm_To_Pixel(value)

        case POINTS:
            return points_To_Pixel(value)

        default:
            return inch_To_Pixel(value)
    }
}

export const convert_To_mmInchPoints = (unit:string = 'in', value:number) => {
    switch(unit){
        case INCH:
            return pixel_To_Inch(value)

        case MM:
            return pixel_To_MM(value)

        case POINTS:
            return pixel_To_points(value)

        default:
            return pixel_To_Inch(value)
    }
}

export const inch_To_Pixel = (value:number) => {
    let totalPx = value*PIXEL_PER_INCH;
    return +totalPx.toFixed(3)
}

export const mm_To_Pixel = (value:number) => {
    let totalPx = value*PIXEL_PER_MM;
    return +totalPx.toFixed(3)
}

export const points_To_Pixel = (value:number) => {
    let totalPx = value*PIXEL_PER_POINT;
    return +totalPx.toFixed(3)
}

export const pixel_To_Inch = (value:number) => {
    let inch = value/PIXEL_PER_INCH;
    return +inch.toFixed(3)
}

export const pixel_To_MM = (value:number) => {
    let mm = value/PIXEL_PER_MM;
    return +mm.toFixed(1)
}

export const pixel_To_points = (value:number) => {
    let mm = value/PIXEL_PER_POINT;
    return +mm.toFixed(1)
}

export const display_mmPxPt = (unit:string, value:number) => {
    switch(unit){
        case INCH:
            return +value.toFixed(3)

        case MM:
            return +value.toFixed(1)

        case POINTS:
            return +value.toFixed(1)

        default:
            return +value.toFixed(3)
    }
}

export const in_to_mm = (value: number) => {
    const oneInchInMM = 25.4;
    return display_mmPxPt(MM, value*oneInchInMM);
}

export const in_to_pt = (value: number) => {
    const oneInchInPt = 72;
    return display_mmPxPt(POINTS, value*oneInchInPt);
}

export const mm_to_in = (value: number) => {
    const oneMMInInches = 0.0394;
    return display_mmPxPt(INCH, value*oneMMInInches);
}

export const mm_to_pt = (value: number) => {
    const oneMMInPt = 2.8346;
    return display_mmPxPt(INCH, value*oneMMInPt);
}

export const pt_to_in = (value: number) => {
    const onePtInInches = 0.0139;
    return display_mmPxPt(INCH, value*onePtInInches);
}

export const pt_to_mm = (value: number) => {
    const onePtInMM = 0.3528;
    return display_mmPxPt(INCH, value*onePtInMM);
}