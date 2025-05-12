/**
 * @file Preset.js
 * @description View model file containing static preset data
 * for the SmartGrow frontend. Acts as a placeholder until backend
 * integration is complete.
 *
 * Used by the PresetPage view to display preset information visually.
 * 
 * @author SophiaJustin
 * @since 1.0.0
 */

const presets = [
    {
        id: 1,
        title: "Tomato",
        name: "Tomato",
        type: "Vegetable",
        creationDate: "2025-05-01",
        updateDate: "2025-05-06",
        image: "/images/tomato.png",
        airHumidity: "40-60%",
        soilHumidity: "30-50%",
        co2: "300-400 ppm",
        temperature: "22-28°C",
        brightness: "2000-3000 lux"
    },

    {
        id: 2,
        title: "Strawberry",
        name: "Etelka",
        type: "Fruit",
        creationDate: "2025-04-20",
        updateDate: "2025-05-05",
        image: "/images/strawberry.png",
        airHumidity: "40-60%",
        soilHumidity: "30-50%",
        co2: "300-400 ppm",
        temperature: "22-28°C",
        brightness: "2000-3000 lux"
    },
];

export default presets;

  