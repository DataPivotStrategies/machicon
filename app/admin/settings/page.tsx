"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Save, Building2, MapPin, Phone, Mail, Globe, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    // システム設定
    siteName: "街コンポータル",
    adminEmail: "admin@example.com",
    notificationEmail: "notifications@example.com",
    defaultEventCapacity: "40",
    defaultEventDuration: "3",
    timezone: "Asia/Tokyo",
    paymentGateway: "stripe",
    
    // 会社情報
    companyName: "株式会社街コンポータル",
    companyNameEn: "Machikon Portal Inc.",
    postalCode: "150-0043",
    prefecture: "東京都",
    city: "渋谷区",
    address: "道玄坂1-2-3",
    building: "渋谷ビル4F",
    phoneNumber: "03-1234-5678",
    faxNumber: "03-1234-5679",
    companyEmail: "info@machikon-portal.com",
    website: "https://machikon-portal.com",
    
    // 法人情報
    representative: "山田太郎",
    establishedDate: "2020-01-01",
    capital: "10000000",
    businessDescription: "街コンイベントの企画・運営\nマッチングサービスの提供\nイベント会場の提供・紹介",
    
    // 銀行口座情報
    bankName: "渋谷銀行",
    branchName: "本店",
    accountType: "ordinary", // ordinary: 普通, saving: 当座
    accountNumber: "1234567",
    accountHolder: "カ）マチコンポータル",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 設定の保存処理
    console.log("Settings saved:", settings);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">システム設定</h1>
          <p className="text-gray-500 mt-2">システムと会社情報の設定を管理します</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="system">システム設定</TabsTrigger>
            <TabsTrigger value="company">会社情報</TabsTrigger>
            <TabsTrigger value="corporate">法人情報</TabsTrigger>
            <TabsTrigger value="payment">支払い設定</TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>基本設定</CardTitle>
                  <CardDescription>
                    サイトの基本的な設定を行います
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">サイト名</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">管理者メールアドレス</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">通知用メールアドレス</Label>
                    <Input
                      id="notificationEmail"
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">タイムゾーン</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="タイムゾーンを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>イベント設定</CardTitle>
                  <CardDescription>
                    イベントに関するデフォルト設定を行います
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultEventCapacity">デフォルト定員数</Label>
                    <Input
                      id="defaultEventCapacity"
                      type="number"
                      value={settings.defaultEventCapacity}
                      onChange={(e) => setSettings({ ...settings, defaultEventCapacity: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultEventDuration">デフォルト開催時間（時間）</Label>
                    <Input
                      id="defaultEventDuration"
                      type="number"
                      value={settings.defaultEventDuration}
                      onChange={(e) => setSettings({ ...settings, defaultEventDuration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentGateway">決済システム</Label>
                    <Select
                      value={settings.paymentGateway}
                      onValueChange={(value) => setSettings({ ...settings, paymentGateway: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="決済システムを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>会社情報</CardTitle>
                <CardDescription>
                  会社の基本情報を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">会社名</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyNameEn">会社名（英語）</Label>
                    <Input
                      id="companyNameEn"
                      value={settings.companyNameEn}
                      onChange={(e) => setSettings({ ...settings, companyNameEn: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>所在地</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="郵便番号"
                        value={settings.postalCode}
                        onChange={(e) => setSettings({ ...settings, postalCode: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="都道府県"
                        value={settings.prefecture}
                        onChange={(e) => setSettings({ ...settings, prefecture: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="市区町村"
                        value={settings.city}
                        onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="番地"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Input
                        placeholder="建物名"
                        value={settings.building}
                        onChange={(e) => setSettings({ ...settings, building: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">電話番号</Label>
                    <Input
                      id="phoneNumber"
                      value={settings.phoneNumber}
                      onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faxNumber">FAX番号</Label>
                    <Input
                      id="faxNumber"
                      value={settings.faxNumber}
                      onChange={(e) => setSettings({ ...settings, faxNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">メールアドレス</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Webサイト</Label>
                    <Input
                      id="website"
                      type="url"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="corporate">
            <Card>
              <CardHeader>
                <CardTitle>法人情報</CardTitle>
                <CardDescription>
                  法人としての詳細情報を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="representative">代表者名</Label>
                    <Input
                      id="representative"
                      value={settings.representative}
                      onChange={(e) => setSettings({ ...settings, representative: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishedDate">設立日</Label>
                    <Input
                      id="establishedDate"
                      type="date"
                      value={settings.establishedDate}
                      onChange={(e) => setSettings({ ...settings, establishedDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capital">資本金（円）</Label>
                    <Input
                      id="capital"
                      type="number"
                      value={settings.capital}
                      onChange={(e) => setSettings({ ...settings, capital: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">事業内容</Label>
                  <textarea
                    id="businessDescription"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={settings.businessDescription}
                    onChange={(e) => setSettings({ ...settings, businessDescription: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>銀行口座情報</CardTitle>
                <CardDescription>
                  支払いに使用する銀行口座情報を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">銀行名</Label>
                    <Input
                      id="bankName"
                      value={settings.bankName}
                      onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branchName">支店名</Label>
                    <Input
                      id="branchName"
                      value={settings.branchName}
                      onChange={(e) => setSettings({ ...settings, branchName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">口座種別</Label>
                    <Select
                      value={settings.accountType}
                      onValueChange={(value) => setSettings({ ...settings, accountType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="口座種別を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ordinary">普通</SelectItem>
                        <SelectItem value="saving">当座</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">口座番号</Label>
                    <Input
                      id="accountNumber"
                      value={settings.accountNumber}
                      onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="accountHolder">口座名義</Label>
                    <Input
                      id="accountHolder"
                      value={settings.accountHolder}
                      onChange={(e) => setSettings({ ...settings, accountHolder: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            設定を保存
          </Button>
        </div>
      </form>
    </div>
  );
}