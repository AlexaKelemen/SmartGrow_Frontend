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
        title: "Preset A",
        name: "Tomato",
        type: "Vegetable",
        creationDate: "2025-05-01",
        updateDate: "2025-05-06",
        image: "/public/images/tomato.png"
    },

    {
        id: 2,
        title: "Preset B",
        name: "Strawberry",
        type: "Fruit",
        creationDate: "2025-04-20",
        updateDate: "2025-05-05",
        image: "/public/images/strawberry.png"
    },
];

export default presets;

  