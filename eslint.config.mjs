// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "no-console": "warn",

      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "any",
            normal: "any",
            component: "always",
          },
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
        },
      ],
    },
  },
]);
