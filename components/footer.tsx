import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">サービスについて</h3>
            <ul className="space-y-2 text-sm">
              <li>街コンNaviとは</li>
              <li>ご利用ガイド</li>
              <li>安心・安全への取り組み</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">人気のエリア</h3>
            <ul className="space-y-2 text-sm">
              <li>東京</li>
              <li>大阪</li>
              <li>名古屋</li>
              <li>福岡</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">運営会社</h3>
            <ul className="space-y-2 text-sm">
              <li>会社概要</li>
              <li>プライバシーポリシー</li>
              <li>利用規約</li>
              <li>お問い合わせ</li>
            </ul>
          </div>
          {/* <div>
            <h3 className="font-semibold mb-3">フォローする</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
            </div>
          </div> */}
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-4 w-4 text-pink-500 mr-1" />
            <span className="font-semibold">街コンNavi</span>
          </div>
          <p>© 2024 街コンNavi All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}