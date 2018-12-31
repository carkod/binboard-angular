export interface MovingAverage {
    // Moving average
    x: Number,
    y: String,
    type: String,
    xaxis: String,
    yaxis: String,
    mode: String,
    line?: Object,
}

export interface Annotations {
    x: String,
    y: Number,
    xref: String,
    yref: String,
    text: String,
    font?: Object,
    showarrow?: Boolean,
    xanchor?: String,
    ax: Number,
    ay: Number
}
export interface Shapes {
    type: String,
    xref: String,
    yref: String,
    x0: String,
    y0: Number,
    x1: String,
    y1: Number,
    fillcolor: String,
    opacity: Number,
    line?: {
        width: Number
    }
}