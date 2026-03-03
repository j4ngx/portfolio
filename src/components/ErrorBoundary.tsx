import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useLocale } from '../hooks/useLocale'

function DefaultErrorFallback({ onReset }: { readonly onReset: () => void }) {
  const { t } = useLocale()
  return (
    <div className="w-full py-12 text-center">
      <p className="text-muted text-sm font-mono">
        {t('error.message')}
      </p>
      <button
        onClick={onReset}
        className="mt-3 text-xs text-primary hover:text-accent underline font-mono"
      >
        {t('error.retry')}
      </button>
    </div>
  )
}

interface Props {
  readonly children: ReactNode
  readonly fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <DefaultErrorFallback onReset={() => this.setState({ hasError: false })} />
        )
      )
    }
    return this.props.children
  }
}
