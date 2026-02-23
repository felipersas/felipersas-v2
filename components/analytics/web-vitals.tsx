'use client'

import { useEffect } from 'react'

/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals for performance monitoring
 * Integrates with Google Analytics or custom analytics
 *
 * Core Web Vitals tracked:
 * - LCP (Largest Contentful Paint) - loading performance
 * - INP (Interaction to Next Paint) - interactivity (replaced FID)
 * - CLS (Cumulative Layout Shift) - visual stability
 */

type MetricHandler = (metric: any) => void

export function reportWebVitals(onPerfEntry?: MetricHandler) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry)
      onINP(onPerfEntry) // Replaced onFID with onINP
      onFCP(onPerfEntry)
      onLCP(onPerfEntry)
      onTTFB(onPerfEntry)
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    const handleWebVital = (metric: any) => {
      const value = metric.value
      const name = metric.name
      const rating = metric.rating

      // Log to console for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${name}: ${value.toFixed(2)}ms (${rating})`)
      }

      // Send to analytics (uncomment and configure your analytics)
      // if (typeof window !== 'undefined' && (window as any).gtag) {
      //   (window as any).gtag('event', name, {
      //     value: Math.round(name === 'CLS' ? value * 1000 : value),
      //     event_label: rating,
      //     non_interaction: true,
      //   })
      // }

      // Or send to custom analytics
      // analytics.track('web_vital', { name, value, rating })
    }

    reportWebVitals(handleWebVital)
  }, [])

  return null
}

/**
 * PerformanceObserver for custom metrics
 */
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Performance]', entry)
        }
      })
    })

    observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] })

    return () => observer.disconnect()
  }, [])
}
