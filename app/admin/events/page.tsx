"use client";

import { useState } from "react";
import { Search, Users, Calendar, Phone, Mail, Globe, ExternalLink, Upload, PlusCircle, X, Save, Plus, Trash2, Copy, Edit, MapPin, Clock } from "lucide-react";
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

const EVENT_TYPES = [
  "街コン",
  "恋活パーティー",
  "趣味コン",
  "年の差街コン",
  "エリート街コン",
  "グルメ街コン",
];

const initialEvents = [
  {
    id: 1,
    title: "渋谷で恋活パーティー",
    date: "2024-04-15",
    location: "渋谷",
    menCapacity: 20,
    womenCapacity: 20,
    menRegistered: 15,
    womenRegistered: 13,
    status: "公開中",
  },
  {
    id: 2,
    title: "代官山カフェ街コン",
    date: "2024-04-20",
    location: "代官山",
    menCapacity: 15,
    womenCapacity: 15,
    menRegistered: 8,
    womenRegistered: 7,
    status: "公開中",
  },
  {
    id: 3,
    title: "銀座ラグジュアリー街コン",
    date: "2024-04-25",
    location: "銀座",
    menCapacity: 25,
    womenCapacity: 25,
    menRegistered: 22,
    womenRegistered: 20,
    status: "締切間近",
  },
];

const emptyEvent = {
  title: "",
  type: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  locationDetails: "",
  receptionLocation: "",
  receptionTime: "",
  ticketCount: "",
  salesDeadline: "",
  menPrice: "",
  womenPrice: "",
  menCapacity: "",
  womenCapacity: "",
  menMinAge: "",
  menMaxAge: "",
  womenMinAge: "",
  womenMaxAge: "",
  description: "",
  schedule: "",
  requirements: "",
  organizerMessage: "",
  prohibitedMatters: "",
  faq: "",
  confirmationArea: "",
  contactNumber: "",
  scale: "",
};

export default function EventsAdmin() {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tempCapacities, setTempCapacities] = useState<{[key: number]: {men: number, women: number}}>({});
  const [newEvent, setNewEvent] = useState(emptyEvent);
  const [editingEvent, setEditingEvent] = useState(emptyEvent);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [titleError, setTitleError] = useState<string>("");

  const locations = Array.from(new Set(events.map(event => event.location)));

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesLocation = locationFilter === "all" || event.location === locationFilter;
    
    let matchesDate = true;
    const eventDate = new Date(event.date);
    const today = new Date();
    
    switch (dateFilter) {
      case "today":
        matchesDate = eventDate.toDateString() === today.toDateString();
        break;
      case "thisWeek":
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        matchesDate = eventDate >= today && eventDate <= weekEnd;
        break;
      case "thisMonth":
        matchesDate = eventDate.getMonth() === today.getMonth() && 
                     eventDate.getFullYear() === today.getFullYear();
        break;
      default:
        matchesDate = true;
    }

    return matchesSearch && matchesStatus && matchesLocation && matchesDate;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 100) {
      setTitleError("イベント名は100文字以内で入力してください");
    } else {
      setTitleError("");
    }
    setNewEvent({ ...newEvent, title: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title.length > 100) {
      return;
    }
    const newId = Math.max(...events.map(e => e.id)) + 1;
    const createdEvent = {
      id: newId,
      title: newEvent.title,
      date: newEvent.date,
      location: newEvent.location,
      menCapacity: parseInt(newEvent.menCapacity),
      womenCapacity: parseInt(newEvent.womenCapacity),
      menRegistered: 0,
      womenRegistered: 0,
      status: "公開中",
    };
    setEvents([...events, createdEvent]);
    setIsOpen(false);
    setNewEvent(emptyEvent);
    setBannerImage(null);
    setPreviewUrl("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setEvents(events.map(event => 
        event.id === editingId
          ? {
              ...event,
              title: editingEvent.title,
              date: editingEvent.date,
              location: editingEvent.location,
              menCapacity: parseInt(editingEvent.menCapacity),
              womenCapacity: parseInt(editingEvent.womenCapacity),
            }
          : event
      ));
      setIsEditOpen(false);
      setEditingId(null);
      setEditingEvent(emptyEvent);
    }
  };

  const startEditing = (event: typeof events[0]) => {
    setEditingId(event.id);
    setEditingEvent({
      ...emptyEvent,
      title: event.title,
      date: event.date,
      location: event.location,
      menCapacity: event.menCapacity.toString(),
      womenCapacity: event.womenCapacity.toString(),
    });
    setIsEditOpen(true);
  };

  const duplicateEvent = (event: typeof events[0]) => {
    const newId = Math.max(...events.map(e => e.id)) + 1;
    const duplicatedEvent = {
      ...event,
      id: newId,
      title: `${event.title}（複製）`,
      menRegistered: 0,
      womenRegistered: 0,
      status: "下書き",
    };
    setEvents([...events, duplicatedEvent]);
  };

  const updateCapacity = (id: number, field: 'menCapacity' | 'womenCapacity', value: string) => {
    const numValue = parseInt(value) || 0;
    setTempCapacities(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field === 'menCapacity' ? 'men' : 'women']: numValue
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    setEvents(events.map(event => {
      if (tempCapacities[event.id]) {
        return {
          ...event,
          menCapacity: tempCapacities[event.id].men,
          womenCapacity: tempCapacities[event.id].women,
        };
      }
      return event;
    }));
    setTempCapacities({});
    setHasUnsavedChanges(false);
  };

  const totalMenRegistered = events.reduce((sum, event) => sum + event.menRegistered, 0);
  const totalWomenRegistered = events.reduce((sum, event) => sum + event.womenRegistered, 0);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">イベント管理</h1>
          <p className="text-gray-500 mt-2">街コンイベントの管理と新規作成</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">新規イベント作成</span>
              <span className="sm:hidden">新規作成</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>新規イベントの作成</DialogTitle>
              <DialogDescription>
                新しい街コンイベントの詳細を入力してください。
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">イベント名</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={handleTitleChange}
                    className={titleError ? "border-red-500" : ""}
                    placeholder="最大100文字まで"
                    required
                  />
                  {titleError && (
                    <p className="text-sm text-red-500 mt-1">{titleError}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {newEvent.title.length}/100文字
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">イベント種別</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="種別を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">開催日</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>開催時間</Label>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      required
                    />
                    <span className="flex items-center">～</span>
                    <Input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">会場名</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationDetails">受付住所</Label>
                  <Input
                    id="locationDetails"
                    value={newEvent.locationDetails}
                    onChange={(e) => setNewEvent({ ...newEvent, locationDetails: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="menPrice">男性料金</Label>
                  <Input
                    id="menPrice"
                    type="number"
                    value={newEvent.menPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, menPrice: e.target.value })}
                    placeholder="6000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="womenPrice">女性料金</Label>
                  <Input
                    id="womenPrice"
                    type="number"
                    value={newEvent.womenPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, womenPrice: e.target.value })}
                    placeholder="4000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="menCapacity">男性定員</Label>
                  <Input
                    id="menCapacity"
                    type="number"
                    value={newEvent.menCapacity}
                    onChange={(e) => setNewEvent({ ...newEvent, menCapacity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="womenCapacity">女性定員</Label>
                  <Input
                    id="womenCapacity"
                    type="number"
                    value={newEvent.womenCapacity}
                    onChange={(e) => setNewEvent({ ...newEvent, womenCapacity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">タイムスケジュール</Label>
                <textarea
                  id="schedule"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={newEvent.schedule}
                  onChange={(e) => setNewEvent({ ...newEvent, schedule: e.target.value })}
                  placeholder="例：&#13;&#10;19:00 受付開始&#13;&#10;19:30 イベント開始&#13;&#10;21:30 イベント終了"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">参加条件</Label>
                <textarea
                  id="requirements"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={newEvent.requirements}
                  onChange={(e) => setNewEvent({ ...newEvent, requirements: e.target.value })}
                  placeholder="参加に必要な条件を入力してください"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit">作成する</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総申込数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMenRegistered + totalWomenRegistered}</div>
            <p className="text-xs text-muted-foreground">
              男性: {totalMenRegistered}人 / 女性: {totalWomenRegistered}人
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>イベント一覧</CardTitle>
              <CardDescription>
                全てのイベントを管理・編集できます
              </CardDescription>
            </div>
            {hasUnsavedChanges && (
              <Button onClick={saveChanges} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                変更を保存
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="イベントを検索..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全てのステータス</SelectItem>
                  <SelectItem value="公開中">公開中</SelectItem>
                  <SelectItem value="締切間近">締切間近</SelectItem>
                  <SelectItem value="下書き">下書き</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="開催場所" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ての場所</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="開催日" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ての日程</SelectItem>
                  <SelectItem value="today">本日</SelectItem>
                  <SelectItem value="thisWeek">今週</SelectItem>
                  <SelectItem value="thisMonth">今月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* PC表示用のテーブル */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>イベント名</TableHead>
                  <TableHead>開催日</TableHead>
                  <TableHead>場所</TableHead>
                  <TableHead>男性申込</TableHead>
                  <TableHead>女性申込</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <span>{event.menRegistered}/</span>
                      <Input
                        type="number"
                        value={tempCapacities[event.id]?.men ?? event.menCapacity}
                        onChange={(e) => updateCapacity(event.id, 'menCapacity', e.target.value)}
                        className="w-16 h-8 inline-block mx-1"
                        min={event.menRegistered}
                      />
                      <span>人</span>
                    </TableCell>
                    <TableCell>
                      <span>{event.womenRegistered}/</span>
                      <Input
                        type="number"
                        value={tempCapacities[event.id]?.women ?? event.womenCapacity}
                        onChange={(e) => updateCapacity(event.id, 'womenCapacity', e.target.value)}
                        className="w-16 h-8 inline-block mx-1"
                        min={event.womenRegistered}
                      />
                      <span>人</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={event.status === "締切間近" ? "destructive" : "default"}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(event)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          編集
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateEvent(event)}
                          className="flex items-center gap-1"
                        >
                          <Copy className="h-4 w-4" />
                          複製
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* SP表示用のカードリスト */}
          <div className="md:hidden space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Badge variant={event.status === "締切間近" ? "destructive" : "default"}>
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>男性申込</Label>
                        <div className="flex items-center space-x-2">
                          <span>{event.menRegistered}/</span>
                          <Input
                            type="number"
                            value={tempCapacities[event.id]?.men ?? event.menCapacity}
                            onChange={(e) => updateCapacity(event.id, 'menCapacity', e.target.value)}
                            className="w-16 h-8"
                            min={event.menRegistered}
                          />
                          <span>人</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>女性申込</Label>
                        <div className="flex items-center space-x-2">
                          <span>{event.womenRegistered}/</span>
                          <Input
                            type="number"
                            value={tempCapacities[event.id]?.women ?? event.womenCapacity}
                            onChange={(e) => updateCapacity(event.id, 'womenCapacity', e.target.value)}
                            className="w-16 h-8"
                            min={event.womenRegistered}
                          />
                          <span>人</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(event)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        編集
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateEvent(event)}
                        className="flex items-center gap-1"
                      >
                        <Copy className="h-4 w-4" />
                        複製
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>イベントの編集</DialogTitle>
            <DialogDescription>
              イベントの詳細情報を編集できます。
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">イベント名</Label>
                  <Input
                    id="edit-title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">開催日</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">開催場所</Label>
                <Input
                  id="edit-location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-menCapacity">男性定員</Label>
                  <Input
                    id="edit-menCapacity"
                    type="number"
                    value={editingEvent.menCapacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, menCapacity: e.target.value })}
                    min={events.find(e => e.id === editingId)?.menRegistered || 0}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-womenCapacity">女性定員</Label>
                  <Input
                    id="edit-womenCapacity"
                    type="number"
                    value={editingEvent.womenCapacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, womenCapacity: e.target.value })}
                    min={events.find(e => e.id === editingId)?.womenRegistered || 0}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                キャンセル
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}