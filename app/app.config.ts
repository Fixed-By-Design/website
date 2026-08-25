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
    contentToc: {
      slots: {
        root: 'lg:backdrop-blur-none',
      },
    },
    card: {
      slots: {
        root: 'ring-[var(--ui-border)] bg-[var(--ui-bg-muted)]',
      },
    },
  },
})
