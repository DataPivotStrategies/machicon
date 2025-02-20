'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaApple, FaXTwitter } from 'react-icons/fa6'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ここにログイン処理を実装
    console.log('ログイン処理:', email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-[350px] bg-gradient-to-b from-[#f4f7fb] to-white rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)]">
        <h2 className="text-center font-extrabold text-3xl text-[#1089d3]">
          ログイン
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border-none py-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[0_10px_10px_-5px_#cff0ff] border-x-2 border-transparent focus:outline-none focus:border-[#12b1d1]"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border-none py-[15px] px-[20px] rounded-[20px] mt-[15px] shadow-[0_10px_10px_-5px_#cff0ff] border-x-2 border-transparent focus:outline-none focus:border-[#12b1d1]"
            required
          />
          
          <span className="block mt-2.5 ml-2.5">
            <a href="#" className="text-xs text-[#0099ff] no-underline">
              パスワードをお忘れですか？
            </a>
          </span>

          <button
            type="submit"
            className="w-full font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white py-[15px] my-5 rounded-[20px] shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)] transition-all hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.88)]"
          >
            ログイン
          </button>
        </form>

        <div className="mt-6">
          <span className="block text-center text-xs text-[#aaa]">
            または以下でログイン
          </span>
          <div className="w-full flex justify-center gap-4 mt-1.5">
            <SocialButton icon={<FaGoogle />} />
            <SocialButton icon={<FaApple />} />
            <SocialButton icon={<FaXTwitter />} />
          </div>
        </div>

        <span className="block text-center mt-4">
          <a href="#" className="text-[9px] text-[#0099ff] no-underline">
            利用規約を確認する
          </a>
        </span>
      </div>
    </div>
  )
}

const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
  <button className="bg-gradient-to-r from-black to-[#707070] border-[5px] border-white p-[5px] rounded-full w-[40px] aspect-square grid place-content-center shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all hover:scale-120 active:scale-90">
    <span className="text-white">{icon}</span>
  </button>
) 