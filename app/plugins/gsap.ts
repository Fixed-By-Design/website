import type { DirectiveBinding } from 'vue'

interface RevealOptions {
  y?: number
  delay?: number
  stagger?: number
  duration?: number
}

const DEFAULTS: Required<RevealOptions> = {
  y: 18,
  delay: 0,
  stagger: 0.06,
  duration: 0.55,
}

type Animated = HTMLElement & { _gsapTween?: gsap.core.Tween }

function targetsFor(el: HTMLElement, binding: DirectiveBinding) {
  return binding.modifiers.children ? (Array.from(el.children) as HTMLElement[]) : [el]
}

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  if (import.meta.server) {
    vueApp.directive('reveal', {})
    vueApp.directive('intro', {})
    return
  }

  const gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    .then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)

      // Client-side navigation replaces the DOM, so measured trigger positions go stale.
      nuxtApp.hook('page:finish', () => ScrollTrigger.refresh())

      return gsap
    })

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function cleanup(el: Animated) {
    el._gsapTween?.scrollTrigger?.kill()
    el._gsapTween?.kill()
    delete el._gsapTween
  }

  async function animate(el: Animated, binding: DirectiveBinding<RevealOptions | undefined>, onScroll: boolean) {
    if (reducedMotion.matches) return

    const targets = targetsFor(el, binding)
    if (!targets.length) return

    const gsap = await gsapPromise
    if (!el.isConnected) return

    const options = { ...DEFAULTS, ...(onScroll ? {} : { y: 14, stagger: 0.08 }), ...(binding.value ?? {}) }

    el._gsapTween = gsap.from(targets, {
      opacity: 0,
      y: options.y,
      duration: options.duration,
      delay: options.delay,
      stagger: targets.length > 1 ? options.stagger : 0,
      ease: 'power2.out',
      ...(onScroll && { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
    })
  }

  vueApp.directive<Animated, RevealOptions | undefined>('reveal', {
    mounted: (el, binding) => animate(el, binding, true),
    unmounted: cleanup,
  })

  vueApp.directive<Animated, RevealOptions | undefined>('intro', {
    mounted: (el, binding) => animate(el, binding, false),
    unmounted: cleanup,
  })
})
