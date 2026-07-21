import { Component } from 'react'

// 根级错误边界：任何子组件在渲染/副作用中抛错时，避免整页黑屏，
// 降级为可读的提示，而不是让 React 树完全崩溃。
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || '' }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07070a',
            color: '#ff4a4a',
            fontFamily: 'monospace',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>页面加载出现问题</h1>
            <p style={{ color: '#9a9a9a', fontSize: '0.9rem', lineHeight: 1.6 }}>
              请刷新页面重试。<br />
              若仍黑屏，多半是浏览器 WebGL 不可用或上下文超限，可换 Chrome / 关闭过多标签页后重试。
            </p>
            {this.state.message ? (
              <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '1rem', opacity: 0.7 }}>
                {this.state.message}
              </p>
            ) : null}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
