/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Tytoon: ["Tytoon"],
        Neuropol: ["neuropl"],
      },
      colors: {
        "rose-pale": "#FFC0CB",
        gold: "FFD700",
        "blue-ciel": "#87CEEB",
        "green-menthe": "#98FF98",
        "yellow-pastel": "#FFFF99",
        "red-vif": "#FF0000",
        "blue-vif": "#0000FF",
        "green-vif": "#00FF00",
        indigo: "#4B0082",
        violet: "#800080",
        "brun-terre": "#8B4513",
        corail: "#FF7F50",
        turquoise: "#40E0D0",
        btn_color: "#A4ABB0",
        bg_btn: "#9C9697",
        doux_vert: "#A8D5BA",
        pale_jaune: "#FFF9C4",
        clair_brun: "#D7CCC8",
        casse_blanc: "#F5F5F5",
        pale_rose: "#F8BBD0",
        bleu_ciel: "#B3E5FC",
        jaune_bar: "#FCEB7D",
      },
      backgroundImage: {
        desc_bg: "url('/assets/images/background_bg.jpg')",
        home_bg: "url('/assets/images/home_bg.jpg')",
        setting_bg: "url('/assets/images/setting.png')",
        ciel_bg: "url('/assets/images/ciel_bg.jpg')",
        home_natur_bg: "url('/assets/images/stud_ecole_bg.png')",
        nature_start_bg: "url('/assets/images/nature_start_bg.jpg')",
        spiel_bg: "url('/assets/images/abc_bg.png')",
        btn_bg: "url('/assets/images/Buttons/BTN_ORANGE_CIRCLE_IN.png')",
        play_btn_bg: "url('/assets/images/Buttons/BTN_ORANGE_SQ.png')",
        card_bg: "url('/assets/images/Buttons/BTN_GRAY_SQ.png')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
