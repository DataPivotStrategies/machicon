"use client";

import { useState } from "react";
import { Search, Users, Calendar, Phone, Mail, Globe, ExternalLink, Upload, PlusCircle, X, Save, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const applicants = [
  {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    gender: "男性",
    age: 28,
    appliedEvents: [
      {
        id: 1,
        title: "渋谷で恋活パーティー",
        date: "2024-04-15",
        status: "参加確定",
        platform: "自社サイト"
      },
      {
        id: 2,
        title: "代官山カフェ街コン",
        date: "2024-04-20",
        status: "キャンセル",
        platform: "自社サイト"
      }
    ],
    externalBookings: [
      {
        platform: "街コンジャパン",
        events: [
          {
            title: "銀座プレミアム街コン",
            date: "2024-05-01",
            status: "申込済",
            price: 6000
          }
        ]
      },
      {
        platform: "パーティーパーティー",
        events: [
          {
            title: "表参道デザイナーズカフェ街コン",
            date: "2024-05-15",
            status: "参加確定",
            price: 5500
          }
        ]
      }
    ],
    registeredDate: "2024-03-15",
    status: "アクティブ",
  },
  {
    id: 2,
    name: "山田花子",
    email: "yamada@example.com",
    phone: "090-8765-4321",
    gender: "女性",
    age: 25,
    appliedEvents: [
      {
        id: 1,
        title: "渋谷で恋活パーティー",
        date: "2024-04-15",
        status: "参加確定",
        platform: "自社サイト"
      }
    ],
    externalBookings: [
      {
        platform: "街コンジャパン",
        events: [
          {
            title: "新宿アフター6街コン",
            date: "2024-05-10",
            status: "申込済",
            price: 4500
          }
        ]
      }
    ],
    registeredDate: "2024-03-16",
    status: "アクティブ",
  },
  {
    id: 3,
    name: "佐藤健",
    email: "sato@example.com",
    phone: "090-2345-6789",
    gender: "男性",
    age: 32,
    appliedEvents: [
      {
        id: 3,
        title: "銀座ラグジュアリー街コン",
        date: "2024-04-25",
        status: "申込済",
        platform: "自社サイト"
      }
    ],
    externalBookings: [
      {
        platform: "パーティーパーティー",
        events: [
          {
            title: "恵比寿ワイン街コン",
            date: "2024-05-20",
            status: "キャンセル",
            price: 6500
          }
        ]
      }
    ],
    registeredDate: "2024-03-17",
    status: "アクティブ",
  },
];

const platforms = ["自社サイト", "街コンジャパン", "パーティーパーティー"];

interface SpreadsheetEntry {
  id: string;
  applicantEmail: string;
  platform: string;
  eventTitle: string;
  eventDate: string;
  eventPrice: string;
  status: string;
}

export default function ApplicantsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [filterEvent, setFilterEvent] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isManualEntryDialogOpen, setIsManualEntryDialogOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  
  const [spreadsheetEntries, setSpreadsheetEntries] = useState<SpreadsheetEntry[]>([
    {
      id: "1",
      applicantEmail: "",
      platform: "",
      eventTitle: "",
      eventDate: "",
      eventPrice: "",
      status: "",
    },
  ]);

  const addNewRow = () => {
    setSpreadsheetEntries([
      ...spreadsheetEntries,
      {
        id: Date.now().toString(),
        applicantEmail: "",
        platform: "",
        eventTitle: "",
        eventDate: "",
        eventPrice: "",
        status: "",
      },
    ]);
  };

  const removeRow = (id: string) => {
    setSpreadsheetEntries(spreadsheetEntries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, field: keyof SpreadsheetEntry, value: string) => {
    setSpreadsheetEntries(
      spreadsheetEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleSpreadsheetSubmit = () => {
    const validEntries = spreadsheetEntries.filter(
      entry => entry.applicantEmail && entry.platform && entry.eventTitle
    );
    console.log("Saving entries:", validEntries);
    setIsManualEntryDialogOpen(false);
    setSpreadsheetEntries([
      {
        id: "1",
        applicantEmail: "",
        platform: "",
        eventTitle: "",
        eventDate: "",
        eventPrice: "",
        status: "",
      },
    ]);
  };

  const events = Array.from(
    new Set(
      applicants.flatMap(applicant => 
        applicant.appliedEvents.map(event => event.title)
      )
    )
  );

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterEvent === "all" && filterPlatform === "all") return matchesSearch;
    
    const matchesEvent = filterEvent === "all" || 
      [...applicant.appliedEvents, ...applicant.externalBookings.flatMap(b => b.events)]
        .some(event => event.title === filterEvent);

    const matchesPlatform = filterPlatform === "all" ||
      (filterPlatform === "自社サイト" && applicant.appliedEvents.length > 0) ||
      applicant.externalBookings.some(b => b.platform === filterPlatform);
    
    return matchesSearch && matchesEvent && matchesPlatform;
  });

  const totalBookings = applicants.reduce((sum, applicant) => 
    sum + applicant.appliedEvents.length + 
    applicant.externalBookings.reduce((sum, platform) => 
      sum + platform.events.length, 0
    ), 0
  );

  const platformBookings = platforms.reduce((acc, platform) => {
    acc[platform] = applicants.reduce((sum, applicant) => {
      if (platform === "自社サイト") {
        return sum + applicant.appliedEvents.length;
      }
      return sum + (
        applicant.externalBookings
          .find(b => b.platform === platform)?.events.length || 0
      );
    }, 0);
    return acc;
  }, {} as Record<string, number>);

  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleImportSubmit = () => {
    if (csvFile) {
      console.log("Importing CSV:", csvFile);
      setIsImportDialogOpen(false);
      setCsvFile(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">申込者一覧</h1>
          <p className="text-gray-500 mt-2">イベント申込者の管理と確認（全プラットフォーム）</p>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総申込数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              全プラットフォーム合計
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">プラットフォーム別申込数</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformBookings["自社サイト"]}</div>
            <p className="text-xs text-muted-foreground">
              外部サイト: {
                Object.entries(platformBookings)
                  .filter(([platform]) => platform !== "自社サイト")
                  .reduce((sum, [_, count]) => sum + count, 0)
              }件
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">性別比率</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              男性: {applicants.filter(a => a.gender === "男性").length}人
            </div>
            <p className="text-xs text-muted-foreground">
              女性: {applicants.filter(a => a.gender === "女性").length}人
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>申込一覧</CardTitle>
              {/* <CardDescription>
                全プラットフォームの申込者情報を一括管理
              </CardDescription> */}
            </div>
            <div className="flex gap-2">
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    CSVインポート
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>外部予約情報のCSVインポート</DialogTitle>
                    <DialogDescription>
                      外部サイトからの予約情報をCSVファイルで一括インポートできます。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvImport}
                        className="hidden"
                        id="csv-upload"
                      />
                      {!csvFile ? (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <div className="text-sm text-gray-600">
                            クリックまたはドラッグ＆ドロップでCSVファイルをアップロード
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById("csv-upload")?.click()}
                          >
                            ファイルを選択
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm text-gray-600">{csvFile.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setCsvFile(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">CSVファイルの形式</h4>
                      <p className="text-sm text-muted-foreground">
                        以下の列を含むCSVファイルを準備してください：
                      </p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside mt-2">
                        <li>メールアドレス</li>
                        <li>プラットフォーム名</li>
                        <li>イベント名</li>
                        <li>開催日</li>
                        <li>料金</li>
                        <li>ステータス</li>
                      </ul>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                      キャンセル
                    </Button>
                    <Button onClick={handleImportSubmit} disabled={!csvFile}>
                      インポート
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isManualEntryDialogOpen} onOpenChange={setIsManualEntryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    手動入力
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[1000px]">
                  <DialogHeader>
                    <DialogTitle>外部予約情報の手動入力</DialogTitle>
                    <DialogDescription>
                      外部サイトからの予約情報をスプレッドシート形式で入力できます。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="px-4 py-2 font-medium text-left">メールアドレス</th>
                              <th className="px-4 py-2 font-medium text-left">プラットフォーム</th>
                              <th className="px-4 py-2 font-medium text-left">イベント名</th>
                              <th className="px-4 py-2 font-medium text-left">開催日</th>
                              <th className="px-4 py-2 font-medium text-left">料金</th>
                              <th className="px-4 py-2 font-medium text-left">ステータス</th>
                              <th className="px-4 py-2 w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {spreadsheetEntries.map((entry) => (
                              <tr key={entry.id} className="border-t">
                                <td className="p-2">
                                  <Input
                                    value={entry.applicantEmail}
                                    onChange={(e) => updateEntry(entry.id, "applicantEmail", e.target.value)}
                                    placeholder="example@email.com"
                                    className="h-8"
                                  />
                                </td>
                                <td className="p-2">
                                  <Select
                                    value={entry.platform}
                                    onValueChange={(value) => updateEntry(entry.id, "platform", value)}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="街コンジャパン">街コンジャパン</SelectItem>
                                      <SelectItem value="パーティーパーティー">パーティーパーティー</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="p-2">
                                  <Input
                                    value={entry.eventTitle}
                                    onChange={(e) => updateEntry(entry.id, "eventTitle", e.target.value)}
                                    placeholder="イベント名"
                                    className="h-8"
                                  />
                                </td>
                                <td className="p-2">
                                  <Input
                                    type="date"
                                    value={entry.eventDate}
                                    onChange={(e) => updateEntry(entry.id, "eventDate", e.target.value)}
                                    className="h-8"
                                  />
                                </td>
                                <td className="p-2">
                                  <Input
                                    type="number"
                                    value={entry.eventPrice}
                                    onChange={(e) => updateEntry(entry.id, "eventPrice", e.target.value)}
                                    placeholder="6000"
                                    className="h-8"
                                  />
                                </td>
                                <td className="p-2">
                                  <Select
                                    value={entry.status}
                                    onValueChange={(value) => updateEntry(entry.id, "status", value)}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="申込済">申込済</SelectItem>
                                      <SelectItem value="参加確定">参加確定</SelectItem>
                                      <SelectItem value="キャンセル">キャンセル</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="p-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeRow(entry.id)}
                                    className="h-8 w-8 p-0"
                                    disabled={spreadsheetEntries.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addNewRow}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      行を追加
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsManualEntryDialogOpen(false)}>
                      キャンセル
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSpreadsheetSubmit}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      保存
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="申込者を検索..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="プラットフォームで絞り込み" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全てのプラットフォーム</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterEvent} onValueChange={setFilterEvent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="イベントで絞り込み" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全てのイベント</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* PC表示用のテーブル */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名前</TableHead>
                  <TableHead>性別</TableHead>
                  <TableHead>年齢</TableHead>
                  <TableHead>総申込数</TableHead>
                  <TableHead>登録日</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>詳細</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.gender}</TableCell>
                    <TableCell>{applicant.age}歳</TableCell>
                    <TableCell>
                      {applicant.appliedEvents.length + 
                        applicant.externalBookings.reduce((sum, platform) => 
                          sum + platform.events.length, 0
                        )}件
                    </TableCell>
                    <TableCell>{applicant.registeredDate}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.status === "アクティブ" ? "default" : "destructive"}>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplicant(applicant)}
                          >
                            詳細を見る
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[800px]">
                          <DialogHeader>
                            <DialogTitle>申込者詳細情報</DialogTitle>
                            <DialogDescription>
                              申込者の詳細情報と全プラットフォームでの申込履歴
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-4">
                              <h3 className="font-semibold">基本情報</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span>{applicant.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{applicant.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span>{applicant.phone}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>性別: {applicant.gender}</div>
                                  <div>年齢: {applicant.age}歳</div>
                                  <div>登録日: {applicant.registeredDate}</div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="font-semibold">申込履歴</h3>
                              <Tabs defaultValue="own" className="w-full">
                                <TabsList>
                                  <TabsTrigger value="own">自社サイト</TabsTrigger>
                                  {applicant.externalBookings.map((platform) => (
                                    <TabsTrigger key={platform.platform} value={platform.platform}>
                                      {platform.platform}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>
                                <TabsContent value="own">
                                  <div className="space-y-3">
                                    {applicant.appliedEvents.map((event, index) => (
                                      <div
                                        key={index}
                                        className="border rounded-lg p-3 space-y-2"
                                      >
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-sm text-gray-500">
                                          開催日: {event.date}
                                        </div>
                                        <div>
                                          <Badge variant={
                                            event.status === "参加確定" ? "default" :
                                            event.status === "キャンセル" ? "destructive" :
                                            "secondary"
                                          }>
                                            {event.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </TabsContent>
                                {applicant.externalBookings.map((platform) => (
                                  <TabsContent key={platform.platform} value={platform.platform}>
                                    <div className="space-y-3">
                                      {platform.events.map((event, index) => (
                                        <div
                                          key={index}
                                          className="border rounded-lg p-3 space-y-2"
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="font-medium">{event.title}</div>
                                            <div className="text-sm text-gray-500">
                                              料金: ¥{event.price.toLocaleString()}
                                            </div>
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            開催日: {event.date}
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <Badge variant={
                                              event.status === "参加確定" ? "default" :
                                              event.status === "キャンセル" ? "destructive" :
                                              "secondary"
                                            }>
                                              {event.status}
                                            </Badge>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                              <ExternalLink className="h-4 w-4" />
                                              予約詳細を見る
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                ))}
                              </Tabs>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* SP表示 {/* SP表示用のカードリスト */}
          <div className="md:hidden space-y-4">
            {filteredApplicants.map((applicant) => (
              <Card key={applicant.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{applicant.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{applicant.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{applicant.phone}</span>
                      </div>
                    </div>
                    <Badge variant={applicant.status === "アクティブ" ? "default" : "destructive"}>
                      {applicant.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label>性別</Label>
                        <div className="mt-1">{applicant.gender}</div>
                      </div>
                      <div>
                        <Label>年齢</Label>
                        <div className="mt-1">{applicant.age}歳</div>
                      </div>
                      <div>
                        <Label>総申込数</Label>
                        <div className="mt-1">
                          {applicant.appliedEvents.length + 
                            applicant.externalBookings.reduce((sum, platform) => 
                              sum + platform.events.length, 0
                            )}件
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplicant(applicant)}
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            詳細を見る
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[800px]">
                          <DialogHeader>
                            <DialogTitle>申込者詳細情報</DialogTitle>
                            <DialogDescription>
                              申込者の詳細情報と全プラットフォームでの申込履歴
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-4">
                              <h3 className="font-semibold">基本情報</h3>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-gray-500" />
                                  <span>{applicant.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-gray-500" />
                                  <span>{applicant.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-500" />
                                  <span>{applicant.phone}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                  <div>性別: {applicant.gender}</div>
                                  <div>年齢: {applicant.age}歳</div>
                                  <div>登録日: {applicant.registeredDate}</div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="font-semibold">申込履歴</h3>
                              <Tabs defaultValue="own" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="own">自社サイト</TabsTrigger>
                                  {applicant.externalBookings.map((platform) => (
                                    <TabsTrigger key={platform.platform} value={platform.platform}>
                                      {platform.platform}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>
                                <TabsContent value="own">
                                  <div className="space-y-3">
                                    {applicant.appliedEvents.map((event, index) => (
                                      <div
                                        key={index}
                                        className="border rounded-lg p-3 space-y-2"
                                      >
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-sm text-gray-500">
                                          開催日: {event.date}
                                        </div>
                                        <div>
                                          <Badge variant={
                                            event.status === "参加確定" ? "default" :
                                            event.status === "キャンセル" ? "destructive" :
                                            "secondary"
                                          }>
                                            {event.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </TabsContent>
                                {applicant.externalBookings.map((platform) => (
                                  <TabsContent key={platform.platform} value={platform.platform}>
                                    <div className="space-y-3">
                                      {platform.events.map((event, index) => (
                                        <div
                                          key={index}
                                          className="border rounded-lg p-3 space-y-2"
                                        >
                                          <div className="font-medium">{event.title}</div>
                                          <div className="text-sm text-gray-500">
                                            開催日: {event.date}
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <Badge variant={
                                              event.status === "参加確定" ? "default" :
                                              event.status === "キャンセル" ? "destructive" :
                                              "secondary"
                                            }>
                                              {event.status}
                                            </Badge>
                                            <div className="text-sm text-gray-500">
                                              料金: ¥{event.price.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                ))}
                              </Tabs>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}