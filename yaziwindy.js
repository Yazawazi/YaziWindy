const axios = require("axios")

const YaziWindyModels = {
    AROME: "arome",
    ICONEU: "iconEU",
    GFS: "gfs",
    GFS_WAVE: "gfsWave",
    NAM_CONUS: "namConus",
    NAM_HAWAII: "namHawaii",
    NAM_ALASKA: "namAlaska",
    GEOS5: "geos5"
}

const YaziWindyLevels = {
    SURFACE: "surface",
    H150: "150h",
    H200: "200h",
    H300: "300h",
    H400: "400h",
    H500: "500h",
    H600: "600h",
    H700: "700h",
    H800: "800h",
    H900: "900h",
    H925: "925h",
    H950: "950h",
    H1000: "1000h"
}

const YaziWindyParameters = {
    TEMPURATURE: "temp",
    DEW_POINT_TEMPURATURE: "dewpoint",
    ALL_PRECIPITATION: "precip",
    SNOW_PRECIPITATION: "snowPrecip",
    CONVECTION_PRECIPTATION: "convPrecip",
    WIND_SPEED_AND_DIRECTION: "wind",
    GUST_WIND_SPEED: "windGust",
    CONVECTIVE_AVAILABLE_POTENTIAL_ENERGY: "cape",
    PRECIPITATION_TYPE: "ptype",
    LOW_CLOUDS_COVER: "lclouds",
    MEDIUM_CLOUDS_COVER: "mclouds",
    HIGH_CLOUDS_COVER: "hclouds",
    AIR_RELATIVE_HUMIDITY: "rh",
    GEOPOTENTIAL_HEIGHT: "gh",
    AIR_PRESSURE: "pressure",
    WAVE_HEIGHT_PERIOD_AND_DIRECTION: "waves",
    WIND_WAVE_HEIGHT_PERIOD_AND_DIRECTION: "windWaves",
    SWELL_HEIGHT_PERIOD_AND_DIRECTION: "swell1",
    SMALL_SWELL_HEIGHT_PERIOD_AND_DIRECTION: "swell2",
    AIR_SULFUR_DIOXIDE: "so2sm",
    AIR_DUST_PARTICES: "dustsm",
    TROPOSPHERE_CARBON_MONOXIDE: "cosc"
}

Object.freeze(YaziWindyParameters)
Object.freeze(YaziWindyLevels)
Object.freeze(YaziWindyModels)

const YaziWindy = class {
    constructor(apiKey) {
        this.apiURL = "https://api.windy.com/api/point-forecast/v2"
        this.apiKey = apiKey
        this.postAxios = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "YaziWindy",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            }
        })

        this.modelCheck = {
            arome: [
                "temp", "dewpoint", "precip", "convPrecip", "wind",
                "windGust", "cape", "ptype", "lclouds", "mclouds",
                "hclouds", "rh"
            ],
            iconEu: [
                "temp", "dewpoint", "precip", "convPrecip", "snowPrecip",
                "wind", "windGust", "cape", "ptype", "lclouds",
                "mclouds", "hclouds", "rh", "gh", "pressure"
            ],
            gfs: [
                "temp", "dewpoint", "precip", "convPrecip", "snowPrecip",
                "wind", "windGust", "cape", "ptype", "lclouds",
                "mclouds", "hclouds", "rh", "gh", "pressure"
            ],
            gfsWave: [
                "waves", "windWaves", "swell1", "swell2"
            ],
            namConus: [
                "temp", "dewpoint", "precip", "convPrecip", "snowPrecip",
                "wind", "windGust", "cape", "ptype", "lclouds",
                "mclouds", "hclouds", "rh", "gh", "pressure"
            ],
            namHawaii: [
                "temp", "dewpoint", "precip", "convPrecip", "snowPrecip",
                "wind", "windGust", "cape", "ptype", "lclouds",
                "mclouds", "hclouds", "rh", "gh", "pressure"
            ],
            namAlaska: [
                "temp", "dewpoint", "precip", "convPrecip", "snowPrecip",
                "wind", "windGust", "cape", "ptype", "lclouds",
                "mclouds", "hclouds", "rh", "gh", "pressure"
            ],
            geos5: [
                "so2sm", "dustsm", "cosc"
            ]
        }
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey
    }

    async getWindy(lon, lat, model, parameters, levels) {
        if (this.modelCheck[model]) {
            for (let i = 0; i < parameters.length; i++) {
                if (!this.modelCheck[model].includes(parameters[i])) {
                    return false
                }
            }
        } else {
            return false
        }

        const response = await this.postAxios
        .post(this.apiURL, {
            lat: lat,
            lon: lon,
            model: model,
            parameters: parameters,
            levels: levels,
            key: this.apiKey
        })
        return response.data
    }

}

module.exports = {
    YaziWindy,
    YaziWindyModels,
    YaziWindyLevels,
    YaziWindyParameters
}
