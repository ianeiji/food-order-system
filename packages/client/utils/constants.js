export const headerLinks = [
  {
    route: '/product/search',
    label: 'All',
  },
  {
    route: '/product/new-arrivals',
    label: 'New Arrivals',
  },
  {
    route: '/product/featured',
    label: 'Featured',
  },
]

export const footerLinks = [
  {
    category: 'カテゴリー',
    itemLinks: [
      { label: 'ブランド一覧', route: '/brand' },
      { label: 'ランキング一覧', route: '/category' },
    ],
  },
  {
    category: 'ヘルプ',
    itemLinks: [
      { label: '初めての方へ', route: '/welcome' },
      { label: 'サイトマップ', route: '/sitemap' },
      { label: 'よくある質問', route: '/help' },
    ],
  },
  {
    category: '会社情報',
    itemLinks: [
      { label: '会社情報 トップページ', route: '/about/' },
      { label: '会社概要', route: '/about/profile' },
      { label: 'サービス', route: '/about/service' },
    ],
  },
]
