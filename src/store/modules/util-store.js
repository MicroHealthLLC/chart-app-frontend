export default {
  state: {
    colors: [
      {
        id: 1,
        title: "Blue",
        scheme: [
          [
            "rgba(30, 144, 255, 0.75)", // Blue (DodgerBlue)
            "rgba(65, 105, 225, 0.75)", // Blue (RoyalBlue)
            "rgba(100, 149, 237, 0.75)", // Blue (CornflowerBlue)
            "rgba(70, 130, 180, 0.75)", // Blue (SteelBlue)
            "rgba(176, 196, 222, 0.75)", // Blue (LightSteelBlue)
            "rgba(135, 206, 250, 0.75)", // Blue (LightSkyBlue)
          ],
          [
            "rgba(30, 144, 255, 0.25)", // Blue (DodgerBlue)
            "rgba(65, 105, 225, 0.25)", // Blue (RoyalBlue)
            "rgba(100, 149, 237, 0.25)", // Blue (CornflowerBlue)
            "rgba(70, 130, 180, 0.25)", // Blue (SteelBlue)
            "rgba(176, 196, 222, 0.25)", // Blue (LightSteelBlue)
            "rgba(135, 206, 250, 0.25)", // Blue (LightSkyBlue)
          ],
        ],
      },
      {
        id: 2,
        title: "Red",
        scheme: [
          [
            "rgba(255, 69, 0, 0.75)", // Red (OrangeRed)
            "rgba(255, 99, 71, 0.75)", // Red (Tomato)
            "rgba(255, 127, 80, 0.75)", // Red (Coral)
            "rgba(178, 34, 34, 0.75)", // Red (FireBrick)
            "rgba(255, 0, 0, 0.75)", // Red (Red)
            "rgba(220, 20, 60, 0.75)", // Red (Crimson)
          ],
          [
            "rgba(255, 69, 0, 0.25)", // Red (OrangeRed)
            "rgba(255, 99, 71, 0.25)", // Red (Tomato)
            "rgba(255, 127, 80, 0.25)", // Red (Coral)
            "rgba(178, 34, 34, 0.25)", // Red (FireBrick)
            "rgba(255, 0, 0, 0.25)", // Red (Red)
            "rgba(220, 20, 60, 0.25)", // Red (Crimson)
          ],
        ],
      },
      {
        id: 3,
        title: "Yellow",
        scheme: [
          [
            "rgba(255, 165, 0, 0.75)", // Yellow (Orange)
            "rgba(255, 215, 0, 0.75)", // Yellow (Gold)
            "rgba(238, 232, 170, 0.75)", // Yellow (PaleGoldenrod)
            "rgba(255, 218, 185, 0.75)", // Yellow (PeachPuff)
            "rgba(255, 255, 0, 0.75)", // Yellow (Yellow)
            "rgba(240, 230, 140, 0.75)", // Yellow (Khaki)
          ],
          [
            "rgba(255, 165, 0, 0.25)", // Yellow (Orange)
            "rgba(255, 215, 0, 0.25)", // Yellow (Gold)
            "rgba(238, 232, 170, 0.5)", // Yellow (PaleGoldenrod)
            "rgba(255, 218, 185, 0.5)", // Yellow (PeachPuff)
            "rgba(255, 255, 0, 0.25)", // Yellow (Yellow)
            "rgba(240, 230, 140, 0.25)", // Yellow (Khaki)
          ],
        ],
      },
      {
        id: 4,
        title: "Green",
        scheme: [
          [
            "rgba(154, 205, 50, 0.75)", // Green (YellowGreen)
            "rgba(102, 205, 170, 0.75)", // Green (MediumAquaMarine)
            "rgba(32, 178, 170, 0.75)", // Green (LightSeaGreen)
            "rgba(144, 238, 144, 0.75)", // Green (LightGreen)
            "rgba(50, 205, 50, 0.75)", // Green (LimeGreen)
            "rgba(60, 179, 113, 0.75)", // Green (MediumSeaGreen)
          ],
          [
            "rgba(154, 205, 50, 0.25)", // Green (YellowGreen)
            "rgba(102, 205, 170, 0.25)", // Green (MediumAquaMarine)
            "rgba(32, 178, 170, 0.25)", // Green (LightSeaGreen)
            "rgba(144, 238, 144, 0.25)", // Green (LightGreen)
            "rgba(50, 205, 50, 0.25)", // Green (LimeGreen)
            "rgba(60, 179, 113, 0.25)", // Green (MediumSeaGreen)
          ],
        ],
      },
    ],
  },
  actions: {},
  mutations: {},
  getters: {
    colors: (state) => state.colors,
  },
};
