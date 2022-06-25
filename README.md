# YaziWindy

> This project is totally just a homophone joke that popped into my head and is in development.

YaziWindy is a lightweight NodeJS tool that helps you call Windy's Point Forecast API to quickly get weather data for a given coordinate.

*I am not a professional meteorologist, or a student is learning Geography or Atmospheric Sciences now, or a meteorologist, etc. The code in the project may have some weather science related errors, you can correct it yourself and submit a PR for this.*

## Example

```JavaScript
const { YaziWindy, YaziWindyModels, YaziWindyLevels, YaziWindyParameters } = require("./yaziwindy.js")

async function test() {
    const windy = new YaziWindy("YOU-API-KEY-HERE")
    const result = await windy.getWindy(
        lon = 139.42,                                               // longitude
        lat = 35.41,                                                // latitude
        model = YaziWindyModels.GFS,                                // model
        parameters = [
            YaziWindyParameters.WIND_SPEED_AND_DIRECTION,           // wind speed and direction
            YaziWindyParameters.TEMPURATURE                         // temperature
        ],                                                          // parameters
        levels = [
            YaziWindyLevels.SURFACE,                                // surface
            YaziWindyLevels.H150                                    // 150 geopotential height i think?
        ]                                                           // levels
    )
    console.log(result)
}

test()
```
