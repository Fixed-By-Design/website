export default defineAppConfig({
  ui: {
    colors: {
      primary: 'gold',
      secondary: 'navy',
      neutral: 'navy',
    },
    button: {
      defaultVariants: { color: 'primary' },
    },
    card: {
      slots: {
        root: 'ring-[var(--ui-border)] bg-[var(--ui-bg-muted)]',
      },
    },
  },
})
