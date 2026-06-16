import type { CSSProperties } from 'react'

type ClientTypographyToken = {
  size: string
  lineHeight?: string
  fontWeight?: string | number
  letterSpacing?: string
  textTransform?: string
  fontVariantNumeric?: string
}

export const clientTypography = {
  fontFamily: '"Helvetica Neue", Calibre, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  letterSpacing: 'normal',
  trackingTight: '-0.04em',
  trackingNormal: 'normal',
  trackingWide: '0.02em',
  xs: {
    size: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 500
  },
  sm: {
    size: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500
  },
  base: {
    size: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 400
  },
  lg: {
    size: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: 400
  },
  xl: {
    size: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: 400
  },
  '2xl': {
    size: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: '1.2',
    fontWeight: 600,
    letterSpacing: '-0.02em'
  },
  '3xl': {
    size: 'clamp(1.875rem, 4vw, 3rem)',
    lineHeight: '1.15',
    fontWeight: 600,
    letterSpacing: '-0.03em'
  },
  '4xl': {
    size: 'clamp(2.25rem, 5vw, 3.75rem)',
    lineHeight: '1.1',
    fontWeight: 600,
    letterSpacing: '-0.04em'
  },
  '5xl': {
    size: 'clamp(2.75rem, 7vw, 5rem)',
    lineHeight: '1',
    fontWeight: 600,
    letterSpacing: '-0.05em'
  },
  logo: {
    size: '1.25rem',
    lineHeight: '1',
    fontWeight: 600
  },
  nav: {
    size: '0.9375rem',
    lineHeight: '1',
    fontWeight: 500
  },
  button: {
    size: '1rem',
    lineHeight: '1',
    fontWeight: 600
  },
  heroTitle: {
    size: 'clamp(2.5rem, 7vw, 5.5rem)',
    lineHeight: '0.98',
    fontWeight: 600,
    letterSpacing: '-0.06em'
  },
  sectionTitle: {
    size: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: '1.1',
    fontWeight: 600,
    letterSpacing: '-0.04em'
  },
  sectionDescription: {
    size: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: 400
  },
  cardTitle: {
    size: '1rem',
    lineHeight: '1.35',
    fontWeight: 600
  },
  cardDescription: {
    size: '0.875rem',
    lineHeight: '1.55',
    fontWeight: 400
  },
  price: {
    size: '1rem',
    lineHeight: '1',
    fontWeight: 400,
    fontVariantNumeric: 'tabular-nums'
  },
  meta: {
    size: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500
  }
} as const satisfies Record<string, string | ClientTypographyToken>

export const clientStyleVariables = {
  '--font-client': clientTypography.fontFamily,
  '--client-letter-spacing': clientTypography.letterSpacing,
  '--client-tracking-tight': clientTypography.trackingTight,
  '--client-tracking-normal': clientTypography.trackingNormal,
  '--client-tracking-wide': clientTypography.trackingWide,
  '--client-xs-size': clientTypography.xs.size,
  '--client-xs-line-height': clientTypography.xs.lineHeight,
  '--client-xs-font-weight': clientTypography.xs.fontWeight,
  '--client-sm-size': clientTypography.sm.size,
  '--client-sm-line-height': clientTypography.sm.lineHeight,
  '--client-sm-font-weight': clientTypography.sm.fontWeight,
  '--client-base-size': clientTypography.base.size,
  '--client-base-line-height': clientTypography.base.lineHeight,
  '--client-base-font-weight': clientTypography.base.fontWeight,
  '--client-lg-size': clientTypography.lg.size,
  '--client-lg-line-height': clientTypography.lg.lineHeight,
  '--client-lg-font-weight': clientTypography.lg.fontWeight,
  '--client-xl-size': clientTypography.xl.size,
  '--client-xl-line-height': clientTypography.xl.lineHeight,
  '--client-xl-font-weight': clientTypography.xl.fontWeight,
  '--client-2xl-size': clientTypography['2xl'].size,
  '--client-2xl-line-height': clientTypography['2xl'].lineHeight,
  '--client-2xl-font-weight': clientTypography['2xl'].fontWeight,
  '--client-2xl-letter-spacing': clientTypography['2xl'].letterSpacing,
  '--client-3xl-size': clientTypography['3xl'].size,
  '--client-3xl-line-height': clientTypography['3xl'].lineHeight,
  '--client-3xl-font-weight': clientTypography['3xl'].fontWeight,
  '--client-3xl-letter-spacing': clientTypography['3xl'].letterSpacing,
  '--client-4xl-size': clientTypography['4xl'].size,
  '--client-4xl-line-height': clientTypography['4xl'].lineHeight,
  '--client-4xl-font-weight': clientTypography['4xl'].fontWeight,
  '--client-4xl-letter-spacing': clientTypography['4xl'].letterSpacing,
  '--client-5xl-size': clientTypography['5xl'].size,
  '--client-5xl-line-height': clientTypography['5xl'].lineHeight,
  '--client-5xl-font-weight': clientTypography['5xl'].fontWeight,
  '--client-5xl-letter-spacing': clientTypography['5xl'].letterSpacing,
  '--client-logo-size': clientTypography.logo.size,
  '--client-logo-line-height': clientTypography.logo.lineHeight,
  '--client-logo-font-weight': clientTypography.logo.fontWeight,
  '--client-nav-size': clientTypography.nav.size,
  '--client-nav-line-height': clientTypography.nav.lineHeight,
  '--client-nav-font-weight': clientTypography.nav.fontWeight,
  '--client-button-size': clientTypography.button.size,
  '--client-button-line-height': clientTypography.button.lineHeight,
  '--client-button-font-weight': clientTypography.button.fontWeight,
  '--client-hero-title-size': clientTypography.heroTitle.size,
  '--client-hero-title-line-height': clientTypography.heroTitle.lineHeight,
  '--client-hero-title-font-weight': clientTypography.heroTitle.fontWeight,
  '--client-hero-title-letter-spacing': clientTypography.heroTitle.letterSpacing,
  '--client-section-title-size': clientTypography.sectionTitle.size,
  '--client-section-title-line-height': clientTypography.sectionTitle.lineHeight,
  '--client-section-title-font-weight': clientTypography.sectionTitle.fontWeight,
  '--client-section-title-letter-spacing': clientTypography.sectionTitle.letterSpacing,
  '--client-section-description-size': clientTypography.sectionDescription.size,
  '--client-section-description-line-height': clientTypography.sectionDescription.lineHeight,
  '--client-section-description-font-weight': clientTypography.sectionDescription.fontWeight,
  '--client-card-title-size': clientTypography.cardTitle.size,
  '--client-card-title-line-height': clientTypography.cardTitle.lineHeight,
  '--client-card-title-font-weight': clientTypography.cardTitle.fontWeight,
  '--client-card-description-size': clientTypography.cardDescription.size,
  '--client-card-description-line-height': clientTypography.cardDescription.lineHeight,
  '--client-card-description-font-weight': clientTypography.cardDescription.fontWeight,
  '--client-price-size': clientTypography.price.size,
  '--client-price-line-height': clientTypography.price.lineHeight,
  '--client-price-font-weight': clientTypography.price.fontWeight,
  '--client-price-font-variant-numeric': clientTypography.price.fontVariantNumeric,
  '--client-meta-size': clientTypography.meta.size,
  '--client-meta-line-height': clientTypography.meta.lineHeight,
  '--client-meta-font-weight': clientTypography.meta.fontWeight
} as CSSProperties
